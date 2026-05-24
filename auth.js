/**
 * auth.js — Sistema de cuentas de cliente VUZALKA
 * ─────────────────────────────────────────────────
 * Responsabilidades:
 *   1. Modal de registro / inicio de sesión (email+contraseña + Google)
 *   2. Perfil del cliente guardado en Firestore (users/{uid})
 *   3. Favoritos sincronizados con la cuenta (Firestore > localStorage)
 *   4. Historial de pedidos consultable en "Mi Cuenta"
 *   5. Datos de envío guardados (nombre, teléfono, dirección)
 *   6. Botón "Mi Cuenta" en el header de todas las páginas
 *
 * Importado como <script type="module" src="auth.js"></script>
 * en todas las páginas del sitio (junto a app.js).
 *
 * Firestore collections usadas:
 *   users/{uid}            → perfil + datos de envío
 *   users/{uid}/favorites  → doc "list" con array de productIds
 *   orders/{orderId}       → ya existente; se añade userId al crear
 *   analytics/events       → eventos básicos de analítica de clientes
 */

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// ── Config Firebase (mismo proyecto que app.js) ───────────────────────────────
const firebaseConfig = {
  apiKey: 'AIzaSyBYlGCt2LhuArZeUGmvA0jfPnLfo0iVlFU',
  authDomain: 'vuzalka-73b95.firebaseapp.com',
  projectId: 'vuzalka-73b95',
  storageBucket: 'vuzalka-73b95.firebasestorage.app',
  messagingSenderId: '392739606646',
  appId: '1:392739606646:web:05f22f49163281e6dc4f57'
};

// Reusar la app de Firebase si ya fue inicializada por app.js
const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db   = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// ── Estado local ──────────────────────────────────────────────────────────────
let currentUser   = null;  // firebase User object
let currentProfile = null; // datos del perfil en Firestore

// ── Utilidades ────────────────────────────────────────────────────────────────
function escHtml(str){
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||'')); }

function firebaseErrorMsg(code){
  const map = {
    'auth/email-already-in-use': 'Este correo ya tiene una cuenta. Intenta iniciar sesión.',
    'auth/invalid-email': 'El correo no es válido.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos e intenta de nuevo.',
    'auth/popup-closed-by-user': 'Cancelaste el inicio de sesión con Google.',
    'auth/network-request-failed': 'Error de conexión. Revisa tu internet.'
  };
  return map[code] || 'Ocurrió un error. Intenta de nuevo.';
}

