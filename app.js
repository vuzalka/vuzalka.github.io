import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBYlGCt2LhuArZeUGmvA0jfPnLfo0iVlFU',
  authDomain: 'vuzalka-73b95.firebaseapp.com',
  projectId: 'vuzalka-73b95',
  storageBucket: 'vuzalka-73b95.firebasestorage.app',
  messagingSenderId: '392739606646',
  appId: '1:392739606646:web:05f22f49163281e6dc4f57'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mercado Pago:
// - La Public Key sí puede vivir en el frontend.
// - El Access Token debe mantenerse únicamente en la función backend que crea la preferencia.
const MP_PUBLIC_KEY = 'APP_USR-7d5d8049-5d0e-4737-a02d-e7f6938dc4f6';
const CREATE_PREFERENCE_URL = 'https://createpreference-iqdpqh6hnq-uc.a.run.app';


const CONTACT = {
  whatsappNumber: '573026451420',
  whatsappLabel: '+57 302 645 1420',
  email: 'vuzalkaoficial@gmail.com',
  instagram: 'https://www.instagram.com/vuzalkaoficial/',
  facebook: 'https://www.facebook.com/share/1CUujbXXKN/',
  tiktok: 'https://www.tiktok.com/@vuzalkaoficial',
  x: 'https://x.com/vuzalkaoficial'
};

const STORAGE_KEYS = {
  cart: 'vuzalka_cart_v2',
  favorites: 'vuzalka_favorites_v2'
};

const FALLBACK_HOME = {
  // Texto del hero
  heroTitle: 'VUZALKA',
  heroDescription: 'Elegancia, carácter y esencia en cada fragancia. Descubre una colección pensada para quienes desean dejar huella con su aroma.',
  heroKicker: 'COLECCIÓN DESTACADA',
  primaryButtonText: 'Ver perfumes',
  primaryButtonLink: 'perfumes.html',
  secondaryButtonText: 'Contáctanos',
  secondaryButtonLink: 'contacto.html',

  // Carrusel de imágenes (nuevo)
  heroImage: 'assets/hero-inicio.webp', // legado, se mantiene por compatibilidad
  heroImages: ['assets/hero-inicio.webp'],
  carouselIntervalSec: 5,
  carouselTransition: 'fade',

  // Barra de anuncios (marquee superior)
  showAnnouncementBar: true,
  announcementMessages: [
    'Envíos a todo Colombia',
    'Perfumes 100% originales garantizados',
    'Asesoría personalizada por WhatsApp',
    'Pago seguro con Mercado Pago',
    'Despacho en 1 a 4 días hábiles'
  ],

  // Garantías (4 trust badges)
  showTrustBadges: true,
  trustBadges: [
    { title: '100% Originales', subtitle: 'Garantía de autenticidad en cada frasco' },
    { title: 'Envío Nacional',  subtitle: 'A todo Colombia en 1 a 4 días hábiles' },
    { title: 'Pago Seguro',     subtitle: 'Mercado Pago · Transferencia bancaria' },
    { title: 'Asesoría Gratis', subtitle: 'Te ayudamos a elegir tu fragancia ideal' }
  ],

  // Testimonios
  showTestimonials: true,
  testimonials: [
    {
      quote: 'El Khamrah llegó en perfecto estado, sellado y con factura. La atención por WhatsApp fue muy rápida, me ayudaron a elegir entre dos opciones y quedé feliz con la compra.',
      name: 'Santiago C.',
      city: 'Medellín, Antioquia',
      product: 'Lattafa Khamrah'
    },
    {
      quote: 'La página se ve muy profesional y el proceso de pago fue sencillo. El AFNAN 9PM huele increíble, la proyección es brutal. Totalmente recomendado.',
      name: 'Laura M.',
      city: 'Bogotá, D.C.',
      product: 'Afnan 9PM'
    },
    {
      quote: 'Pedí el Acqua di Giò y llegó en dos días a Cali. Empaque muy bien protegido. Lo usé en una reunión y varios me preguntaron qué estaba usando. Excelente servicio.',
      name: 'Julián P.',
      city: 'Cali, Valle del Cauca',
      product: 'Acqua di Giò EDT'
    }
  ]
};

const FALLBACK_PRODUCTS = [
  {
    id: 'fallback-afnan-9pm',
    slug: 'afnan-9pm',
    name: 'AFNAN 9PM',
    brand: 'Afnan',
    price: 165000,
    compareAtPrice: 185000,
    stock: 8,
    category: 'Noche',
    gender: 'Masculino',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    presentation: '100 ML',
    description: 'Una fragancia intensa y nocturna con salida afrutada, cuerpo especiado y fondo cálido.',
    story: 'Ideal para quienes buscan un perfume con presencia, dulzor elegante y excelente impacto en clima nocturno.',
    features: ['Salida dulce y vibrante', 'Proyección marcada', 'Perfil ideal para la noche', 'Aroma moderno y seductor'],
    shipping: 'Despachamos a todo Colombia. Tiempo estimado: 1 a 4 días hábiles según destino.',
    warranty: 'Garantía por daño de transporte o error en el envío. Escríbenos apenas recibas tu pedido.',
    payments: 'Transferencia, pagos digitales y acuerdos directos por WhatsApp.',
    image: 'assets/afnan-9pm.png',
    gallery: ['assets/afnan-9pm.png', 'assets/afnan-9pm-producto.png']
  },
  {
    id: 'fallback-lattafa-khamrah',
    slug: 'lattafa-khamrah',
    name: 'LATTAFA KHAMRAH',
    brand: 'Lattafa',
    price: 210000,
    compareAtPrice: 230000,
    stock: 6,
    category: 'Árabes',
    gender: 'Unisex',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    presentation: '100 ML',
    description: 'Khamrah mezcla canela, frutos secos y vainilla en una composición profunda y envolvente.',
    story: 'Una opción gourmand, elegante y cálida que destaca por su riqueza aromática y personalidad sofisticada.',
    features: ['Acorde cálido y especiado', 'Perfil gourmand', 'Buena duración', 'Perfecto para climas frescos'],
    shipping: 'Envío nacional con seguimiento por WhatsApp.',
    warranty: 'Cambio por novedad de transporte o referencia equivocada.',
    payments: 'Transferencia y acuerdos directos con soporte humano.',
    image: 'assets/lattafa-khamrah.png',
    gallery: ['assets/lattafa-khamrah.png', 'assets/khamrah-lattafa-producto.png']
  },
  {
    id: 'fallback-lattafa-khamrah-qahwa',
    slug: 'lattafa-khamrah-qahwa',
    name: 'LATTAFA KHAMRAH QAHWA',
    brand: 'Lattafa',
    price: 219000,
    compareAtPrice: 239000,
    stock: 5,
    category: 'Árabes',
    gender: 'Unisex',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    presentation: '100 ML',
    description: 'Una versión más oscura y adictiva con matices tostados, café y dulzor ambarado.',
    story: 'Pensado para quienes aman los perfumes cálidos con carácter intenso y un fondo muy memorable.',
    features: ['Matiz a café tostado', 'Aroma denso y elegante', 'Sensación envolvente', 'Excelente para la noche'],
    shipping: 'Cobertura nacional y confirmación de despacho por WhatsApp.',
    warranty: 'Protección por novedad en entrega o referencia.',
    payments: 'Pagos seguros y atención personalizada.',
    image: 'assets/lattafa-khamrah-qahwa.png',
    gallery: ['assets/lattafa-khamrah-qahwa.png', 'assets/khamrah-lattafa-qahwa-producto.png']
  },
  {
    id: 'fallback-odyssey-mandarin-sky',
    slug: 'odyssey-mandarin-sky',
    name: 'ODYSSEY MANDARIN SKY',
    brand: 'Armaf',
    price: 159000,
    compareAtPrice: 172000,
    stock: 9,
    category: 'Frescos',
    gender: 'Masculino',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    presentation: '100 ML',
    description: 'Cítrico, luminoso y juvenil, con salida refrescante y fondo limpio.',
    story: 'Una alternativa fresca y moderna para uso diario, perfecta para climas cálidos y rutinas activas.',
    features: ['Salida cítrica', 'Sensación fresca', 'Uso diario', 'Aroma ligero con personalidad'],
    shipping: 'Envíos rápidos a las principales ciudades del país.',
    warranty: 'Escríbenos el mismo día de la entrega ante cualquier novedad.',
    payments: 'Transferencia y acompañamiento por WhatsApp.',
    image: 'assets/odyssey-mandarin-sky.png',
    gallery: ['assets/odyssey-mandarin-sky.png', 'assets/odyssey-mandarinsky-producto.png']
  },
  {
    id: 'fallback-acqua-di-gio',
    slug: 'acqua-di-gio',
    name: 'ACQUA DI GIO',
    brand: 'Giorgio Armani',
    price: 305000,
    compareAtPrice: 329000,
    stock: 4,
    category: 'Frescos',
    gender: 'Masculino',
    concentration: 'Eau de Toilette',
    origin: 'Italia',
    presentation: '100 ML',
    description: 'Refrescante, limpio y marino. Un clásico versátil de gran aceptación.',
    story: 'Perfecto para oficina, uso diario y personas que prefieren un aroma elegante y sin excesos.',
    features: ['Aroma limpio y acuático', 'Muy versátil', 'Ideal para climas cálidos', 'Clásico contemporáneo'],
    shipping: 'Despachamos con cobertura nacional y soporte postventa.',
    warranty: 'Aplica por novedad de envío o producto incorrecto.',
    payments: 'Canales de pago verificados y atención directa.',
    image: 'assets/acqua-di-gio.png',
    gallery: ['assets/acqua-di-gio.png', 'assets/acqua-di-gio-producto.png']
  },
  {
    id: 'fallback-versace-eros-flame',
    slug: 'versace-eros-flame',
    name: 'VERSACE EROS FLAME',
    brand: 'Versace',
    price: 339000,
    compareAtPrice: 365000,
    stock: 3,
    category: 'Noche',
    gender: 'Masculino',
    concentration: 'Eau de Parfum',
    origin: 'Italia',
    presentation: '100 ML',
    description: 'Picante, vibrante y magnético. Una fragancia con mucha energía y presencia.',
    story: 'Su firma combina frescura, especias y un fondo amaderado que la hace ideal para destacar.',
    features: ['Entrada especiada', 'Perfil audaz', 'Muy buena presencia', 'Perfecto para salidas y eventos'],
    shipping: 'Cobertura nacional con seguimiento.',
    warranty: 'Respaldo por novedades de transporte o despacho.',
    payments: 'Opciones seguras y confirmación manual del pedido.',
    image: 'assets/versace-eros-flame.png',
    gallery: ['assets/versace-eros-flame.png', 'assets/versace-eros-flame-producto.png']
  },
  {
    id: 'fallback-hugo-boss-bottled',
    slug: 'hugo-boss-bottled',
    name: 'HUGO BOSS BOTTLED',
    brand: 'Hugo Boss',
    price: 289000,
    compareAtPrice: 315000,
    stock: 7,
    category: 'Diario',
    gender: 'Masculino',
    concentration: 'Eau de Toilette',
    origin: 'Alemania',
    presentation: '100 ML',
    description: 'Un aroma equilibrado, elegante y práctico para quienes buscan presencia todos los días.',
    story: 'Combina una sensación limpia con fondo cálido, resultando cómodo y fácil de usar en cualquier ocasión.',
    features: ['Perfil elegante', 'Versátil', 'Aroma fácil de llevar', 'Ideal para oficina y reuniones'],
    shipping: 'Envío nacional con atención personalizada.',
    warranty: 'Te acompañamos ante cualquier novedad del pedido.',
    payments: 'Medios de pago acordados directamente con VUZALKA.',
    image: 'assets/hugo-boss-bottled.png',
    gallery: ['assets/hugo-boss-bottled.png', 'assets/hugo-boss-bottled-producto.png']
  },
  {
    id: 'fallback-club-de-nuit-intense',
    slug: 'club-de-nuit-intense',
    name: 'CLUB DE NUIT INTENSE',
    brand: 'Armaf',
    price: 199000,
    compareAtPrice: 218000,
    stock: 6,
    category: 'Noche',
    gender: 'Masculino',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    presentation: '105 ML',
    description: 'Fresco, ahumado y con gran impacto, uno de los más buscados por su carácter sofisticado.',
    story: 'Ideal para quienes quieren una fragancia intensa, seria y con estela llamativa.',
    features: ['Salida cítrica intensa', 'Fondo ahumado', 'Muy buena fijación', 'Carácter elegante'],
    shipping: 'Entrega nacional y confirmación del despacho.',
    warranty: 'Respaldo por referencia equivocada o novedad de transporte.',
    payments: 'Pagos verificados y comunicación directa.',
    image: 'assets/armaf-club-de-nuit-intense.png',
    gallery: ['assets/armaf-club-de-nuit-intense.png', 'assets/club-de-nuit-producto.png']
  }
];

