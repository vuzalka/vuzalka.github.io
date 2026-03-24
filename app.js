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
  heroTitle: 'VUZALKA',
  heroDescription: 'Una curaduría de fragancias con carácter, presencia y estética contemporánea. Menos ruido, más esencia.',
  heroImage: 'assets/fondo-vuzalka.png',
  heroKicker: 'Colección destacada',
  newsText: 'Envíos a todo Colombia · atención personalizada por WhatsApp · selección premium de perfumes.'
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

function escapeHtml(value){
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

async function pagarConMercadoPago(product, quantity = 1, presentation = 'Disponible'){
  try{
    const safeQty = Math.max(1, Number(quantity) || 1);
    const price = Number(product.price || 0);

    console.log('Producto a pagar:', product);
    console.log('Cantidad:', safeQty);
    console.log('Presentación:', presentation);
    console.log('Precio:', price);

    const orderRef = await addDoc(collection(db, 'orders'), {
      productId: product.id || '',
      productName: product.name || 'Producto VUZALKA',
      price,
      quantity: safeQty,
      presentation,
      status: 'pending',
      createdAt: serverTimestamp()
    });

    const orderId = orderRef.id;
    console.log('Order ID creado:', orderId);

    const payload = {
      orderId,
      productId: product.id || '',
      productName: `${product.name} · ${presentation}`,
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

    const mp = new MercadoPago(MP_PUBLIC_KEY, {
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
    .split(/\n|\||,|\/+/)
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
    image: raw.imagen || raw.image || gallery[0] || 'assets/fondo-vuzalka.png',
    gallery: gallery.length ? gallery : [raw.imagen || raw.image || 'assets/fondo-vuzalka.png'],
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
      const snapshot = await getDocs(collection(db, 'products'));
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
      const snapshot = await getDoc(doc(db, 'siteContent', 'home'));
      if(snapshot.exists()){
        state.homeCache = { ...FALLBACK_HOME, ...snapshot.data() };
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
      <a class="favorite-thumb" href="${getProductUrl(product)}"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"></a>
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
      <div class="cart-thumb"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}"></div>
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

function buildWhatsAppCartMessage(){
  if(!state.cart.length) return '';

  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
      <a class="search-thumb" href="${getProductUrl(product)}"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"></a>
      <div class="search-meta">
        <div class="item-subtle">${escapeHtml(product.brand)} · ${escapeHtml(product.category)}</div>
        <a class="item-title" href="${getProductUrl(product)}">${escapeHtml(product.name)}</a>
        <div class="item-price">${formatMoney(product.price)}</div>
      </div>
      <a class="item-link" href="${getProductUrl(product)}">Ver</a>
    </article>
  `).join('');
}

function createCollectionCard(product){
  return `
    <a class="collection-card" href="${getProductUrl(product)}">
      <div class="collection-media"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"></div>
      <h3>${escapeHtml(product.name)}</h3>
    </a>
  `;
}

function createCatalogCard(product){
  return `
    <article class="catalog-card">
      <div class="card-top-row">
        <div class="tag-row">
          <span class="tag-pill">${escapeHtml(product.category)}</span>
          ${buildStockPill(product.stock)}
        </div>
        ${createFavoriteButton(product.id)}
      </div>
      <a class="catalog-media" href="${getProductUrl(product)}"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"></a>
      <div class="catalog-meta">
        <div class="item-subtle">${escapeHtml(product.brand)}</div>
        <h3><a href="${getProductUrl(product)}">${escapeHtml(product.name)}</a></h3>
        <div class="catalog-desc">${escapeHtml(product.description)}</div>
        <div class="price-row">
          ${product.compareAtPrice ? `<span class="price-was">${formatMoney(product.compareAtPrice)}</span>` : ''}
          <span class="price-now">${formatMoney(product.price)}</span>
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
      <a class="rec-card-media" href="${getProductUrl(product)}"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"></a>
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

  const closeAll = () => {
    [menu, search, favoritesDrawer, cartDrawer].forEach((panel) => panel?.classList.remove('show'));
    overlay?.classList.remove('show');
    document.body.classList.remove('menu-open', 'search-open', 'drawer-open');
  };

  document.querySelectorAll('[data-menu-toggle]').forEach((button) => button.addEventListener('click', () => {
    const open = !menu.classList.contains('show');
    closeAll();
    if(open){
      menu.classList.add('show');
      overlay.classList.add('show');
      document.body.classList.add('menu-open');
    }
  }));

  document.querySelectorAll('[data-search-toggle]').forEach((button) => button.addEventListener('click', async () => {
    const products = await getProducts();
    const open = !search.classList.contains('show');
    closeAll();
    if(open){
      search.classList.add('show');
      overlay.classList.add('show');
      document.body.classList.add('search-open');
      const input = document.getElementById('globalSearchInput');
      if(input){
        input.focus();
        renderSearchResults(products, input.value || '');
      }
    }
  }));

  document.querySelectorAll('[data-favorites-toggle]').forEach((button) => button.addEventListener('click', () => {
    const open = !favoritesDrawer.classList.contains('show');
    closeAll();
    if(open){
      favoritesDrawer.classList.add('show');
      overlay.classList.add('show');
      document.body.classList.add('drawer-open');
      renderFavoritesDrawer();
    }
  }));

  document.querySelectorAll('[data-cart-toggle]').forEach((button) => button.addEventListener('click', () => {
    const open = !cartDrawer.classList.contains('show');
    closeAll();
    if(open){
      cartDrawer.classList.add('show');
      overlay.classList.add('show');
      document.body.classList.add('drawer-open');
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

  const onScroll = () => {
    const shouldSolid = document.body.dataset.page !== 'home' || window.scrollY > 30;
    header.classList.toggle('scrolled', shouldSolid);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

async function initHomePage(){
  const [products, home] = await Promise.all([getProducts(), getHomeConfig()]);

  const heroSection = document.getElementById('homeHero');
  if(heroSection){
    heroSection.querySelector('[data-hero-kicker]').textContent = home.heroKicker || 'Selección destacada';
    heroSection.querySelector('[data-hero-title]').textContent = home.heroTitle || 'VUZALKA';
    heroSection.querySelector('[data-hero-description]').textContent = home.heroDescription || FALLBACK_HOME.heroDescription;
    heroSection.querySelector('[data-hero-image]').src = home.heroImage || FALLBACK_HOME.heroImage;
  }

  const introCopy = document.querySelector('[data-home-news]');
  if(introCopy){
    introCopy.textContent = home.newsText || FALLBACK_HOME.newsText;
  }

  const grid = document.getElementById('featuredGrid');
  if(grid){
    grid.innerHTML = products.slice(0, 8).map(createCollectionCard).join('');
  }
}

async function initCatalogPage(){
  const products = await getProducts();
  const grid = document.getElementById('catalogGrid');
  const searchInput = document.getElementById('catalogSearch');
  const categorySelect = document.getElementById('catalogCategory');
  const sortSelect = document.getElementById('catalogSort');
  const resultCount = document.getElementById('catalogResultCount');

  const categories = ['Todos', ...new Set(products.map((product) => product.category).filter(Boolean))];
  categorySelect.innerHTML = categories.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join('');

  function render(){
    const term = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const sortBy = sortSelect.value;

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

    resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'resultado' : 'resultados'}`;

    if(!filtered.length){
      grid.innerHTML = '<div class="catalog-empty">No encontramos perfumes con esos filtros.</div>';
      return;
    }

    grid.innerHTML = filtered.map(createCatalogCard).join('');
    bindFavoriteButtons(grid);
  }

  [searchInput, categorySelect, sortSelect].forEach((control) => control.addEventListener('input', render));
  [categorySelect, sortSelect].forEach((control) => control.addEventListener('change', render));
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

  const gallery = product.gallery.length ? product.gallery : [product.image];
  const mainImage = document.getElementById('mainProductImage');
  const thumbs = document.getElementById('productThumbs');
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
  document.getElementById('stickyBarImage').src = product.image;
  document.getElementById('stickyBarImage').alt = product.name;

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
    currentIndex = (index + gallery.length) % gallery.length;
    mainImage.src = gallery[currentIndex];
    mainImage.alt = product.name;
    thumbs.querySelectorAll('[data-thumb-index]').forEach((button, thumbIndex) => {
      button.classList.toggle('active', thumbIndex === currentIndex);
    });
  }

  thumbs.innerHTML = gallery.map((image, index) => `
    <button class="product-thumb ${index === 0 ? 'active' : ''}" type="button" data-thumb-index="${index}">
      <img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)} ${index + 1}">
    </button>
  `).join('');

  thumbs.querySelectorAll('[data-thumb-index]').forEach((button) => {
    button.addEventListener('click', () => renderMainImage(Number(button.dataset.thumbIndex)));
  });

  prevBtn.addEventListener('click', () => renderMainImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => renderMainImage(currentIndex + 1));
  renderMainImage(0);

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

addBtn.textContent = 'Pagar ahora';
stickyBtn.textContent = 'Pagar ahora';

addBtn.addEventListener('click', async () => {
  await buyNow(qtyInput.value);
});

stickyBtn.addEventListener('click', async () => {
  await buyNow(document.getElementById('stickyQtyValue').value);
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

  const page = document.body.dataset.page;
  if(page === 'home') await initHomePage();
  if(page === 'catalog') await initCatalogPage();
  if(page === 'product') await initProductPage();

  const products = await getProducts();
  renderSearchResults(products, '');
}

main();