// ── Firestore: perfil del usuario ─────────────────────────────────────────────
async function loadUserProfile(uid){
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

async function createUserProfile(user, extraData = {}){
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if(!snap.exists()){
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || extraData.displayName || '',
      photoURL: user.photoURL || '',
      phone: extraData.phone || '',
      address: {
        fullName: extraData.displayName || user.displayName || '',
        phone: extraData.phone || '',
        city: '',
        department: '',
        address: '',
        zipCode: ''
      },
      favorites: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
  return loadUserProfile(user.uid);
}

async function updateUserProfile(uid, data){
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  currentProfile = { ...currentProfile, ...data };
}

// ── Favoritos: sincronización bidireccional ───────────────────────────────────
/**
 * Carga los favoritos del usuario desde Firestore y los fusiona con
 * los que tenga en localStorage (para no perder los que agregó sin sesión).
 */
async function syncFavoritesOnLogin(uid){
  try{
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    const cloudFavs = (snap.exists() && Array.isArray(snap.data().favorites))
      ? snap.data().favorites : [];

    // Favoritos locales (app.js los guarda en localStorage)
    const localKey = 'vuzalka_favorites_v2';
    let localFavs = [];
    try{ localFavs = JSON.parse(localStorage.getItem(localKey) || '[]'); }catch(e){ localFavs = []; }

    // Unión de ambas listas
    const merged = [...new Set([...cloudFavs, ...localFavs])];

    // Persistir en Firestore y localStorage
    await updateDoc(userRef, { favorites: merged, updatedAt: serverTimestamp() });
    localStorage.setItem(localKey, JSON.stringify(merged));

    // Notificar a app.js si la función está disponible
    if(window.__vuzalkaSetFavorites) window.__vuzalkaSetFavorites(merged);
  }catch(e){
    console.warn('auth.js: no se pudieron sincronizar favoritos', e);
  }
}

/**
 * Llama a esta función cuando el usuario agrega/quita un favorito estando logueado.
 * Se exporta al scope global para que app.js la use.
 */
async function pushFavoriteToCloud(productId, isAdding){
  if(!currentUser) return;
  try{
    const ref = doc(db, 'users', currentUser.uid);
    await updateDoc(ref, {
      favorites: isAdding ? arrayUnion(productId) : arrayRemove(productId),
      updatedAt: serverTimestamp()
    });
  }catch(e){
    console.warn('auth.js: no se pudo guardar favorito en la nube', e);
  }
}

// ── Analítica básica ──────────────────────────────────────────────────────────
async function logEvent(eventName, data = {}){
  try{
    if(!currentUser) return;
    await addDoc(collection(db, 'analytics'), {
      event: eventName,
      uid: currentUser.uid,
      email: currentUser.email,
      page: window.location.pathname,
      ...data,
      ts: serverTimestamp()
    });
  }catch(e){ /* silencioso */ }
}

// ── Pedidos del usuario ───────────────────────────────────────────────────────
async function getUserOrders(uid){
  try{
    const q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    const snap = await getDocs(q);
    const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    // Filtrar los del usuario (el campo userId lo añade app.js al crear la preferencia)
    return all.filter(o => o.userId === uid || o.userEmail === currentUser?.email);
  }catch(e){
    console.warn('auth.js: no se pudieron cargar pedidos', e);
    return [];
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//   MODAL DE AUTENTICACIÓN
// ══════════════════════════════════════════════════════════════════════════════

function injectAuthModal(){
  if(document.getElementById('authModal')) return; // ya inyectado

  const modal = document.createElement('div');
  modal.id = 'authModal';
  modal.className = 'auth-modal-backdrop';
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-label', 'Iniciar sesión o crear cuenta');
  modal.hidden = true;

  modal.innerHTML = `
    <div class="auth-modal-card" id="authModalCard">
      <button class="auth-modal-close" type="button" id="authModalClose" aria-label="Cerrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      <!-- Logo -->
      <div class="auth-modal-brand">
        <img src="assets/logo-horizontal-negro.svg" alt="VUZALKA" width="180" height="38" loading="lazy" />
      </div>

      <!-- Tabs -->
      <div class="auth-tabs" role="tablist">
        <button class="auth-tab active" role="tab" aria-selected="true"  id="tabLogin"    data-auth-tab="login">Iniciar sesión</button>
        <button class="auth-tab"        role="tab" aria-selected="false" id="tabRegister" data-auth-tab="register">Crear cuenta</button>
      </div>

      <!-- Formulario LOGIN -->
      <form class="auth-form" id="authLoginForm" data-auth-panel="login" novalidate>
        <div class="auth-field">
          <label for="loginEmail">Correo electrónico</label>
          <input type="email" id="loginEmail" name="email" placeholder="tu@correo.com" autocomplete="email" required />
        </div>
        <div class="auth-field">
          <label for="loginPassword">Contraseña</label>
          <div class="auth-pass-wrap">
            <input type="password" id="loginPassword" name="password" placeholder="Tu contraseña" autocomplete="current-password" required />
            <button type="button" class="auth-pass-toggle" aria-label="Mostrar contraseña" data-pass-target="loginPassword">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <button type="button" class="auth-forgot" id="btnForgotPass">¿Olvidaste tu contraseña?</button>
        <div class="auth-error" id="loginError" aria-live="polite"></div>
        <button type="submit" class="auth-btn-primary" id="btnLogin">
          <span class="auth-btn-label">Iniciar sesión</span>
          <span class="auth-btn-spinner" hidden></span>
        </button>
      </form>

      <!-- Formulario REGISTRO -->
      <form class="auth-form" id="authRegisterForm" data-auth-panel="register" style="display:none" novalidate>
        <div class="auth-field">
          <label for="regName">Nombre completo</label>
          <input type="text" id="regName" name="name" placeholder="Tu nombre" autocomplete="name" required />
        </div>
        <div class="auth-field">
          <label for="regEmail">Correo electrónico</label>
          <input type="email" id="regEmail" name="email" placeholder="tu@correo.com" autocomplete="email" required />
        </div>
        <div class="auth-field">
          <label for="regPhone">Teléfono / WhatsApp <span class="auth-optional">(opcional)</span></label>
          <input type="tel" id="regPhone" name="phone" placeholder="+57 300 000 0000" autocomplete="tel" />
        </div>
        <div class="auth-field">
          <label for="regPassword">Contraseña <span class="auth-optional">(mín. 6 caracteres)</span></label>
          <div class="auth-pass-wrap">
            <input type="password" id="regPassword" name="password" placeholder="Elige una contraseña" autocomplete="new-password" required />
            <button type="button" class="auth-pass-toggle" aria-label="Mostrar contraseña" data-pass-target="regPassword">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="auth-error" id="registerError" aria-live="polite"></div>
        <button type="submit" class="auth-btn-primary" id="btnRegister">
          <span class="auth-btn-label">Crear mi cuenta</span>
          <span class="auth-btn-spinner" hidden></span>
        </button>
      </form>

      <!-- Separador -->
      <div class="auth-divider"><span>o continúa con</span></div>

      <!-- Google -->
      <button type="button" class="auth-btn-google" id="btnGoogleAuth">
        <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuar con Google
      </button>

      <!-- Nota de privacidad -->
      <p class="auth-privacy">
        Al crear tu cuenta aceptas que VUZALKA guarde tu información de forma segura para personalizar tu experiencia de compra.
      </p>
    </div>
  `;

  document.body.appendChild(modal);
  wireAuthModal(modal);
}

function openAuthModal(defaultTab = 'login'){
  const modal = document.getElementById('authModal');
  if(!modal) return;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  switchAuthTab(defaultTab);
  // Focus primer input
  setTimeout(() => {
    const firstInput = modal.querySelector(`[data-auth-panel="${defaultTab}"] input`);
    if(firstInput) firstInput.focus();
  }, 80);
}

function closeAuthModal(){
  const modal = document.getElementById('authModal');
  if(!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  // Limpiar errores
  ['loginError','registerError'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = '';
  });
}

function switchAuthTab(tab){
  const login    = document.getElementById('authLoginForm');
  const register = document.getElementById('authRegisterForm');
  const tabLogin    = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  if(!login || !register) return;

  const isLogin = tab === 'login';
  login.style.display    = isLogin ? '' : 'none';
  register.style.display = isLogin ? 'none' : '';
  tabLogin.classList.toggle('active', isLogin);
  tabRegister.classList.toggle('active', !isLogin);
  tabLogin.setAttribute('aria-selected', String(isLogin));
  tabRegister.setAttribute('aria-selected', String(!isLogin));
}

function setAuthLoading(btnId, loading){
  const btn = document.getElementById(btnId);
  if(!btn) return;
  btn.disabled = loading;
  const label  = btn.querySelector('.auth-btn-label');
  const spinner = btn.querySelector('.auth-btn-spinner');
  if(label)  label.textContent = loading
    ? (btnId === 'btnLogin' ? 'Ingresando…' : 'Creando cuenta…')
    : (btnId === 'btnLogin' ? 'Iniciar sesión' : 'Crear mi cuenta');
  if(spinner) spinner.hidden = !loading;
}

function wireAuthModal(modal){
  // Cerrar con botón X
  document.getElementById('authModalClose')?.addEventListener('click', closeAuthModal);

  // Cerrar al hacer clic fuera del card
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeAuthModal();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !modal.hidden) closeAuthModal();
  });

  // Tabs
  document.querySelectorAll('[data-auth-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchAuthTab(btn.dataset.authTab));
  });

  // Toggle visibilidad de contraseña
  modal.querySelectorAll('[data-pass-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.passTarget);
      if(!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.setAttribute('aria-label', input.type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });
  });

  // ── LOGIN ──
  document.getElementById('authLoginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    const errEl    = document.getElementById('loginError');

    if(!email || !isValidEmail(email)){
      if(errEl) errEl.textContent = 'Ingresa un correo válido.';
      return;
    }
    if(!password || password.length < 6){
      if(errEl) errEl.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if(errEl) errEl.textContent = '';
    setAuthLoading('btnLogin', true);

    try{
      await signInWithEmailAndPassword(auth, email, password);
      closeAuthModal();
    }catch(err){
      if(errEl) errEl.textContent = firebaseErrorMsg(err.code);
    }finally{
      setAuthLoading('btnLogin', false);
    }
  });

  // ── REGISTRO ──
  document.getElementById('authRegisterForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name     = document.getElementById('regName')?.value.trim();
    const email    = document.getElementById('regEmail')?.value.trim();
    const phone    = document.getElementById('regPhone')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    const errEl    = document.getElementById('registerError');

    if(!name || name.length < 2){
      if(errEl) errEl.textContent = 'Escribe tu nombre completo.'; return;
    }
    if(!email || !isValidEmail(email)){
      if(errEl) errEl.textContent = 'Ingresa un correo válido.'; return;
    }
    if(!password || password.length < 6){
      if(errEl) errEl.textContent = 'La contraseña debe tener al menos 6 caracteres.'; return;
    }
    if(errEl) errEl.textContent = '';
    setAuthLoading('btnRegister', true);

    try{
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await createUserProfile(cred.user, { displayName: name, phone });
      closeAuthModal();
    }catch(err){
      if(errEl) errEl.textContent = firebaseErrorMsg(err.code);
    }finally{
      setAuthLoading('btnRegister', false);
    }
  });

  // ── GOOGLE ──
  document.getElementById('btnGoogleAuth')?.addEventListener('click', async () => {
    const errLogin = document.getElementById('loginError');
    const errReg   = document.getElementById('registerError');
    try{
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfile(result.user);
      closeAuthModal();
    }catch(err){
      const msg = firebaseErrorMsg(err.code);
      if(errLogin) errLogin.textContent = msg;
      if(errReg)   errReg.textContent   = msg;
    }
  });

  // ── RECUPERAR CONTRASEÑA ──
  document.getElementById('btnForgotPass')?.addEventListener('click', async () => {
    const email = document.getElementById('loginEmail')?.value.trim();
    const errEl = document.getElementById('loginError');
    if(!email || !isValidEmail(email)){
      if(errEl) errEl.textContent = 'Primero escribe tu correo arriba.';
      document.getElementById('loginEmail')?.focus();
      return;
    }
    try{
      await sendPasswordResetEmail(auth, email);
      if(errEl){
        errEl.style.color = '#16a34a';
        errEl.textContent = `Enviamos un enlace de recuperación a ${email}`;
        setTimeout(() => { errEl.style.color = ''; errEl.textContent = ''; }, 5000);
      }
    }catch(err){
      if(errEl) errEl.textContent = firebaseErrorMsg(err.code);
    }
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//   BOTÓN DE CUENTA EN EL HEADER
// ══════════════════════════════════════════════════════════════════════════════

function injectAccountButton(){
  // Busca la zona derecha del header en todas las páginas
  const headerRight = document.querySelector('.header-side.right');
  if(!headerRight || document.getElementById('headerAccountBtn')) return;

  const btn = document.createElement('button');
  btn.id = 'headerAccountBtn';
  btn.className = 'icon-only auth-header-btn';
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'Mi cuenta');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" width="22" height="22">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
    <span class="auth-account-dot" id="authAccountDot" hidden></span>
  `;
  // Insertar antes del botón de favoritos
  const favBtn = headerRight.querySelector('[data-favorites-toggle]');
  if(favBtn) headerRight.insertBefore(btn, favBtn);
  else headerRight.appendChild(btn);

  btn.addEventListener('click', () => {
    if(currentUser){
      window.location.href = 'cuenta.html';
    }else{
      openAuthModal('login');
    }
  });
}

function updateAccountButton(user){
  const dot = document.getElementById('authAccountDot');
  const btn = document.getElementById('headerAccountBtn');
  if(dot) dot.hidden = !user;
  if(btn){
    btn.setAttribute('aria-label', user ? 'Mi cuenta' : 'Iniciar sesión');
    btn.title = user ? (user.displayName || user.email) : 'Iniciar sesión';
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//   OBSERVADOR DE SESIÓN (onAuthStateChanged)
// ══════════════════════════════════════════════════════════════════════════════

onAuthStateChanged(auth, async (user) => {
  currentUser = user;

  if(user){
    // Cargar o crear perfil
    currentProfile = await loadUserProfile(user.uid);
    if(!currentProfile) currentProfile = await createUserProfile(user);

    // Sincronizar favoritos
    await syncFavoritesOnLogin(user.uid);

    // Rellenar campos de envío si estamos en la página de cuenta
    if(window.__vuzalkaOnUserLogin) window.__vuzalkaOnUserLogin(user, currentProfile);

    // Log de sesión
    logEvent('login', { method: user.providerData?.[0]?.providerId || 'email' });

  }else{
    currentProfile = null;
    if(window.__vuzalkaOnUserLogout) window.__vuzalkaOnUserLogout();
  }

  updateAccountButton(user);
});

// ══════════════════════════════════════════════════════════════════════════════
//   CSS DEL MODAL (inyectado dinámicamente para no requerir archivo extra)
// ══════════════════════════════════════════════════════════════════════════════

function injectAuthStyles(){
  if(document.getElementById('authStyles')) return;
  const style = document.createElement('style');
  style.id = 'authStyles';
  style.textContent = `
    /* ─── Backdrop ─── */
    .auth-modal-backdrop{
      position:fixed;inset:0;z-index:9000;
      background:rgba(0,0,0,.48);
      backdrop-filter:blur(6px);
      display:flex;align-items:center;justify-content:center;
      padding:16px;
      animation:authFadeIn .22s ease both;
    }
    .auth-modal-backdrop[hidden]{display:none !important;}
    @keyframes authFadeIn{from{opacity:0}to{opacity:1}}

    /* ─── Card ─── */
    .auth-modal-card{
      width:min(460px,100%);
      background:#fff;
      border-radius:28px;
      padding:36px 32px 28px;
      position:relative;
      box-shadow:0 32px 80px rgba(0,0,0,.18);
      animation:authSlideUp .28s cubic-bezier(.22,1,.36,1) both;
      max-height:90vh;
      overflow-y:auto;
    }
    @keyframes authSlideUp{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}

    .auth-modal-close{
      position:absolute;top:18px;right:18px;
      width:36px;height:36px;border-radius:50%;border:1px solid #eee;
      background:#fff;display:flex;align-items:center;justify-content:center;
      cursor:pointer;transition:background .18s;padding:0;
    }
    .auth-modal-close:hover{background:#f5f5f5;}
    .auth-modal-close svg{width:16px;height:16px;stroke:#555;}

    .auth-modal-brand{text-align:center;margin-bottom:22px;}
    .auth-modal-brand img{display:inline-block;}

    /* ─── Tabs ─── */
    .auth-tabs{
      display:flex;gap:0;
      background:#f3f4f6;border-radius:12px;padding:4px;
      margin-bottom:22px;
    }
    .auth-tab{
      flex:1;padding:9px 0;border-radius:9px;border:none;
      background:transparent;font-weight:600;font-size:.9rem;
      color:#6b7280;cursor:pointer;transition:all .18s;
    }
    .auth-tab.active{background:#fff;color:#111;box-shadow:0 1px 4px rgba(0,0,0,.1);}

    /* ─── Formulario ─── */
    .auth-form{display:flex;flex-direction:column;gap:14px;}
    .auth-field{display:flex;flex-direction:column;gap:5px;}
    .auth-field label{font-size:.82rem;font-weight:600;color:#374151;}
    .auth-field input{
      width:100%;padding:12px 14px;border:1.5px solid #e5e7eb;
      border-radius:12px;font-size:.95rem;
      transition:border-color .18s,box-shadow .18s;background:#fff;
    }
    .auth-field input:focus{outline:none;border-color:#111;box-shadow:0 0 0 3px rgba(0,0,0,.06);}
    .auth-optional{color:#9ca3af;font-weight:400;}

    .auth-pass-wrap{position:relative;}
    .auth-pass-wrap input{padding-right:44px;}
    .auth-pass-toggle{
      position:absolute;right:12px;top:50%;transform:translateY(-50%);
      background:none;border:none;padding:4px;cursor:pointer;
      color:#9ca3af;display:flex;align-items:center;
    }
    .auth-pass-toggle:hover{color:#374151;}
    .auth-pass-toggle svg{width:18px;height:18px;}

    .auth-forgot{
      background:none;border:none;padding:0;text-align:left;
      font-size:.82rem;color:#6b7280;cursor:pointer;text-decoration:underline;
      margin-top:-6px;align-self:flex-start;
    }
    .auth-forgot:hover{color:#111;}

    .auth-error{
      font-size:.82rem;font-weight:600;color:#b42318;
      min-height:18px;padding:0 2px;
    }

    /* ─── Botones ─── */
    .auth-btn-primary{
      display:flex;align-items:center;justify-content:center;gap:10px;
      width:100%;padding:14px;border-radius:999px;border:none;
      background:#111;color:#fff;font-weight:700;font-size:1rem;
      cursor:pointer;transition:background .18s;min-height:52px;
    }
    .auth-btn-primary:hover{background:#2d2d2d;}
    .auth-btn-primary:disabled{opacity:.6;cursor:wait;}

    .auth-btn-spinner{
      width:18px;height:18px;border:2.5px solid rgba(255,255,255,.3);
      border-top-color:#fff;border-radius:50%;
      animation:authSpin .65s linear infinite;flex-shrink:0;
    }
    @keyframes authSpin{to{transform:rotate(360deg)}}

    .auth-btn-google{
      display:flex;align-items:center;justify-content:center;gap:12px;
      width:100%;padding:13px;border-radius:999px;
      border:1.5px solid #e5e7eb;background:#fff;
      font-weight:600;font-size:.95rem;color:#374151;
      cursor:pointer;transition:background .18s,border-color .18s;
    }
    .auth-btn-google:hover{background:#f9fafb;border-color:#d1d5db;}

    /* ─── Separador ─── */
    .auth-divider{
      display:flex;align-items:center;gap:12px;
      margin:18px 0 14px;color:#9ca3af;font-size:.82rem;
    }
    .auth-divider::before,.auth-divider::after{
      content:'';flex:1;height:1px;background:#e5e7eb;
    }

    .auth-privacy{
      margin:14px 0 0;font-size:.76rem;line-height:1.55;
      color:#9ca3af;text-align:center;
    }

    /* ─── Botón de cuenta en header ─── */
    .auth-header-btn{position:relative;}
    .auth-account-dot{
      position:absolute;top:4px;right:4px;
      width:8px;height:8px;border-radius:50%;
      background:#16a34a;border:1.5px solid #fff;
      display:block;
    }

    @media(max-width:480px){
      .auth-modal-card{padding:28px 20px 22px;border-radius:20px;}
    }
  `;
  document.head.appendChild(style);
}

// ══════════════════════════════════════════════════════════════════════════════
//   INTERFAZ PÚBLICA — funciones exportadas al scope global para que
//   app.js y cuenta.html puedan llamarlas sin importaciones complejas
// ══════════════════════════════════════════════════════════════════════════════

window.VuzalkaAuth = {
  openModal: openAuthModal,
  closeModal: closeAuthModal,
  signOut: () => signOut(auth),
  getUser: () => currentUser,
  getProfile: () => currentProfile,
  updateProfile: updateUserProfile,
  getUserOrders,
  pushFavoriteToCloud,
  logEvent,
  db,
  auth
};

// ── Inicialización ────────────────────────────────────────────────────────────
injectAuthStyles();

// Esperar a que el DOM esté listo
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', () => {
    injectAuthModal();
    injectAccountButton();
  });
}else{
  injectAuthModal();
  injectAccountButton();
}