const ICONS = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.4 4.8 13.7a4.8 4.8 0 0 1 6.8-6.8L12 7.3l.4-.4a4.8 4.8 0 0 1 6.8 6.8L12 20.4Z"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35 10.55 20C5.4 15.24 2 12.09 2 8.23 2 5.08 4.42 2.7 7.5 2.7c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 2.7C19.58 2.7 22 5.08 22 8.23c0 3.86-3.4 7.01-8.55 11.77L12 21.35Z"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M5 20c1.7-3 4.1-4.5 7-4.5S17.3 17 19 20"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1.4 1.4 0 0 1 1.4-.3 9 9 0 0 0 2.8.4 1.4 1.4 0 0 1 1.4 1.4V20a1.4 1.4 0 0 1-1.4 1.4A17.6 17.6 0 0 1 2.6 4.4 1.4 1.4 0 0 1 4 3h3.3a1.4 1.4 0 0 1 1.4 1.4 9 9 0 0 0 .4 2.8 1.4 1.4 0 0 1-.3 1.4l-2.2 2.2Z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  shipping: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h10v10H3z"/><path d="M13 10h4l3 3v4h-7"/><circle cx="8" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>',
  secure: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 5 3 8 7 9 4-1 7-4 7-9V6l-7-3Z"/><path d="M9.4 12.2 11 13.8l3.8-3.8"/></svg>',
  return: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M20 20v-6a5 5 0 0 0-5-5H4"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v10H8l-4 4Z"/><path d="M8 9h8M8 12h5"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Zm7 12 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2ZM5 14l1.3 2.7L9 18l-2.7 1.3L5 22l-1.3-2.7L1 18l2.7-1.3L5 14Z"/></svg>',
  gender: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="14" r="5"/><path d="M15 9 21 3"/><path d="M16 3h5v5"/></svg>',
  atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.8"/><path d="M6 6c4-2 8-2 12 0-2 4-2 8 0 12-4 2-8 2-12 0 2-4 2-8 0-12Z"/><path d="M6 18c-2-4-2-8 0-12 4 2 8 2 12 0 2 4 2 8 0 12-4-2-8-2-12 0Z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/></svg>'
};

const state = {
  productsPromise: null,
  homePromise: null,
  productsCache: [],
  homeCache: FALLBACK_HOME,
  favorites: readStorage(STORAGE_KEYS.favorites, []),
  cart: readStorage(STORAGE_KEYS.cart, [])
};

function readStorage(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch{
    return fallback;
  }
}

function writeStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}


function withTimeout(promise, ms, label = 'operación'){
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(`${label} tardó demasiado en responder.`)), ms);
    })
  ]);
}

function escapeHtml(value){
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


const DEFAULT_HERO_IMAGE = 'assets/hero-inicio.webp';
const OPTIMIZED_HERO_IMAGE = 'assets/optimized/hero-inicio-stable.webp';

function isExternalAsset(src){
  return /^(https?:)?\/\//i.test(String(src || '')) || /^(data|blob):/i.test(String(src || ''));
}

function getOptimizedImage(src){
  const value = String(src || '').trim();
  if(!value || isExternalAsset(value)) return value;
  if(value.includes('/optimized/')) return value;
  const clean = value.split('?')[0].split('#')[0];
  const match = clean.match(/^assets\/([^/]+)\.(png|jpg|jpeg|webp)$/i);
  if(!match) return value;
  return `assets/optimized/${match[1]}.webp`;
}

function buildImgAttributes(src, alt = '', extra = ''){
  const original = String(src || '').trim();
  const optimized = getOptimizedImage(original);
  const fallback = optimized !== original && original ? ` data-fallback-src="${escapeHtml(original)}"` : '';
  return `src="${escapeHtml(optimized || original)}" alt="${escapeHtml(alt)}"${fallback}${extra ? ' ' + extra : ''}`;
}

function installImageFallbacks(){
  document.addEventListener('error', (event) => {
    const img = event.target;
    if(!(img instanceof HTMLImageElement)) return;

    const setPictureSources = (src) => {
      const picture = img.closest('picture');
      if(!picture) return;
      picture.querySelectorAll('source').forEach((source) => {
        source.srcset = src;
      });
    };

    const fallback = img.dataset.fallbackSrc;
    if(fallback && img.dataset.fallbackTried !== 'true'){
      img.dataset.fallbackTried = 'true';
      setPictureSources(fallback);
      img.src = fallback;
      return;
    }

    const defaultSrc = img.dataset.defaultSrc;
    if(defaultSrc && img.dataset.defaultTried !== 'true'){
      img.dataset.defaultTried = 'true';
      setPictureSources(defaultSrc);
      img.src = defaultSrc;
    }
  }, true);
}

/**
 * Aplica una sola imagen al hero (compatibilidad hacia atrás).
 * Para el carrusel multi-imagen usa applyHeroCarousel().
 */
function applyHeroImage(src){
  const hero = document.getElementById('homeHero');
  if(!hero) return;

  const desired = String(src || DEFAULT_HERO_IMAGE).trim() || DEFAULT_HERO_IMAGE;
  const optimized = getOptimizedImage(desired);
  const img = hero.querySelector('[data-hero-bg-img]');
  const source = hero.querySelector('[data-hero-bg-source]');

  if(source) source.srcset = optimized || OPTIMIZED_HERO_IMAGE;
  if(img){
    img.dataset.fallbackSrc = desired;
    img.dataset.defaultSrc = OPTIMIZED_HERO_IMAGE;
    img.src = optimized || desired || OPTIMIZED_HERO_IMAGE;
  }

  hero.style.setProperty('--hero-image', `url("${optimized || desired}")`);
}

// ─────────────────────────────────────────────────────────────
//   CARRUSEL DEL HERO (multi-imagen, rotación automática)
//   Configurado desde admin.html → siteContent/home →
//   heroImages[], carouselIntervalSec, carouselTransition
// ─────────────────────────────────────────────────────────────

let __heroCarouselTimer = null;
let __heroCarouselIndex = 0;
let __heroCarouselSlideCount = 0;

/**
 * Construye los slides del carrusel del hero a partir del array de imágenes.
 * - Si solo hay 1 imagen, no se rota y no se muestran los puntos.
 * - Reutiliza el primer slide existente (el del HTML inicial) para no
 *   provocar un flash mientras se cargan los datos de Firestore.
 * - Si las imágenes nuevas son las mismas que las actuales, no se redibuja
 *   nada (para evitar reiniciar el timer en cada llamada).
 *
 * @param {string[]} images - Lista de rutas/URLs de imágenes
 * @param {number}   intervalSec - Segundos entre transiciones (2–30)
 * @param {string}   transition - 'fade' o 'slide'
 */
function applyHeroCarousel(images, intervalSec, transition){
  const hero = document.getElementById('homeHero');
  if(!hero) return;

  const carousel = hero.querySelector('[data-hero-carousel]');
  const dotsWrap = hero.querySelector('[data-hero-dots]');
  if(!carousel) {
    // El HTML no tiene la nueva estructura; usar fallback de imagen única
    const fallbackSrc = (Array.isArray(images) && images[0]) || DEFAULT_HERO_IMAGE;
    applyHeroImage(fallbackSrc);
    return;
  }

  // Limpiar/normalizar las imágenes
  const valid = (Array.isArray(images) ? images : [images])
    .map(s => String(s || '').trim())
    .filter(Boolean);
  const finalImages = valid.length > 0 ? valid : [DEFAULT_HERO_IMAGE];

  // Aplicar tipo de transición a través de un data-attribute (lo usa el CSS)
  hero.dataset.carouselTransition = transition === 'slide' ? 'slide' : 'fade';

  // Optimización: si las imágenes ya están aplicadas y son las mismas, no rehacer
  const previousKey = carousel.dataset.imagesKey || '';
  const newKey = finalImages.join('|') + '::' + hero.dataset.carouselTransition;
  if(previousKey === newKey){
    // Solo actualizar el timer por si cambió el intervalo
    startHeroCarouselTimer(intervalSec);
    return;
  }
  carousel.dataset.imagesKey = newKey;

  // ── Reconstruir los slides
  // Limpiar el timer y resetear el índice
  if(__heroCarouselTimer){
    clearInterval(__heroCarouselTimer);
    __heroCarouselTimer = null;
  }
  __heroCarouselIndex = 0;
  __heroCarouselSlideCount = finalImages.length;

  // Generar HTML de slides. El primero queda activo.
  // Mantenemos el <picture> con <source> webp para conservar el comportamiento
  // optimizado (formato webp servido cuando exista) y los fallbacks de imagen.
  const slidesHtml = finalImages.map((src, i) => {
    const optimized = getOptimizedImage(src);
    const sourceSrc = optimized || src;
    return `
      <div class="hero-carousel-slide${i === 0 ? ' is-active' : ''}" data-hero-slide data-hero-slide-index="${i}">
        <picture>
          <source srcset="${escapeHtml(sourceSrc)}" type="image/webp" />
          <img src="${escapeHtml(sourceSrc)}"
               data-fallback-src="${escapeHtml(src)}"
               data-default-src="${escapeHtml(OPTIMIZED_HERO_IMAGE)}"
               alt="" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async"${i === 0 ? ' fetchpriority="high"' : ''} />
        </picture>
      </div>
    `;
  }).join('');
  carousel.innerHTML = slidesHtml;

  // Variable CSS por compatibilidad con estilos existentes
  hero.style.setProperty('--hero-image', `url("${getOptimizedImage(finalImages[0]) || finalImages[0]}")`);

  // ── Renderizar los puntos indicadores (solo si hay >1 imagen)
  if(dotsWrap){
    if(finalImages.length > 1){
      dotsWrap.innerHTML = finalImages.map((_, i) =>
        `<button type="button" class="${i === 0 ? 'is-active' : ''}" data-hero-dot="${i}" aria-label="Ir a imagen ${i+1}"></button>`
      ).join('');
      // Click-to-jump en los puntos
      dotsWrap.querySelectorAll('[data-hero-dot]').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = Number(btn.dataset.heroDot);
          if(isFinite(target)) goToHeroSlide(target, true);
        });
      });
    }else{
      dotsWrap.innerHTML = '';
    }
  }

  // ── Iniciar la rotación si hay más de 1 imagen
  startHeroCarouselTimer(intervalSec);
}

/**
 * Avanza el carrusel al slide con índice `target`.
 * Si `resetTimer` es true, reinicia el intervalo (útil cuando el usuario
 * hace click en un punto, para que no salte de inmediato).
 */
function goToHeroSlide(target, resetTimer){
  const hero = document.getElementById('homeHero');
  if(!hero) return;
  const slides = hero.querySelectorAll('[data-hero-slide]');
  const dots = hero.querySelectorAll('[data-hero-dot]');
  if(!slides.length) return;

  const total = slides.length;
  const next = ((Number(target) || 0) % total + total) % total;
  const prev = __heroCarouselIndex;
  if(next === prev) return;

  slides.forEach((s, i) => {
    s.classList.toggle('is-active', i === next);
    s.classList.toggle('is-prev', i === prev && i !== next);
  });
  dots.forEach((d, i) => d.classList.toggle('is-active', i === next));
  __heroCarouselIndex = next;

  if(resetTimer){
    const intervalAttr = hero.dataset.carouselIntervalSec;
    const intervalSec = Number(intervalAttr) || 5;
    startHeroCarouselTimer(intervalSec);
  }
}

/**
 * Inicia/reinicia el timer de rotación. Lo pausa si solo hay 1 slide
 * o si el usuario tiene la pestaña en segundo plano (lo gestiona el navegador).
 */
function startHeroCarouselTimer(intervalSec){
  const hero = document.getElementById('homeHero');
  if(!hero) return;

  if(__heroCarouselTimer){
    clearInterval(__heroCarouselTimer);
    __heroCarouselTimer = null;
  }
  if(__heroCarouselSlideCount <= 1) return;

  const safe = Math.max(2, Math.min(30, Number(intervalSec) || 5));
  hero.dataset.carouselIntervalSec = String(safe);

  __heroCarouselTimer = setInterval(() => {
    if(document.hidden) return; // pausa cuando la pestaña no está visible
    const next = (__heroCarouselIndex + 1) % __heroCarouselSlideCount;
    goToHeroSlide(next, false);
  }, safe * 1000);
}

// Pausa automáticamente cuando la pestaña deja de ser visible (ahorra batería)
// y resume cuando vuelve. Esto se ejecuta una sola vez al cargar app.js.
document.addEventListener('visibilitychange', () => {
  // El timer ya respeta document.hidden internamente, pero esto fuerza que
  // al volver a la pestaña el siguiente cambio sea inmediato (no se queda
  // "atascado" con el último intervalo perdido).
  if(!document.hidden && __heroCarouselSlideCount > 1 && __heroCarouselTimer){
    // No reiniciamos para evitar comportamiento brusco; el timer continúa
  }
});

function slugify(text){
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatMoney(value){
  const number = Number(value) || 0;
  return '$' + number.toLocaleString('es-CO');
}

function ensureMercadoPagoSdk(){
  if(window.MercadoPago) return Promise.resolve();
  if(window.__vuzalkaMpSdkPromise) return window.__vuzalkaMpSdkPromise;

  window.__vuzalkaMpSdkPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="sdk.mercadopago.com/js/v2"]');
    if(existing){
      existing.addEventListener('load', () => resolve(), { once:true });
      existing.addEventListener('error', () => reject(new Error('No se pudo cargar Mercado Pago.')), { once:true });
      if(window.MercadoPago) resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No se pudo cargar Mercado Pago.'));
    document.head.appendChild(script);
  });

  return window.__vuzalkaMpSdkPromise;
}

async function pagarConMercadoPago(product, quantity = 1, presentation = 'Disponible'){
  try{
    const safeQty = Math.max(1, Number(quantity) || 1);
    const price = Number(product.price || 0);

    console.log('Producto a pagar:', product);
    console.log('Cantidad:', safeQty);
    console.log('Presentación:', presentation);
    console.log('Precio:', price);

    // Si el cliente está logueado (auth.js lo expone en window.VuzalkaAuth),
    // vinculamos el pedido a su cuenta para que aparezca en su historial y
    // para que el admin pueda calcular métricas por cliente (CLV, frecuencia, etc.)
    const currentUser = (window.VuzalkaAuth && window.VuzalkaAuth.getUser) ? window.VuzalkaAuth.getUser() : null;
    const userProfile = (window.VuzalkaAuth && window.VuzalkaAuth.getProfile) ? window.VuzalkaAuth.getProfile() : null;

    const cartItems = Array.isArray(product.items) ? product.items : [];
    const orderRef = await addDoc(collection(db, 'orders'), {
      productId: product.id || '',
      productName: product.name || 'Producto VUZALKA',
      price,
      quantity: safeQty,
      presentation,
      items: cartItems,
      source: product.source || (cartItems.length ? 'cart' : 'single_product'),
      status: 'pending',
      // Vinculación al cliente (opcional, solo si está logueado)
      userId:        currentUser ? currentUser.uid   : null,
      userEmail:     currentUser ? currentUser.email : null,
      userName:      currentUser ? (currentUser.displayName || userProfile?.displayName || '') : '',
      paymentMethod: userProfile?.paymentMethod || 'Mercado Pago',
      createdAt: serverTimestamp()
    });

    const orderId = orderRef.id;
    console.log('Order ID creado:', orderId);

    const paymentTitle = product.paymentTitle || `${product.name} · ${presentation}`;
    const payload = {
      orderId,
      productId: product.id || '',
      productName: paymentTitle,
      price,
      quantity: safeQty,
      siteUrl: window.location.origin
    };

    console.log('Payload enviado a createPreference:', payload);
    console.log('URL función:', CREATE_PREFERENCE_URL);

    const response = await fetch(CREATE_PREFERENCE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const rawText = await response.text();
    console.log('Status función:', response.status);
    console.log('Respuesta cruda función:', rawText);

    let data = {};
    try{
      data = JSON.parse(rawText);
    }catch(parseError){
      throw new Error(`La función no devolvió JSON válido. Respuesta: ${rawText}`);
    }

    if(!response.ok || !data.preferenceId){
      throw new Error(data.detail || data.error || 'No se pudo crear la preferencia de pago.');
    }

    await ensureMercadoPagoSdk();
    const mp = new window.MercadoPago(MP_PUBLIC_KEY, {
      locale: 'es-CO'
    });

    mp.checkout({
      preference: {
        id: data.preferenceId
      },
      autoOpen: true
    });

  }catch(error){
    console.error('Error real al iniciar pago con Mercado Pago:', error);
    alert(`Error al iniciar pago: ${error.message}`);
    showToast('No se pudo iniciar el pago. Intenta de nuevo.');
  }
}

function inferBrand(name = ''){
  const value = name.toLowerCase();
  if(value.includes('afnan')) return 'Afnan';
  if(value.includes('lattafa')) return 'Lattafa';
  if(value.includes('versace')) return 'Versace';
  if(value.includes('boss')) return 'Hugo Boss';
  if(value.includes('armani') || value.includes('acqua')) return 'Giorgio Armani';
  if(value.includes('club de nuit') || value.includes('odyssey') || value.includes('armaf')) return 'Armaf';
  if(value.includes('one million') || value.includes('paco')) return 'Paco Rabanne';
  const firstWord = String(name).trim().split(/\s+/)[0] || 'Vuzalka';
  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
}

function inferCategory(name = '', description = ''){
  const value = `${name} ${description}`.toLowerCase();
  if(/arab|oud|qahwa|khamrah|lattafa/.test(value)) return 'Árabes';
  if(/fresh|marine|acqua|citr|mandarin|sky/.test(value)) return 'Frescos';
  if(/night|noche|intense|flame|9pm/.test(value)) return 'Noche';
  return 'Destacados';
}

function inferGender(name = '', description = ''){
  const value = `${name} ${description}`.toLowerCase();
  if(/woman|mujer|femen|lady/.test(value)) return 'Femenino';
  if(/unisex/.test(value)) return 'Unisex';
  return 'Masculino';
}

function parseMultiValue(value, fallback = []){
  if(Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean);
  if(!value) return fallback;
  return String(value)
    .split(/\n|\||,/)
    .map(item => item.trim())
    .filter(Boolean);
}

function normalizeGallery(docData){
  const gallery = [];
  const main = docData.imagen || docData.image || '';
  if(main) gallery.push(main);
  const extras = docData.imagenes || docData.images || [];
  parseMultiValue(extras).forEach((item) => {
    if(item && !gallery.includes(item)) gallery.push(item);
  });
  return gallery;
}

function normalizeProduct(raw, id){
  const name = raw.nombre || raw.name || 'Producto VUZALKA';
  const presentation = raw.presentacion || raw.size || raw.presentaciones || raw.sizes || 'Disponible';
  const description = raw.descripcion || raw.description || 'Fragancia disponible en VUZALKA.';
  const features = parseMultiValue(raw.caracteristicas || raw.especificaciones || raw.features || raw.notes, []);
  const gallery = normalizeGallery(raw);
  const normalized = {
    id,
    slug: raw.slug || raw.ruta || slugify(name),
    name,
    brand: raw.marca || raw.brand || inferBrand(name),
    price: Number(raw.precio ?? raw.price ?? 0),
    compareAtPrice: Number(raw.precioAnterior ?? raw.compareAtPrice ?? 0) || null,
    stock: Number(raw.cantidad ?? raw.stock ?? 0),
    category: raw.categoria || raw.category || inferCategory(name, description),
    gender: raw.genero || raw.gender || inferGender(name, description),
    concentration: raw.concentracion || raw.concentration || '',
    origin: raw.origen || raw.pais || raw.origin || '',
    presentation,
    presentationOptions: parseMultiValue(presentation, [presentation]),
    description,
    story: raw.historia || raw.story || description,
    features: features.length ? features : ['Selección curada por VUZALKA', 'Atención personalizada', 'Envío nacional'],
    shipping: raw.envios || raw.shipping || 'Envíos a todo Colombia con confirmación directa por WhatsApp.',
    warranty: raw.garantia || raw.warranty || 'Atención postventa y respaldo por novedades de transporte.',
    payments: raw.mediosPago || raw.payments || 'Transferencia y opciones de pago acordadas directamente con VUZALKA.',
    image: raw.imagen || raw.image || gallery[0] || '',
    gallery: gallery.length ? gallery : (raw.imagen || raw.image ? [raw.imagen || raw.image] : []),
    active: raw.active !== false
  };

  if(!normalized.compareAtPrice && normalized.price){
    normalized.compareAtPrice = normalized.stock <= 3 ? Math.round(normalized.price * 1.08) : null;
  }

  if(!normalized.concentration){
    normalized.concentration = /eau|parfum|toilette/i.test(description) ? description.match(/eau[^.,;]*/i)?.[0] || '' : '';
  }

  return normalized;
}

async function getProducts(){
  if(state.productsPromise) return state.productsPromise;

  state.productsPromise = (async () => {
    try{
      const snapshot = await withTimeout(getDocs(collection(db, 'products')), 4500, 'Carga de productos');
      const products = snapshot.docs
        .map((docSnap) => normalizeProduct(docSnap.data(), docSnap.id))
        .filter((product) => product.active);

      if(products.length){
        state.productsCache = products;
        return products;
      }
    }catch(error){
      console.warn('No se pudieron cargar productos desde Firestore. Se usará el catálogo de respaldo.', error);
    }

    state.productsCache = FALLBACK_PRODUCTS;
    return FALLBACK_PRODUCTS;
  })();

  return state.productsPromise;
}

async function getHomeConfig(){
  if(state.homePromise) return state.homePromise;

  state.homePromise = (async () => {
    try{
      const snapshot = await withTimeout(getDoc(doc(db, 'siteContent', 'home')), 3500, 'Configuración de inicio');
      if(snapshot.exists()){
        const raw = snapshot.data() || {};

        // ── Migración: si el documento es antiguo (solo tiene heroImage,
        // sin heroImages[]), lo convertimos antes de mezclar con defaults.
        // De lo contrario, el spread de FALLBACK_HOME enmascararía el campo legado.
        if((!Array.isArray(raw.heroImages) || raw.heroImages.length === 0) && raw.heroImage){
          raw.heroImages = [raw.heroImage];
        }

        state.homeCache = { ...FALLBACK_HOME, ...raw };
        return state.homeCache;
      }
    }catch(error){
      console.warn('No se pudo cargar la configuración de inicio. Se usarán valores por defecto.', error);
    }

    state.homeCache = FALLBACK_HOME;
    return FALLBACK_HOME;
  })();

  return state.homePromise;
}

function saveFavorites(){
  writeStorage(STORAGE_KEYS.favorites, state.favorites);
  updateHeaderCounters();
  renderFavoritesDrawer();
}

function saveCart(){
  writeStorage(STORAGE_KEYS.cart, state.cart);
  updateHeaderCounters();
  renderCartDrawer();
}

function updateHeaderCounters(){
  const favoriteCount = state.favorites.length;
  const cartCount = state.cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);

  document.querySelectorAll('[data-favorite-count]').forEach((node) => {
    node.textContent = favoriteCount;
    node.hidden = favoriteCount <= 0;
  });

  document.querySelectorAll('[data-cart-count]').forEach((node) => {
    node.textContent = cartCount;
    node.hidden = cartCount <= 0;
  });
}

function showToast(message){
  const stack = document.getElementById('toastStack');
  if(!stack) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

function getProductUrl(product){
  return `producto.html?id=${encodeURIComponent(product.id)}&slug=${encodeURIComponent(product.slug)}`;
}

function getProductByIdOrSlug(products, id, slug){
  return products.find((product) => product.id === id || product.slug === slug) || null;
}

function buildStockPill(stock){
  if(stock <= 0) return '<span class="stock-pill out">Agotado</span>';
  if(stock <= 3) return '<span class="stock-pill low">Últimas unidades</span>';
  return '<span class="stock-pill">Disponible</span>';
}

function isFavorite(productId){
  return state.favorites.includes(productId);
}

function toggleFavorite(productId, silent = false){
  if(isFavorite(productId)){
    state.favorites = state.favorites.filter((id) => id !== productId);
    if(!silent) showToast('Se eliminó de favoritos.');
  }else{
    state.favorites = [...state.favorites, productId];
    if(!silent) showToast('Añadido a favoritos.');
  }
  saveFavorites();
  document.querySelectorAll(`[data-favorite-btn="${CSS.escape(productId)}"]`).forEach((button) => syncFavoriteButton(button, productId));
}

function syncFavoriteButton(button, productId){
  const active = isFavorite(productId);
  button.setAttribute('aria-pressed', String(active));
  button.innerHTML = active ? ICONS.heartFilled : ICONS.heart;
}

function createFavoriteButton(productId){
  return `<button class="icon-only" type="button" aria-label="Agregar a favoritos" data-favorite-btn="${escapeHtml(productId)}"></button>`;
}

function bindFavoriteButtons(scope = document){
  scope.querySelectorAll('[data-favorite-btn]').forEach((button) => {
    const id = button.getAttribute('data-favorite-btn');
    syncFavoriteButton(button, id);
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleFavorite(id);
    }, { once: false });
  });
}

function bindCatalogCardNavigation(scope = document){
  scope.querySelectorAll('[data-card-link]').forEach((card) => {
    const url = card.getAttribute('data-card-link');
    if(!url) return;

    card.addEventListener('click', (event) => {
      if(event.target.closest('a, button, input, select, textarea, label')) return;
      window.location.href = url;
    });

    card.addEventListener('keydown', (event) => {
      if(event.key !== 'Enter' && event.key !== ' ') return;
      if(event.target.closest('a, button, input, select, textarea, label')) return;
      event.preventDefault();
      window.location.href = url;
    });
  });
}

function addToCart(product, quantity = 1, presentation = product.presentationOptions?.[0] || product.presentation || 'Disponible'){
  const safeQty = Math.max(1, Number(quantity) || 1);
  const existing = state.cart.find((item) => item.id === product.id && item.presentation === presentation);

  if(existing){
    existing.quantity += safeQty;
  }else{
    state.cart.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      presentation,
      quantity: safeQty
    });
  }

  saveCart();
  showToast('Producto añadido al carrito.');
}

function updateCartQty(id, presentation, delta){
  const item = state.cart.find((entry) => entry.id === id && entry.presentation === presentation);
  if(!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveCart();
}

function removeFromCart(id, presentation){
  state.cart = state.cart.filter((item) => !(item.id === id && item.presentation === presentation));
  saveCart();
}

function renderFavoritesDrawer(){
  const target = document.getElementById('favoriteList');
  if(!target) return;
  const products = state.productsCache.length ? state.productsCache : FALLBACK_PRODUCTS;
  const items = products.filter((product) => state.favorites.includes(product.id));

  if(!items.length){
    target.innerHTML = '<div class="empty-copy">Guarda aquí tus perfumes preferidos y vuelve cuando quieras revisarlos.</div>';
    return;
  }

  target.innerHTML = items.map((product) => `
    <article class="favorite-item">
      <a class="favorite-thumb" href="${getProductUrl(product)}"><img ${buildImgAttributes(product.image, product.name, 'loading="lazy" decoding="async"')}></a>
      <div class="favorite-meta">
        <div class="item-subtle">${escapeHtml(product.brand)}</div>
        <a class="item-title" href="${getProductUrl(product)}">${escapeHtml(product.name)}</a>
        <div class="item-price">${formatMoney(product.price)}</div>
      </div>
      <button class="item-remove" type="button" data-remove-favorite="${escapeHtml(product.id)}" aria-label="Eliminar de favoritos">×</button>
    </article>
  `).join('');

  target.querySelectorAll('[data-remove-favorite]').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(button.dataset.removeFavorite));
  });
}

function renderCartDrawer(){
  const target = document.getElementById('cartList');
  const totalNode = document.getElementById('cartTotal');
  if(!target || !totalNode) return;

  if(!state.cart.length){
    target.innerHTML = '<div class="empty-copy">Tu carrito está vacío. Explora el catálogo y añade tus favoritos.</div>';
    totalNode.textContent = formatMoney(0);
    return;
  }

  target.innerHTML = state.cart.map((item) => `
    <article class="cart-item">
      <div class="cart-thumb"><img ${buildImgAttributes(item.image, item.name, 'loading="lazy" decoding="async"')}></div>
      <div class="cart-meta">
        <div class="item-subtle">${escapeHtml(item.brand || 'VUZALKA')}</div>
        <a class="item-title" href="producto.html?id=${encodeURIComponent(item.id)}&slug=${encodeURIComponent(item.slug || slugify(item.name))}">${escapeHtml(item.name)}</a>
        <div class="item-link">${escapeHtml(item.presentation || 'Disponible')}</div>
        <div class="qty-stepper" data-cart-stepper="${escapeHtml(item.id)}|${escapeHtml(item.presentation)}">
          <button type="button" data-cart-delta="-1">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-cart-delta="1">+</button>
        </div>
      </div>
      <div style="display:grid;gap:10px;justify-items:end;align-self:stretch;">
        <div class="item-price">${formatMoney(item.price * item.quantity)}</div>
        <button class="item-remove" type="button" data-cart-remove="${escapeHtml(item.id)}|${escapeHtml(item.presentation)}" aria-label="Eliminar">×</button>
      </div>
    </article>
  `).join('');

  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalNode.textContent = formatMoney(total);

  target.querySelectorAll('[data-cart-stepper]').forEach((stepper) => {
    const [id, presentation] = stepper.dataset.cartStepper.split('|');
    stepper.querySelectorAll('[data-cart-delta]').forEach((button) => {
      button.addEventListener('click', () => updateCartQty(id, presentation, Number(button.dataset.cartDelta)));
    });
  });

  target.querySelectorAll('[data-cart-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      const [id, presentation] = button.dataset.cartRemove.split('|');
      removeFromCart(id, presentation);
    });
  });
}

function getCartTotal(){
  return state.cart.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
}

function buildMercadoPagoCartProduct(){
  const total = getCartTotal();
  const items = state.cart.map((item) => ({
    id: item.id || '',
    slug: item.slug || '',
    name: item.name || 'Producto VUZALKA',
    brand: item.brand || 'VUZALKA',
    presentation: item.presentation || 'Disponible',
    quantity: Number(item.quantity) || 1,
    price: Number(item.price) || 0,
    subtotal: (Number(item.price) || 0) * (Number(item.quantity) || 1)
  }));

  return {
    id: 'cart-checkout',
    name: 'Pedido VUZALKA',
    paymentTitle: 'Pedido VUZALKA',
    brand: 'VUZALKA',
    price: total,
    source: 'cart',
    items
  };
}

function buildWhatsAppCartMessage(){
  if(!state.cart.length) return '';

  const total = getCartTotal();
  const lines = [
    'Hola VUZALKA, quiero continuar con este pedido:',
    '',
    ...state.cart.map((item, index) => `${index + 1}. ${item.name} · ${item.presentation} · x${item.quantity} · ${formatMoney(item.price * item.quantity)}`),
    '',
    `Total estimado: ${formatMoney(total)}`
  ];

  return encodeURIComponent(lines.join('\n'));
}

function renderSearchResults(products, query){
  const target = document.getElementById('searchResults');
  if(!target) return;

  const term = query.trim().toLowerCase();
  if(!term){
    target.innerHTML = '<div class="empty-copy">Busca por marca, perfume o estilo. Ejemplo: Khamrah, fresco, noche.</div>';
    return;
  }

  const results = products.filter((product) => {
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
    return haystack.includes(term);
  }).slice(0, 8);

  if(!results.length){
    target.innerHTML = '<div class="empty-copy">No encontramos coincidencias. Prueba con otra palabra.</div>';
    return;
  }

  target.innerHTML = results.map((product) => `
    <article class="search-item">
      <a class="search-thumb" href="${getProductUrl(product)}"><img ${buildImgAttributes(product.image, product.name, 'loading="lazy" decoding="async"')}></a>
      <div class="search-meta">
        <div class="item-subtle">${escapeHtml(product.brand)} · ${escapeHtml(product.category)}</div>
        <a class="item-title" href="${getProductUrl(product)}">${escapeHtml(product.name)}</a>
        <div class="item-price">${formatMoney(product.price)}</div>
      </div>
      <a class="item-link" href="${getProductUrl(product)}">Ver</a>
    </article>
  `).join('');
}


function getHoverImage(product){
  if(!product) return '';
  const gallery = Array.isArray(product.gallery) ? product.gallery.filter(Boolean) : [];
  return gallery.length > 1 ? gallery[1] : '';
}

function createHoverMedia(mediaClassName, product, productUrl){
  const hover = getHoverImage(product);
  const hoverMarkup = hover
    ? `<img class="product-media-secondary" ${buildImgAttributes(hover, '', 'loading="lazy" decoding="async" aria-hidden="true"')}>`
    : '';

  return `
    <a class="${mediaClassName}${hover ? ' has-hover-image' : ''}" href="${productUrl}">
      <img class="product-media-primary" ${buildImgAttributes(product.image || '', product.name, 'loading="lazy" decoding="async"')}>
      ${hoverMarkup}
    </a>
  `;
}

function createCollectionCard(product){
  const productUrl = getProductUrl(product);

  return `
    <article class="collection-card">
      ${createHoverMedia('collection-media', product, productUrl)}

      <div class="collection-info">
        <div class="collection-meta-top">
          <div class="item-subtle">${escapeHtml(product.brand)}</div>
        </div>
        <h3><a href="${productUrl}">${escapeHtml(product.name)}</a></h3>
        <div class="collection-bottom">
          <div class="price-now">${formatMoney(product.price)}</div>
          <a class="collection-detail-link" href="${productUrl}">Ver perfume</a>
        </div>
      </div>
    </article>
  `;
}

function createCatalogCard(product){
  const productUrl = getProductUrl(product);
  const hover = getHoverImage(product);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return `
    <article class="pf-card" data-card-link="${productUrl}" role="link" tabindex="0" aria-label="Ver ${escapeHtml(product.name)}">
      <div class="pf-card-img${hover ? ' has-hover-image' : ''}">
        <a href="${productUrl}" tabindex="-1" aria-hidden="true">
          <img class="product-media-primary" ${buildImgAttributes(product.image || '', product.name, 'loading="lazy" decoding="async"')}>
          ${hover ? `<img class="product-media-secondary" ${buildImgAttributes(hover, '', 'loading="lazy" decoding="async" aria-hidden="true"')}>` : ''}
        </a>
        ${hasDiscount ? `<div class="pf-discount-badge">−${discountPct}%</div>` : `<div class="pf-card-badges">${buildStockPill(product.stock)}</div>`}
        <div class="pf-card-fav">${createFavoriteButton(product.id)}</div>
        <div class="pf-card-action"><a href="${productUrl}">Ver perfume</a></div>
      </div>
      <div class="pf-card-body">
        <div class="pf-card-brand">${escapeHtml(product.brand)}</div>
        <h3 class="pf-card-name"><a href="${productUrl}">${escapeHtml(product.name)}</a></h3>
        <div class="pf-card-price-row">
          ${hasDiscount ? `<span class="pf-card-was">${formatMoney(product.compareAtPrice)}</span>` : ''}
          <span class="pf-card-price">${formatMoney(product.price)}</span>
        </div>
      </div>
    </article>
  `;
}

function createRecommendCard(product){
  return `
    <article class="rec-card">
      <div class="tag-row">
        <span class="tag-pill">${escapeHtml(product.category)}</span>
        ${buildStockPill(product.stock)}
      </div>
      ${createHoverMedia('rec-card-media', product, getProductUrl(product))}
      <div class="rec-card-meta">
        <div class="item-subtle">${escapeHtml(product.brand)}</div>
        <h3><a href="${getProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
        <div class="price-row">
          ${product.compareAtPrice ? `<span class="price-was">${formatMoney(product.compareAtPrice)}</span>` : ''}
          <span class="price-now">${formatMoney(product.price)}</span>
        </div>
      </div>
    </article>
  `;
}

function setupGlobalShell(){
  installImageFallbacks();

  document.querySelectorAll('[data-icon="menu"]').forEach((node) => node.innerHTML = ICONS.menu);
  document.querySelectorAll('[data-icon="search"]').forEach((node) => node.innerHTML = ICONS.search);
  document.querySelectorAll('[data-icon="heart"]').forEach((node) => node.innerHTML = ICONS.heart);
  document.querySelectorAll('[data-icon="bag"]').forEach((node) => node.innerHTML = ICONS.bag);
  document.querySelectorAll('[data-icon="user"]').forEach((node) => node.innerHTML = ICONS.user);
  document.querySelectorAll('[data-icon="phone"]').forEach((node) => node.innerHTML = ICONS.phone);
  document.querySelectorAll('[data-icon="chat"]').forEach((node) => node.innerHTML = ICONS.chat);
  document.querySelectorAll('[data-icon="secure"]').forEach((node) => node.innerHTML = ICONS.secure);
  document.querySelectorAll('[data-icon="return"]').forEach((node) => node.innerHTML = ICONS.return);
  document.querySelectorAll('[data-icon="shipping"]').forEach((node) => node.innerHTML = ICONS.shipping);

  const overlay = document.getElementById('sheetOverlay');
  const menu = document.getElementById('megaMenu');
  const search = document.getElementById('searchPanel');
  const favoritesDrawer = document.getElementById('favoritesDrawer');
  const cartDrawer = document.getElementById('cartDrawer');

  const panels = [
    { node: menu, bodyClass: 'menu-open' },
    { node: search, bodyClass: 'search-open' },
    { node: favoritesDrawer, bodyClass: 'drawer-open' },
    { node: cartDrawer, bodyClass: 'drawer-open' }
  ];

  const closeAll = () => {
    panels.forEach(({ node }) => {
      if(!node) return;
      node.classList.remove('show');
      node.setAttribute('aria-hidden', 'true');
    });
    overlay?.classList.remove('show');
    document.body.classList.remove('menu-open', 'search-open', 'drawer-open', 'modal-open');
  };

  const openPanel = (panel, bodyClass) => {
    if(!panel) return;
    closeAll();
    panel.classList.add('show');
    panel.setAttribute('aria-hidden', 'false');
    overlay?.classList.add('show');
    document.body.classList.add(bodyClass);
  };

  document.querySelectorAll('[data-menu-toggle]').forEach((button) => button.addEventListener('click', () => {
    const shouldOpen = menu && !menu.classList.contains('show');
    closeAll();
    if(shouldOpen) openPanel(menu, 'menu-open');
  }));

  document.querySelectorAll('.mega-menu .menu-nav a').forEach((link) => {
    link.addEventListener('click', closeAll);
  });

  document.querySelectorAll('[data-search-toggle]').forEach((button) => button.addEventListener('click', async () => {
    const shouldOpen = search && !search.classList.contains('show');
    closeAll();
    if(!shouldOpen) return;

    openPanel(search, 'search-open');
    const input = document.getElementById('globalSearchInput');
    if(input){
      input.focus();
      const products = await getProducts();
      renderSearchResults(products, input.value || '');
    }
  }));

  document.querySelectorAll('[data-favorites-toggle]').forEach((button) => button.addEventListener('click', () => {
    const shouldOpen = favoritesDrawer && !favoritesDrawer.classList.contains('show');
    closeAll();
    if(shouldOpen){
      openPanel(favoritesDrawer, 'drawer-open');
      renderFavoritesDrawer();
    }
  }));

  document.querySelectorAll('[data-cart-toggle]').forEach((button) => button.addEventListener('click', () => {
    const shouldOpen = cartDrawer && !cartDrawer.classList.contains('show');
    closeAll();
    if(shouldOpen){
      openPanel(cartDrawer, 'drawer-open');
      renderCartDrawer();
    }
  }));

  document.querySelectorAll('[data-close-panel]').forEach((button) => button.addEventListener('click', closeAll));
  overlay?.addEventListener('click', closeAll);
  window.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') closeAll();
  });

  const searchInput = document.getElementById('globalSearchInput');
  if(searchInput){
    searchInput.addEventListener('input', async (event) => {
      const products = await getProducts();
      renderSearchResults(products, event.target.value);
    });
  }

  const checkoutLink = document.getElementById('checkoutWhatsapp');
  if(checkoutLink){
    checkoutLink.addEventListener('click', (event) => {
      if(!state.cart.length){
        event.preventDefault();
        showToast('Añade al menos un producto antes de continuar.');
        return;
      }
      checkoutLink.href = `https://wa.me/${CONTACT.whatsappNumber}?text=${buildWhatsAppCartMessage()}`;
    });
  }


  const checkoutMpButton = document.getElementById('checkoutMercadoPago');
  if(checkoutMpButton){
    checkoutMpButton.addEventListener('click', async () => {
      if(!state.cart.length){
        showToast('Añade al menos un producto antes de finalizar el pago.');
        return;
      }

      const originalText = checkoutMpButton.textContent;
      checkoutMpButton.disabled = true;
      checkoutMpButton.textContent = 'Preparando pago...';

      try{
        await pagarConMercadoPago(buildMercadoPagoCartProduct(), 1, 'Carrito completo');
      }finally{
        checkoutMpButton.disabled = false;
        checkoutMpButton.textContent = originalText || 'Finalizar pago';
      }
    });
  }

  const footerForm = document.getElementById('footerNewsletterForm');
  const contactForm = document.getElementById('contactForm');
  [footerForm, contactForm].filter(Boolean).forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Gracias. Recibimos tu mensaje y te contactaremos pronto.');
      form.reset();
    });
  });

  updateHeaderCounters();
  renderFavoritesDrawer();
  renderCartDrawer();
}

function setupHeaderBehavior(){
  const header = document.getElementById('siteHeader');
  if(!header) return;

  const BAR_THRESHOLD = 60; // px of scroll before bar hides

  const onScroll = () => {
    const scrollY = window.scrollY;
    const shouldSolid = document.body.dataset.page !== 'home' || scrollY > 30;
    header.classList.toggle('scrolled', shouldSolid);
    // Hide announcement bar after scrolling down, show when near top
    document.body.classList.toggle('bar-hidden', scrollY > BAR_THRESHOLD);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function bindHomeCollectionInteractions(scope = document){
  scope.querySelectorAll('[data-card-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-home-card]');
      if(!card) return;
      const isOpen = card.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
      button.textContent = isOpen ? 'Cerrar' : 'Notas';
    });
  });
}

function setupCollectionRailControls(){
  const rail = document.getElementById('featuredGrid');
  const prevButton = document.querySelector('[data-collection-prev]');
  const nextButton = document.querySelector('[data-collection-next]');

  if(!rail || !prevButton || !nextButton) return;

  const updateButtons = () => {
    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const hasOverflow = maxScroll > 6;

    prevButton.disabled = !hasOverflow || rail.scrollLeft <= 6;
    nextButton.disabled = !hasOverflow || rail.scrollLeft >= maxScroll - 6;
  };

  rail._updateCollectionRail = updateButtons;

  if(rail.dataset.controlsReady === 'true'){
    updateButtons();
    return;
  }

  const scrollStep = (direction) => {
    const amount = Math.max(rail.clientWidth * 0.82, 280) * direction;
    rail.scrollBy({ left: amount, behavior: 'smooth' });
  };

  prevButton.addEventListener('click', () => scrollStep(-1));
  nextButton.addEventListener('click', () => scrollStep(1));
  rail.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);

  rail.dataset.controlsReady = 'true';
  updateButtons();
}

function renderHomeCollection(products, filter = 'all'){
  const grid = document.getElementById('featuredGrid');
  const count = document.getElementById('homeResultCount');
  if(!grid) return;
  grid.className = 'collection-rail';

  const normalizedFilter = (filter || 'all').toLowerCase();
  const filtered = normalizedFilter === 'all'
    ? products
    : products.filter((product) => [product.category, product.gender, product.brand].filter(Boolean).some((value) => value.toLowerCase() === normalizedFilter));

  const selection = filtered.slice(0, 12);
  grid.innerHTML = selection.length
    ? selection.map(createCollectionCard).join('')
    : '<div class="catalog-empty">No encontramos perfumes dentro de este universo. Prueba otro filtro.</div>';

  grid.scrollTo({ left: 0, behavior: 'auto' });

  if(count){
    count.textContent = `${selection.length} ${selection.length === 1 ? 'perfume' : 'perfumes'}`;
  }

  bindHomeCollectionInteractions(grid);

  if(typeof grid._updateCollectionRail === 'function'){
    grid._updateCollectionRail();
  }
}

async function initHomePage(){
  const [products, home] = await Promise.all([getProducts(), getHomeConfig()]);

  // ── HERO: texto + carrusel de imágenes ───────────────────────────
  const heroSection = document.getElementById('homeHero');
  if(heroSection){
    const heroKicker = heroSection.querySelector('[data-hero-kicker], .hero-top-label');
    const heroTitle = heroSection.querySelector('[data-hero-title], .hero-title-overlay');
    const heroDescription = heroSection.querySelector('[data-hero-description], .hero-lead');
    const primaryButton = heroSection.querySelector('[data-hero-primary]');
    const secondaryButton = heroSection.querySelector('[data-hero-secondary]');

    if(heroKicker) heroKicker.textContent = home.heroKicker || FALLBACK_HOME.heroKicker;
    if(heroTitle){
      const heroTitleText = home.heroTitle || FALLBACK_HOME.heroTitle;
      const heroTitleImage = heroSection.querySelector('.hero-logo');
      if(heroTitleImage){
        heroTitleImage.alt = heroTitleText;
      }else{
        heroTitle.textContent = heroTitleText;
      }
    }
    if(heroDescription) heroDescription.textContent = home.heroDescription || FALLBACK_HOME.heroDescription;

    // ── Carrusel multi-imagen (NUEVO)
    // Compatibilidad: si solo viene `heroImage` (legado) y no `heroImages`,
    // se usa como array de 1 elemento.
    let images;
    if(Array.isArray(home.heroImages) && home.heroImages.length > 0){
      images = home.heroImages;
    }else if(home.heroImage){
      images = [home.heroImage];
    }else{
      images = FALLBACK_HOME.heroImages;
    }
    applyHeroCarousel(
      images,
      home.carouselIntervalSec || FALLBACK_HOME.carouselIntervalSec,
      home.carouselTransition || FALLBACK_HOME.carouselTransition
    );

    if(primaryButton){
      primaryButton.textContent = home.primaryButtonText || FALLBACK_HOME.primaryButtonText;
      primaryButton.href = home.primaryButtonLink || FALLBACK_HOME.primaryButtonLink;
    }

    if(secondaryButton){
      secondaryButton.textContent = home.secondaryButtonText || FALLBACK_HOME.secondaryButtonText;
      secondaryButton.href = home.secondaryButtonLink || FALLBACK_HOME.secondaryButtonLink;
    }

    // Revelar los botones del hero AHORA que tienen los textos correctos.
    // La clase hero-ready dispara la animación de entrada en CSS,
    // evitando cualquier destello de texto hardcodeado antiguo.
    const heroActions = heroSection.querySelector('.hero-actions');
    if(heroActions) heroActions.classList.add('hero-ready');
  }

  // ── BARRA DE ANUNCIOS (marquee superior) ─────────────────────────
  applyAnnouncementBar(
    home.showAnnouncementBar !== false,
    Array.isArray(home.announcementMessages) && home.announcementMessages.length > 0
      ? home.announcementMessages
      : FALLBACK_HOME.announcementMessages
  );

  // ── GARANTÍAS (trust badges) ─────────────────────────────────────
  applyTrustBadges(
    home.showTrustBadges !== false,
    Array.isArray(home.trustBadges) && home.trustBadges.length === 4
      ? home.trustBadges
      : FALLBACK_HOME.trustBadges
  );

  // ── TESTIMONIOS ──────────────────────────────────────────────────
  applyTestimonials(
    home.showTestimonials !== false,
    Array.isArray(home.testimonials) && home.testimonials.length > 0
      ? home.testimonials
      : FALLBACK_HOME.testimonials
  );

  // ── Compatibilidad hacia atrás (campo antiguo newsText) ──────────
  const introCopy = document.querySelector('[data-home-news]');
  if(introCopy){
    introCopy.textContent = home.newsText || '';
  }

  // ── COLECCIÓN DESTACADA (ya existente) ───────────────────────────
  renderHomeCollection(products, 'all');
  setupCollectionRailControls();

  document.querySelectorAll('[data-home-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-home-filter]').forEach((chip) => chip.classList.toggle('active', chip === button));
      renderHomeCollection(products, button.dataset.homeFilter || 'all');
    });
  });
}

// ─────────────────────────────────────────────────────────────
//   BARRA DE ANUNCIOS — actualiza el marquee con la lista nueva
// ─────────────────────────────────────────────────────────────
/**
 * Aplica la lista de mensajes a la barra de anuncios superior.
 * Si `show` es false, oculta la barra completa.
 * La lista se duplica internamente para que el loop CSS sea infinito sin cortes.
 */
function applyAnnouncementBar(show, messages){
  const bar = document.querySelector('[data-announcement-bar]') || document.getElementById('announcementBar');
  if(!bar) return;
  const track = bar.querySelector('[data-announcement-track]') || bar.querySelector('.announcement-track');
  if(!track) return;

  if(!show || !messages || messages.length === 0){
    bar.style.display = 'none';
    // Quitar la clase del body que ajusta el header
    if(document.body.dataset.page === 'home'){
      document.body.classList.add('no-announcement');
    }
    return;
  }

  bar.style.display = '';
  document.body.classList.remove('no-announcement');

  // Limpiar y reconstruir. Duplicamos los items para que la animación marquee
  // (que avanza un 50% del track) tenga un loop continuo sin "salto".
  const clean = messages.map(s => String(s || '').trim()).filter(Boolean);
  const doubled = clean.concat(clean);
  track.innerHTML = doubled.map(m => `<span>${escapeHtml(m)}</span>`).join('');
}

// ─────────────────────────────────────────────────────────────
//   GARANTÍAS — actualiza los 4 trust badges con los textos nuevos
// ─────────────────────────────────────────────────────────────
/**
 * Aplica los 4 trust badges. Los íconos SVG quedan fijos en el HTML;
 * solo se actualizan el título y la descripción.
 */
function applyTrustBadges(show, badges){
  const strip = document.querySelector('[data-trust-strip]') || document.getElementById('trustStrip');
  if(!strip) return;

  if(!show){
    strip.style.display = 'none';
    return;
  }
  strip.style.display = '';

  const items = strip.querySelectorAll('[data-trust-index]');
  items.forEach((item, i) => {
    const data = badges[i] || FALLBACK_HOME.trustBadges[i] || { title: '', subtitle: '' };
    const titleEl = item.querySelector('[data-trust-title], .trust-label');
    const subEl = item.querySelector('[data-trust-subtitle], .trust-sub');
    if(titleEl) titleEl.textContent = data.title || FALLBACK_HOME.trustBadges[i].title;
    if(subEl) subEl.textContent = data.subtitle || FALLBACK_HOME.trustBadges[i].subtitle;
  });
}

// ─────────────────────────────────────────────────────────────
//   TESTIMONIOS — renderiza todos los testimonios dinámicamente
// ─────────────────────────────────────────────────────────────
const TESTIMONIAL_STAR_SVG = '<svg viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>';
const TESTIMONIAL_PRODUCT_ICON = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>';

/**
 * Renderiza los testimonios dentro del contenedor data-testimonials-grid.
 * Si `show` es false, oculta toda la sección.
 */
function applyTestimonials(show, testimonials){
  const section = document.querySelector('[data-testimonials-section]') || document.getElementById('testimonialsSection');
  const grid = document.querySelector('[data-testimonials-grid]') || (section && section.querySelector('.testimonials-grid'));
  if(!section || !grid) return;

  if(!show || !testimonials || testimonials.length === 0){
    section.style.display = 'none';
    return;
  }
  section.style.display = '';

  grid.innerHTML = testimonials.map(t => {
    const safeName = String(t.name || 'Cliente').trim();
    const initials = safeName.split(/\s+/).map(w => w[0] || '').join('').slice(0,2).toUpperCase() || 'VZ';
    const stars = TESTIMONIAL_STAR_SVG.repeat(5);
    const productHtml = t.product
      ? `<span class="testimonial-product">${TESTIMONIAL_PRODUCT_ICON}${escapeHtml(t.product)}</span>`
      : '';
    return `
      <article class="testimonial-card">
        <div class="testimonial-stars" aria-label="5 estrellas">${stars}</div>
        <blockquote class="testimonial-quote">"${escapeHtml(t.quote || '')}"</blockquote>
        <div class="testimonial-author">
          <div class="testimonial-avatar" aria-hidden="true">${escapeHtml(initials)}</div>
          <div>
            <div class="testimonial-name">${escapeHtml(safeName)}</div>
            <div class="testimonial-city">${escapeHtml(t.city || '')}</div>
          </div>
        </div>
        ${productHtml}
      </article>
    `;
  }).join('');
}

async function initCatalogPage(){
  const products = await getProducts();
  const grid = document.getElementById('catalogGrid');
  const searchInput = document.getElementById('catalogSearch');
  const sortSelect = document.getElementById('catalogSort');
  const resultCount = document.getElementById('catalogResultCount');
  const pageCount = document.getElementById('catPageCount');
  const catNav = document.getElementById('catNav');

  // Set total count in heading
  if(pageCount) pageCount.textContent = `${products.length} fragancias`;

  // Build category nav pills
  const categories = ['Todos', ...new Set(products.map((p) => p.category).filter(Boolean))];
  if(catNav){
    catNav.innerHTML = categories.map((cat) =>
      `<button class="cat-nav-btn${cat === 'Todos' ? ' active' : ''}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
    ).join('');
    catNav.querySelectorAll('.cat-nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        catNav.querySelectorAll('.cat-nav-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        render();
      });
    });
  }

  function getActiveCategory(){
    const active = catNav ? catNav.querySelector('.cat-nav-btn.active') : null;
    return active ? active.dataset.cat : 'Todos';
  }

  function render(){
    const term = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const category = getActiveCategory();
    const sortBy = sortSelect ? sortSelect.value : 'name';

    let filtered = products.filter((product) => {
      const haystack = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
      const matchesTerm = !term || haystack.includes(term);
      const matchesCategory = category === 'Todos' || product.category === category;
      return matchesTerm && matchesCategory;
    });

    if(sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if(sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if(sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if(sortBy === 'stock') filtered.sort((a, b) => b.stock - a.stock);

    if(resultCount) resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'perfume' : 'perfumes'}`;

    if(!filtered.length){
      grid.innerHTML = '<div class="cat-empty"><p>Sin resultados para esa búsqueda.</p></div>';
      return;
    }

    grid.innerHTML = filtered.map(createCatalogCard).join('');
    bindFavoriteButtons(grid);
    bindCatalogCardNavigation(grid);
  }

  if(searchInput) searchInput.addEventListener('input', render);
  if(sortSelect) sortSelect.addEventListener('change', render);
  render();
}

function setupAccordion(root){
  root.querySelectorAll('[data-accordion-item]').forEach((item, index) => {
    const button = item.querySelector('[data-accordion-toggle]');
    const content = item.querySelector('[data-accordion-content]');
    if(!button || !content) return;

    if(index === 0){
      item.classList.add('open');
      content.style.maxHeight = `${content.scrollHeight}px`;
    }

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      content.style.maxHeight = !isOpen ? `${content.scrollHeight}px` : '0px';
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

async function initProductPage(){
  const products = await getProducts();
  const params = new URLSearchParams(window.location.search);
  const product = getProductByIdOrSlug(products, params.get('id'), params.get('slug')) || products[0];

  if(!product) return;

  document.title = `VUZALKA | ${product.name}`;

  const breadcrumbName = document.getElementById('breadcrumbName');
  if(breadcrumbName) breadcrumbName.textContent = product.name;

  const gallery = product.gallery?.length
  ? product.gallery
  : (product.image ? [product.image] : []);
  const mainImage = document.getElementById('productMainImage');
  const thumbs = document.getElementById('productThumbs');
  const stickyImage = document.getElementById('stickyBarImage');

if(mainImage){
  mainImage.hidden = true;
  mainImage.removeAttribute('src');
  mainImage.alt = '';
}

if(stickyImage){
  stickyImage.hidden = true;
  stickyImage.removeAttribute('src');
  stickyImage.alt = '';
}
  const prevBtn = document.getElementById('mediaPrev');
  const nextBtn = document.getElementById('mediaNext');
  const brand = document.getElementById('productBrand');
  const name = document.getElementById('productName');
  const priceNow = document.getElementById('productPriceNow');
  const priceWas = document.getElementById('productPriceWas');
  const desc = document.getElementById('productDescription');
  const presentationWrap = document.getElementById('presentationOptions');
  const qtyInput = document.getElementById('productQtyInput');
  const addBtn = document.getElementById('addToCartBtn');
  const buyNowBtn = document.getElementById('buyNowBtn');
  const stickyBtn = document.getElementById('stickyAddToCartBtn');
  const viewerNote = document.getElementById('productViewerNote');
  const stockPill = document.getElementById('productStockPill');
  const favoriteBtn = document.getElementById('productFavoriteBtn');
  const storyTitle = document.getElementById('productStoryTitle');
  const storyText = document.getElementById('productStoryText');
  const facts = document.getElementById('productFacts');
  const recommendations = document.getElementById('recommendGrid');
  const stickyBar = document.getElementById('productBar');
  const stickyTitle = document.getElementById('stickyBarTitle');
  const stickyPrice = document.getElementById('stickyBarPrice');
  const stickySelect = document.getElementById('stickyPresentationSelect');

  let currentIndex = 0;
  let selectedPresentation = product.presentationOptions?.[0] || product.presentation || 'Disponible';

  brand.textContent = product.brand;
  name.textContent = product.name;
  priceNow.textContent = formatMoney(product.price);
  priceWas.textContent = product.compareAtPrice ? formatMoney(product.compareAtPrice) : '';
  priceWas.hidden = !product.compareAtPrice;
  desc.textContent = product.description;
  viewerNote.innerHTML = `${ICONS.eye}<span>${Math.max(11, product.stock * 7)} clientes están viendo este producto</span>`;
  stockPill.innerHTML = buildStockPill(product.stock);
  stockPill.className = '';
  storyTitle.textContent = 'Descripción olfativa';
  storyText.innerHTML = `
    <p>${escapeHtml(product.story)}</p>
    <p>${escapeHtml(product.description)}</p>
    <p>${product.features.map((item) => `• ${escapeHtml(item)}`).join('<br>')}</p>
  `;
  stickyTitle.textContent = product.name;
  stickyPrice.textContent = formatMoney(product.price);
  if(stickyImage && product.image){
  stickyImage.src = getOptimizedImage(product.image);
    stickyImage.dataset.fallbackSrc = product.image;
  stickyImage.alt = product.name;
  stickyImage.hidden = false;
}
  const factRows = [
    { icon: ICONS.gender, label: 'Género', value: product.gender || 'No especificado' },
    { icon: ICONS.atom, label: 'Concentración', value: product.concentration || 'Información disponible por WhatsApp' },
    { icon: ICONS.globe, label: 'Origen', value: product.origin || product.brand }
  ];

  facts.innerHTML = factRows.map((fact) => `
    <div class="fact-row">
      <div class="fact-icon">${fact.icon}</div>
      <div>
        <div class="fact-label">${escapeHtml(fact.label)}</div>
        <div class="fact-value">${escapeHtml(fact.value)}</div>
      </div>
    </div>
  `).join('');

  function renderMainImage(index){
  if(!gallery.length || !mainImage) return;

  currentIndex = (index + gallery.length) % gallery.length;
  mainImage.src = getOptimizedImage(gallery[currentIndex]);
  mainImage.dataset.fallbackSrc = gallery[currentIndex];
  mainImage.alt = product.name;
  mainImage.hidden = false;

  thumbs.querySelectorAll('[data-thumb-index]').forEach((button, thumbIndex) => {
    button.classList.toggle('active', thumbIndex === currentIndex);
  });
}

  thumbs.innerHTML = gallery.map((image, index) => `
    <button class="product-thumb ${index === 0 ? 'active' : ''}" type="button" data-thumb-index="${index}">
      <img ${buildImgAttributes(image, `${product.name} ${index + 1}`, 'loading="lazy" decoding="async"')}>
    </button>
  `).join('');

  thumbs.querySelectorAll('[data-thumb-index]').forEach((button) => {
    button.addEventListener('click', () => renderMainImage(Number(button.dataset.thumbIndex)));
  });

  if(gallery.length){
  prevBtn?.addEventListener('click', () => renderMainImage(currentIndex - 1));
  nextBtn?.addEventListener('click', () => renderMainImage(currentIndex + 1));
  renderMainImage(0);
} else {
  if(prevBtn) prevBtn.style.display = 'none';
  if(nextBtn) nextBtn.style.display = 'none';
}

  presentationWrap.innerHTML = product.presentationOptions.map((option, index) => `
    <button class="option-chip ${index === 0 ? 'active' : ''}" type="button" data-presentation-option="${escapeHtml(option)}">${escapeHtml(option)}</button>
  `).join('');

  stickySelect.innerHTML = product.presentationOptions.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join('');

  presentationWrap.querySelectorAll('[data-presentation-option]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedPresentation = button.dataset.presentationOption;
      stickySelect.value = selectedPresentation;
      presentationWrap.querySelectorAll('.option-chip').forEach((chip) => chip.classList.toggle('active', chip === button));
    });
  });

  stickySelect.addEventListener('change', () => {
    selectedPresentation = stickySelect.value;
    presentationWrap.querySelectorAll('[data-presentation-option]').forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.presentationOption === selectedPresentation);
    });
  });

 const addOnlyToCart = (quantity) => addToCart(product, quantity, selectedPresentation);
const buyNow = async (quantity) => {
  await pagarConMercadoPago(product, quantity, selectedPresentation);
};

  document.getElementById('qtyMinus').addEventListener('click', () => { qtyInput.value = Math.max(1, Number(qtyInput.value || 1) - 1); });
  document.getElementById('qtyPlus').addEventListener('click', () => { qtyInput.value = Math.max(1, Number(qtyInput.value || 1) + 1); });
  document.getElementById('stickyQtyMinus').addEventListener('click', () => {
    const target = document.getElementById('stickyQtyValue');
    target.value = Math.max(1, Number(target.value || 1) - 1);
  });
  document.getElementById('stickyQtyPlus').addEventListener('click', () => {
    const target = document.getElementById('stickyQtyValue');
    target.value = Math.max(1, Number(target.value || 1) + 1);
  });

addBtn?.addEventListener('click', () => {
  addOnlyToCart(qtyInput.value);
});

buyNowBtn?.addEventListener('click', async () => {
  await buyNow(qtyInput.value);
});

stickyBtn?.addEventListener('click', () => {
  addOnlyToCart(document.getElementById('stickyQtyValue').value);
});

  if(favoriteBtn){
    favoriteBtn.dataset.favoriteBtn = product.id;
    syncFavoriteButton(favoriteBtn, product.id);
    favoriteBtn.addEventListener('click', () => toggleFavorite(product.id));
  }

  const accordion = document.getElementById('productAccordions');
  accordion.innerHTML = `
    <div class="accordion-item" data-accordion-item>
      <button class="accordion-toggle" type="button" aria-expanded="true" data-accordion-toggle><span>Descripción</span><span>+</span></button>
      <div class="accordion-content" data-accordion-content><div class="accordion-content-inner">${escapeHtml(product.description)}</div></div>
    </div>
    <div class="accordion-item" data-accordion-item>
      <button class="accordion-toggle" type="button" aria-expanded="false" data-accordion-toggle><span>Envíos</span><span>+</span></button>
      <div class="accordion-content" data-accordion-content><div class="accordion-content-inner">${escapeHtml(product.shipping)}</div></div>
    </div>
    <div class="accordion-item" data-accordion-item>
      <button class="accordion-toggle" type="button" aria-expanded="false" data-accordion-toggle><span>Garantía</span><span>+</span></button>
      <div class="accordion-content" data-accordion-content><div class="accordion-content-inner">${escapeHtml(product.warranty)}</div></div>
    </div>
    <div class="accordion-item" data-accordion-item>
      <button class="accordion-toggle" type="button" aria-expanded="false" data-accordion-toggle><span>Medios de pago</span><span>+</span></button>
      <div class="accordion-content" data-accordion-content><div class="accordion-content-inner">${escapeHtml(product.payments)}</div></div>
    </div>
  `;
  setupAccordion(accordion);

  const recommended = products.filter((item) => item.id !== product.id).slice(0, 4);
  recommendations.innerHTML = recommended.map(createRecommendCard).join('');
  bindFavoriteButtons(recommendations);

  const toggleStickyBar = () => {
    const triggerY = window.innerHeight * 0.75;
    const shouldShow = window.scrollY > triggerY;
    stickyBar.classList.toggle('show', shouldShow);
  };
  toggleStickyBar();
  window.addEventListener('scroll', toggleStickyBar, { passive: true });
}

function initStaticPages(){
  const activeLink = document.querySelector(`[data-nav-link="${document.body.dataset.page}"]`);
  if(activeLink) activeLink.setAttribute('aria-current', 'page');
}

function injectYear(){
  document.querySelectorAll('[data-current-year]').forEach((node) => node.textContent = new Date().getFullYear());
}

async function main(){
  injectYear();
  setupGlobalShell();
  setupHeaderBehavior();
  initStaticPages();

  // Seguridad: si initHomePage tarda más de 4s o falla, los botones
  // del hero aparecen igual (con el texto del FALLBACK que ya es correcto).
  if(document.body.dataset.page === 'home'){
    setTimeout(() => {
      const heroActions = document.querySelector('.hero-actions');
      if(heroActions && !heroActions.classList.contains('hero-ready')){
        heroActions.classList.add('hero-ready');
      }
    }, 4000);
  }

  try{
    const page = document.body.dataset.page;
    if(page === 'home') await initHomePage();
    if(page === 'catalog') await initCatalogPage();
    if(page === 'product') await initProductPage();

    const products = await getProducts();
    renderSearchResults(products, '');
  }catch(error){
    console.error('No se pudo iniciar la página por completo:', error);
    showToast('Algunos elementos tardaron en cargar. Intenta recargar la página.');
  }
}

main();
