/* ==========================================================================
   Smart Waste Classifier — single-file app
   Sections:
     1. Icons
     2. Data
     3. i18n
     4. Utils
     5. Store
     6. Classifier
     7. Theme
     8. Shell (navbar / footer)
     9. Scan page
    10. History page
    11. Router
    12. Bootstrap
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. ICONS
   -------------------------------------------------------------------------- */
const svg = (children, size = 16, strokeWidth = 2) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
  `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" ` +
  `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">` +
  children +
  `</svg>`;

const icons = {
  leaf: svg(
    `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`,
    18, 2.5,
  ),
  star: svg(
    `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    13, 2.5,
  ),
  flame: svg(
    `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>`,
    13, 2.5,
  ),
  moon: svg(`<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`, 17),
  sun: svg(
    `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`,
    17,
  ),
  languages: svg(
    `<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>`,
    13,
  ),
  scan: svg(
    `<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>`,
    15,
  ),
  history: svg(
    `<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>`,
    15,
  ),
  camera: svg(
    `<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>`,
    16,
  ),
  image: svg(
    `<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>`,
    16,
  ),
  x: svg(`<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`, 16),
  loader: svg(
    `<path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>`,
    30,
  ),
  check: svg(`<path d="M20 6 9 17l-5-5"/>`, 16, 3),
  info: svg(`<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`, 15),
  lightbulb: svg(
    `<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>`,
    15,
  ),
  trash: svg(
    `<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>`,
    15,
  ),
  trophy: svg(
    `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>`,
    16,
  ),
  refresh: svg(
    `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>`,
    16,
  ),
};

/* --------------------------------------------------------------------------
   2. DATA
   -------------------------------------------------------------------------- */
const CATEGORIES = ["plastic", "paper", "glass", "metal", "cardboard", "organic", "residual"];

const BIN_BY_CATEGORY = {
  plastic: "yellow",
  metal: "yellow",
  glass: "yellow",
  paper: "blue",
  cardboard: "blue",
  organic: "green",
  residual: "red",
};

const CATEGORY_EMOJI = {
  plastic: "🧴", paper: "📄", glass: "🍾", metal: "🥫",
  cardboard: "📦", organic: "🥬", residual: "🗑️",
};

const isWasteCategory = (v) => typeof v === "string" && CATEGORIES.includes(v);

/* --------------------------------------------------------------------------
   3. I18N
   -------------------------------------------------------------------------- */
const LOCALE_KEY = "swc-locale";
const SUPPORTED_LOCALES = ["en", "id"];

const en = {
  app: { name: "Smart Waste Classifier", tagline: "Snap a photo, get instant recycling guidance." },
  nav: { scan: "Scan", history: "History" },
  theme: { toggle: "Toggle dark mode" },
  language: { label: "Language" },
  upload: {
    title: "Add a photo of your waste",
    subtitle: "Capture it with your camera or pick an image from your gallery. We'll tell you exactly which bin it belongs in.",
    camera: "Live Camera", gallery: "Upload Photo", capture: "Capture", cancel: "Cancel",
    analyzing: "Analyzing your item…",
    analyzingHint: "Matching your photo against the waste categories.",
    error: "Something went wrong while analyzing your photo. Please try again.",
    cameraError: "We couldn't access your camera. Check browser permissions, or upload a photo instead.",
    tooLarge: "That image is too large. Please choose a file under 10 MB.",
  },
  result: {
    title: "Scan Result", confidence: "Confidence", binTitle: "Smart Bin",
    binHelp: "Correct bin: {bin}", tipsTitle: "Preparation Tips", factTitle: "Did you know?",
    pointsEarned: "+{points} points", streakLabel: "{count} day streak", scanAnother: "Scan another item",
  },
  bins: {
    yellow: "Yellow Bin — Recyclables", blue: "Blue Bin — Paper & Cardboard",
    green: "Green Bin — Organic", red: "Red Bin — Residual / Landfill",
  },
  categories: {
    plastic: "Plastic", paper: "Paper", glass: "Glass", metal: "Metal",
    cardboard: "Cardboard", organic: "Organic / Food Waste", residual: "Residual / Landfill",
  },
  tips: {
    plastic: [
      "Empty and rinse the container — leftover food contaminates the recycling batch.",
      "Remove caps and pumps; many facilities recycle them separately.",
      "Never bag recyclables in plastic bags — place them loose in the bin.",
      "Crush bottles and jugs to save space and cut transport emissions.",
    ],
    paper: [
      "Keep paper dry and clean — greasy or wet paper cannot be recycled.",
      "Remove staples, plastic windows and tape where possible.",
      "Flatten sheets and envelopes to save bin space.",
    ],
    glass: [
      "Rinse bottles and jars — food residue attracts pests and lowers quality.",
      "Separate lids and corks; metal lids belong with metals.",
      "Wrap broken glass safely — never mix it with recyclables.",
      "Heat-resistant glass (Pyrex) cannot go in container-glass recycling.",
    ],
    metal: [
      "Rinse cans and tins to remove food residue.",
      "Push sharp lids inside the can to protect collectors.",
      "Aerosol cans must be completely empty before recycling.",
      "Scrunch clean foil into a ball so it isn't lost in sorting.",
    ],
    cardboard: [
      "Flatten boxes to save bin space.",
      "Keep it dry — wet cardboard loses its fibres.",
      "Remove plastic tape, bubble wrap and polystyrene inserts.",
      "Greasy pizza boxes: compost the soiled half, recycle the clean half.",
    ],
    organic: [
      "Drain liquids and remove plastic packaging, stickers and rubber bands.",
      "Compost at home if you can — it avoids methane from landfill.",
      "Chop larger pieces to speed up decomposition.",
      "Keep meat, dairy and oily food out of home compost bins.",
    ],
    residual: [
      "This item cannot be recycled — place it in the residual bin.",
      "Check whether your local council runs a special drop-off for it.",
      "Consider switching to a reusable alternative next time.",
      "Never dump it in nature — it can take centuries to break down.",
    ],
  },
  facts: {
    plastic: "A single plastic bottle can take up to 450 years to break down in nature, and it never truly disappears — it only becomes microplastic.",
    paper: "Recycling one tonne of paper saves around 17 trees and 26,000 litres of water.",
    glass: "Glass is 100% recyclable and can be recycled endlessly without losing quality.",
    metal: "Recycling one aluminium can saves enough energy to power a TV for about three hours.",
    cardboard: "Recycling cardboard uses roughly 75% less energy than making it from virgin pulp.",
    organic: "Food waste rotting in landfill releases methane, a gas about 25× more potent than CO₂. Composting avoids that.",
    residual: "Landfill waste can linger for centuries and leach toxins into soil and groundwater.",
  },
  history: {
    title: "Scan History", subtitle: "Every item you've classified, newest first.",
    empty: "No scans yet. Classify your first item to start your streak!",
    emptyCta: "Start scanning", clear: "Clear history",
    confirm: "Delete your entire scan history? This cannot be undone.",
    totalScans: "Total scans", totalPoints: "Total points", currentStreak: "Current streak",
  },
  footer: { note: "Classifications are guidance — always check your local waste rules." },
  aiSettings: {
    title: "AI Settings",
    hint: "By default this demo uses a mock classifier. To use real AI, paste a Google Gemini API key below. It is stored only in your browser.",
    placeholder: "Paste Gemini API key", save: "Save", clear: "Clear",
    statusMock: "Mode: Mock classifier", statusLive: "Mode: Gemini connected",
    invalid: "Please enter a valid API key.",
  },
};

const id = {
  app: { name: "Klasifikasi Sampah Pintar", tagline: "Foto sampahmu, dapatkan panduan daur ulang instan." },
  nav: { scan: "Pindai", history: "Riwayat" },
  theme: { toggle: "Ubah mode gelap" },
  language: { label: "Bahasa" },
  upload: {
    title: "Tambahkan foto sampahmu",
    subtitle: "Ambil dengan kamera atau pilih gambar dari galeri. Kami akan memberi tahu tempat sampah yang tepat.",
    camera: "Kamera Langsung", gallery: "Unggah Foto", capture: "Ambil Gambar", cancel: "Batal",
    analyzing: "Menganalisis barangmu…",
    analyzingHint: "Mencocokkan fotomu dengan kategori sampah.",
    error: "Terjadi kesalahan saat menganalisis foto. Silakan coba lagi.",
    cameraError: "Kamera tidak dapat diakses. Periksa izin browser, atau unggah foto sebagai gantinya.",
    tooLarge: "Gambar terlalu besar. Pilih berkas di bawah 10 MB.",
  },
  result: {
    title: "Hasil Pindai", confidence: "Keyakinan", binTitle: "Tempat Sampah yang Tepat",
    binHelp: "Tempat sampah yang benar: {bin}", tipsTitle: "Tips Persiapan", factTitle: "Tahukah kamu?",
    pointsEarned: "+{points} poin", streakLabel: "Rentetan {count} hari", scanAnother: "Pindai barang lain",
  },
  bins: {
    yellow: "Kuning — Daur Ulang", blue: "Biru — Kertas & Kardus",
    green: "Hijau — Organik", red: "Merah — Residu / TPA",
  },
  categories: {
    plastic: "Plastik", paper: "Kertas", glass: "Kaca", metal: "Logam",
    cardboard: "Kardus", organic: "Organik / Sisa Makanan", residual: "Residu / TPA",
  },
  tips: {
    plastic: [
      "Kosongkan dan bilas wadah — sisa makanan mencemari batch daur ulang.",
      "Lepas tutup dan pompa; banyak fasilitas mendaur ulangnya terpisah.",
      "Jangan membungkus barang daur ulang dalam kantong plastik.",
      "Pipihkan botol untuk menghemat ruang dan menekan emisi transportasi.",
    ],
    paper: [
      "Jaga kertas tetap kering dan bersih — kertas berminyak tidak bisa didaur ulang.",
      "Lepas staples, jendela plastik, dan selotip bila memungkinkan.",
      "Pipihkan lembaran agar menghemat ruang.",
    ],
    glass: [
      "Bilas botol dan toples — sisa makanan mengundang hama dan menurunkan kualitas.",
      "Pisahkan tutup dan gabus; tutup logam masuk ke kategori logam.",
      "Bungkus kaca pecah dengan aman — jangan campur dengan daur ulang.",
      "Kaca tahan panas (Pyrex) tidak boleh dicampur dengan kaca wadah.",
    ],
    metal: [
      "Bilas kaleng dan wadah timah dari sisa makanan.",
      "Tekan tutup yang tajam ke dalam kaleng untuk melindungi petugas.",
      "Kaleng aerosol harus benar-benar kosong sebelum didaur ulang.",
      "Gumpalkan aluminium foil bersih menjadi bola agar tidak hilang saat penyortiran.",
    ],
    cardboard: [
      "Pipihkan kardus untuk menghemat ruang.",
      "Jaga tetap kering — kardus basah kehilangan seratnya.",
      "Lepas selotip plastik, bubble wrap, dan isian styrofoam.",
      "Kotak pizza berminyak: kompos bagian kotor, daur ulang bagian bersih.",
    ],
    organic: [
      "Tiriskan cairan dan lepas kemasan plastik, stiker, serta karet gelang.",
      "Kompos di rumah bila memungkinkan — menghindari metana dari TPA.",
      "Potong bagian besar agar proses pengomposan lebih cepat.",
      "Jangan masukkan daging, susu, atau makanan berminyak ke kompos rumah.",
    ],
    residual: [
      "Barang ini tidak dapat didaur ulang — buang ke tempat sampah residu.",
      "Periksa apakah pemerintah setempat punya titik drop-off khusus.",
      "Pertimbangkan beralih ke alternatif yang bisa dipakai ulang.",
      "Jangan membuangnya ke alam — butuh berabad-abad untuk terurai.",
    ],
  },
  facts: {
    plastic: "Satu botol plastik bisa membutuhkan hingga 450 tahun untuk terurai di alam, dan tidak pernah benar-benar hilang — hanya menjadi mikroplastik.",
    paper: "Mendaur ulang satu ton kertas menghemat sekitar 17 pohon dan 26.000 liter air.",
    glass: "Kaca 100% dapat didaur ulang dan bisa didaur ulang tanpa batas tanpa kehilangan kualitas.",
    metal: "Mendaur ulang satu kaleng aluminium menghemat energi cukup untuk menyalakan TV sekitar tiga jam.",
    cardboard: "Mendaur ulang kardus menggunakan energi sekitar 75% lebih sedikit daripada membuatnya dari pulp baru.",
    organic: "Sisa makanan yang membusuk di TPA melepaskan metana, gas sekitar 25× lebih kuat dari CO₂. Pengomposan menghindarinya.",
    residual: "Sampah TPA dapat bertahan berabad-abad dan mencemari tanah serta air tanah.",
  },
  history: {
    title: "Riwayat Pindai", subtitle: "Semua barang yang pernah kamu klasifikasikan, terbaru lebih dulu.",
    empty: "Belum ada pindaian. Klasifikasikan barang pertamamu untuk memulai rentetan!",
    emptyCta: "Mulai memindai", clear: "Hapus riwayat",
    confirm: "Hapus seluruh riwayat pindaian? Tindakan ini tidak bisa dibatalkan.",
    totalScans: "Total pindaian", totalPoints: "Total poin", currentStreak: "Rentetan saat ini",
  },
  footer: { note: "Klasifikasi bersifat panduan — selalu periksa aturan sampah setempat." },
  aiSettings: {
    title: "Pengaturan AI",
    hint: "Secara default demo ini memakai pengklasifikasi tiruan. Untuk memakai AI sungguhan, tempel kunci API Google Gemini di bawah. Kunci hanya disimpan di browser Anda.",
    placeholder: "Tempel kunci API Gemini", save: "Simpan", clear: "Hapus",
    statusMock: "Mode: Pengklasifikasi tiruan", statusLive: "Mode: Gemini tersambung",
    invalid: "Masukkan kunci API yang valid.",
  },
};

const DICTIONARIES = { en, id };
let currentLocale = "en";
const localeListeners = new Set();

function getValue(source, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return acc[key];
    return undefined;
  }, source);
}

const getLocale = () => currentLocale;

function setLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) return;
  currentLocale = locale;
  try { localStorage.setItem(LOCALE_KEY, locale); } catch {}
  document.documentElement.lang = locale;
  localeListeners.forEach((fn) => fn(locale));
}

const onLocaleChange = (fn) => {
  localeListeners.add(fn);
  return () => localeListeners.delete(fn);
};

function t(path, vars) {
  const dict = DICTIONARIES[currentLocale] || en;
  let value = getValue(dict, path);
  if (value === undefined) value = getValue(en, path);
  if (typeof value !== "string") return path;
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

function tList(path) {
  const dict = DICTIONARIES[currentLocale] || en;
  let value = getValue(dict, path);
  if (value === undefined) value = getValue(en, path);
  return Array.isArray(value) ? value.filter((v) => typeof v === "string") : [];
}

function initLocale() {
  let stored = null;
  try { stored = localStorage.getItem(LOCALE_KEY); } catch {}
  if (stored && SUPPORTED_LOCALES.includes(stored)) {
    currentLocale = stored;
  } else {
    const browser = (navigator.language || "en").slice(0, 2);
    currentLocale = SUPPORTED_LOCALES.includes(browser) ? browser : "en";
  }
  document.documentElement.lang = currentLocale;
}

/* --------------------------------------------------------------------------
   4. UTILS
   -------------------------------------------------------------------------- */
function formatDateTime(timestamp, locale = "en") {
  const tag = locale === "id" ? "id-ID" : "en-US";
  return new Intl.DateTimeFormat(tag, {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(timestamp));
}

async function createThumbnail(file, maxSize = 320) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();
    return canvas.toDataURL("image/jpeg", 0.7);
  } catch {
    return null;
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

/* --------------------------------------------------------------------------
   5. STORE
   -------------------------------------------------------------------------- */
const USER_KEY = "swc-user-v1";
const POINTS_PER_SCAN = 10;
const MAX_HISTORY = 40;
const EMPTY_USER = { points: 0, streak: 0, lastScanDate: null, history: [] };

let userState = { ...EMPTY_USER };
const userListeners = new Set();
let userLoaded = false;

function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function nextStreak(lastScanDate, current) {
  const today = dayKey();
  if (lastScanDate === today) return Math.max(current, 1);
  const yesterday = dayKey(new Date(Date.now() - 86400000));
  if (lastScanDate === yesterday) return current + 1;
  return 1;
}

function sanitizeUser(raw) {
  if (!raw || typeof raw !== "object") return { ...EMPTY_USER };
  const history = Array.isArray(raw.history)
    ? raw.history.filter(
        (r) => r && typeof r.id === "string" && isWasteCategory(r.category) &&
          typeof r.confidence === "number" && typeof r.timestamp === "number" &&
          (typeof r.thumbnail === "string" || r.thumbnail === null),
      ).slice(0, MAX_HISTORY)
    : [];
  return {
    points: typeof raw.points === "number" && raw.points >= 0 ? raw.points : 0,
    streak: typeof raw.streak === "number" && raw.streak >= 0 ? raw.streak : 0,
    lastScanDate: typeof raw.lastScanDate === "string" ? raw.lastScanDate : null,
    history,
  };
}

function loadUser() {
  if (userLoaded) return userState;
  try {
    const raw = localStorage.getItem(USER_KEY);
    userState = raw ? sanitizeUser(JSON.parse(raw)) : { ...EMPTY_USER };
  } catch {
    userState = { ...EMPTY_USER };
  }
  userLoaded = true;
  return userState;
}

const getUser = () => userState;

function persistUser() {
  try { localStorage.setItem(USER_KEY, JSON.stringify(userState)); } catch {}
}

function emitUser() {
  userListeners.forEach((fn) => fn(userState));
}

function onUserChange(fn) {
  userListeners.add(fn);
  return () => userListeners.delete(fn);
}

function addScan({ category, confidence, thumbnail }) {
  const streak = nextStreak(userState.lastScanDate, userState.streak);
  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    category, confidence, thumbnail, timestamp: Date.now(),
  };
  userState = {
    points: userState.points + POINTS_PER_SCAN,
    streak,
    lastScanDate: dayKey(),
    history: [record, ...userState.history].slice(0, MAX_HISTORY),
  };
  persistUser();
  emitUser();
  return { pointsEarned: POINTS_PER_SCAN, streak, totalPoints: userState.points };
}

function clearHistory() {
  userState = { ...userState, history: [] };
  persistUser();
  emitUser();
}

/* --------------------------------------------------------------------------
   6. CLASSIFIER
   -------------------------------------------------------------------------- */
const MAX_BYTES = 10 * 1024 * 1024;
const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_KEY = "swc-gemini-key";

function getGeminiKey() {
  try { return localStorage.getItem(GEMINI_KEY) || ""; } catch { return ""; }
}
function setGeminiKey(key) {
  try {
    if (key) localStorage.setItem(GEMINI_KEY, key);
    else localStorage.removeItem(GEMINI_KEY);
  } catch {}
}

async function hashFile(file) {
  try {
    const buf = await file.slice(0, Math.min(file.size, 65536)).arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buf);
    const view = new DataView(digest);
    return (view.getUint32(0, false) ^ file.size) >>> 0;
  } catch {
    let h = 0;
    const s = `${file.name}:${file.size}`;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return h >>> 0;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = String(reader.result || "");
      resolve(r.includes(",") ? r.split(",")[1] : r);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function geminiClassify(file, apiKey) {
  const base64 = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";
  const prompt = [
    "You are a waste-classification assistant.",
    "Classify the main object into exactly one of:",
    CATEGORIES.join(", ") + ".",
    'Respond with JSON only: {"category":"<one>","confidence":<integer 0-100>}',
  ].join(" ");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: base64 } }] }],
        generationConfig: { temperature: 0.1, responseMimeType: "application/json" },
      }),
    },
  );

  if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
  const json = await response.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const parsed = JSON.parse(text);
  if (!isWasteCategory(parsed.category)) throw new Error("Invalid category from Gemini");
  const confidence = Number.isFinite(parsed.confidence)
    ? Math.min(100, Math.max(0, Math.round(parsed.confidence))) : 85;
  return { category: parsed.category, confidence, source: "gemini" };
}

async function classifyImage(file) {
  if (!file || !file.type.startsWith("image/")) throw new Error("NOT_IMAGE");
  if (file.size > MAX_BYTES) throw new Error("TOO_LARGE");

  const apiKey = getGeminiKey();
  if (apiKey) {
    try { return await geminiClassify(file, apiKey); }
    catch (err) { console.warn("[classify] Gemini failed, falling back to mock:", err); }
  }

  await new Promise((r) => setTimeout(r, 650));
  const hash = await hashFile(file);
  return {
    category: CATEGORIES[hash % CATEGORIES.length],
    confidence: 82 + (hash % 17),
    source: "mock",
  };
}

/* --------------------------------------------------------------------------
   7. THEME
   -------------------------------------------------------------------------- */
const THEME_KEY = "swc-theme";
const getTheme = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");
function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try { localStorage.setItem(THEME_KEY, theme); } catch {}
}
const toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");

/* --------------------------------------------------------------------------
   8. SHELL (navbar + footer)
   -------------------------------------------------------------------------- */
let currentRoute = "scan";

function renderNavbar() {
  const header = document.getElementById("navbar");
  if (!header) return;

  const user = getUser();
  const locale = getLocale();
  document.title = t("app.name");

  header.className = "navbar";
  header.innerHTML = `
    <div class="navbar-inner">
      <a href="#/scan" class="brand">
        <span class="brand-icon">${icons.leaf}</span>
        <span class="brand-name">${t("app.name")}</span>
      </a>
      <div class="navbar-actions">
        <span class="pill pill-amber" title="${t("history.totalPoints")}">
          ${icons.star}<span data-role="points">${user.points}</span>
        </span>
        <span class="pill pill-orange" title="${t("history.currentStreak")}">
          ${icons.flame}<span data-role="streak">${user.streak}</span>
        </span>
        <button type="button" class="icon-btn" data-action="theme"
                aria-label="${t("theme.toggle")}" title="${t("theme.toggle")}">
          <span data-role="theme-icon">${getTheme() === "dark" ? icons.sun : icons.moon}</span>
        </button>
        <button type="button" class="icon-btn icon-btn-lang" data-action="lang"
                aria-label="${t("language.label")}" title="${t("language.label")}">
          ${icons.languages}<span>${locale.toUpperCase()}</span>
        </button>
      </div>
    </div>
    <nav class="navbar-tabs">
      <a href="#/scan" class="tab ${currentRoute === "scan" ? "tab-active" : ""}">
        ${icons.scan}<span>${t("nav.scan")}</span>
      </a>
      <a href="#/history" class="tab ${currentRoute === "history" ? "tab-active" : ""}">
        ${icons.history}<span>${t("nav.history")}</span>
      </a>
    </nav>
  `;

  header.querySelector('[data-action="theme"]').addEventListener("click", () => {
    toggleTheme();
    const slot = header.querySelector('[data-role="theme-icon"]');
    if (slot) slot.innerHTML = getTheme() === "dark" ? icons.sun : icons.moon;
  });

  header.querySelector('[data-action="lang"]').addEventListener("click", () => {
    setLocale(getLocale() === "en" ? "id" : "en");
  });
}

function updateNavbarStats() {
  const header = document.getElementById("navbar");
  if (!header) return;
  const p = header.querySelector('[data-role="points"]');
  const s = header.querySelector('[data-role="streak"]');
  if (p) p.textContent = String(getUser().points);
  if (s) s.textContent = String(getUser().streak);
}

function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;
  footer.className = "footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <span class="footer-brand">${icons.leaf}<span>${t("app.name")}</span></span>
      <p class="footer-note">${t("footer.note")}</p>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   9. SCAN PAGE
   -------------------------------------------------------------------------- */
const scanState = {
  stage: "idle", // idle | camera | analyzing | result
  preview: null,
  result: null,
  awarded: null,
  error: null,
  stream: null,
};

let scanRoot = null;
let scanVideo = null;

function stopCamera() {
  if (scanState.stream) {
    scanState.stream.getTracks().forEach((tk) => tk.stop());
    scanState.stream = null;
  }
}

function cleanupScanPage() {
  stopCamera();
  if (scanState.stage === "camera") scanState.stage = "idle";
}

function el(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function renderScanPage() {
  if (currentRoute !== "scan") return;
  scanRoot = document.getElementById("page-root");
  if (!scanRoot) return;
  scanRoot.innerHTML = "";

  if (scanState.stage === "result" && scanState.result) {
    scanRoot.appendChild(renderScanResult());
  } else if (scanState.stage === "analyzing") {
    scanRoot.appendChild(renderScanAnalyzing());
  } else if (scanState.stage === "camera") {
    scanRoot.appendChild(renderScanCamera());
  } else {
    scanRoot.appendChild(renderScanIdle());
  }
}

/* --- idle --- */
function renderScanIdle() {
  const wrapper = el(`
    <section class="scan-page fade-in">
      <div class="page-heading">
        <h1 class="page-title">${t("app.name")}</h1>
        <p class="page-subtitle">${t("app.tagline")}</p>
      </div>
      <div class="dropzone" data-role="dropzone">
        <div class="dropzone-icon">${icons.camera}</div>
        <div>
          <h2 class="dropzone-title">${t("upload.title")}</h2>
          <p class="dropzone-subtitle">${t("upload.subtitle")}</p>
        </div>
        <div class="dropzone-actions">
          <button type="button" class="btn btn-primary" data-action="camera">
            ${icons.camera} ${t("upload.camera")}
          </button>
          <button type="button" class="btn btn-secondary" data-action="gallery">
            ${icons.image} ${t("upload.gallery")}
          </button>
        </div>
        <input type="file" accept="image/*" hidden data-role="file-input" />
      </div>
      ${renderAiSettings()}
      <div data-role="error-slot"></div>
    </section>
  `);

  const dropzone = wrapper.querySelector('[data-role="dropzone"]');
  const input = wrapper.querySelector('[data-role="file-input"]');

  wrapper.querySelector('[data-action="camera"]').addEventListener("click", openCamera);
  wrapper.querySelector('[data-action="gallery"]').addEventListener("click", () => input.click());
  input.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) analyzeFile(file);
  });

  ["dragover", "dragenter"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("dropzone-active");
    }),
  );
  ["dragleave", "dragend"].forEach((evt) =>
    dropzone.addEventListener(evt, () => dropzone.classList.remove("dropzone-active")),
  );
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dropzone-active");
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/")) analyzeFile(file);
  });

  if (scanState.error) {
    wrapper
      .querySelector('[data-role="error-slot"]')
      .appendChild(el(`<div class="alert alert-error" role="alert">${scanState.error}</div>`));
  }

  const aiDetails = wrapper.querySelector(".ai-settings");
  if (aiDetails) {
    const keyInput = aiDetails.querySelector('[data-role="ai-key"]');
    const statusEl = aiDetails.querySelector('[data-role="ai-status"]');
    aiDetails.querySelector('[data-action="ai-save"]').addEventListener("click", () => {
      const v = keyInput.value.trim();
      if (!v) { statusEl.textContent = t("aiSettings.invalid"); return; }
      setGeminiKey(v);
      keyInput.value = "";
      statusEl.textContent = t("aiSettings.statusLive");
    });
    aiDetails.querySelector('[data-action="ai-clear"]').addEventListener("click", () => {
      setGeminiKey("");
      keyInput.value = "";
      statusEl.textContent = t("aiSettings.statusMock");
    });
  }

  return wrapper;
}

function renderAiSettings() {
  const status = getGeminiKey() ? t("aiSettings.statusLive") : t("aiSettings.statusMock");
  return `
    <details class="ai-settings">
      <summary>
        <span>${t("aiSettings.title")}</span>
        <span class="ai-settings-status" data-role="ai-status">${status}</span>
      </summary>
      <div class="ai-settings-body">
        <p>${t("aiSettings.hint")}</p>
        <input type="password" data-role="ai-key"
               placeholder="${t("aiSettings.placeholder")}"
               autocomplete="off" spellcheck="false" />
        <div class="ai-settings-actions">
          <button type="button" class="btn btn-primary btn-sm" data-action="ai-save">${t("aiSettings.save")}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-action="ai-clear">${t("aiSettings.clear")}</button>
        </div>
      </div>
    </details>
  `;
}

/* --- camera --- */
async function openCamera() {
  if (currentRoute !== "scan") return;
  scanState.error = null;

  if (!navigator.mediaDevices?.getUserMedia) {
    scanState.error = t("upload.cameraError");
    renderScanPage();
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    // Guard against navigation while permission was pending.
    if (currentRoute !== "scan") {
      stream.getTracks().forEach((tk) => tk.stop());
      return;
    }
    scanState.stream = stream;
    scanState.stage = "camera";
    renderScanPage();
  } catch {
    scanState.error = t("upload.cameraError");
    scanState.stage = "idle";
    renderScanPage();
  }
}

function renderScanCamera() {
  const wrapper = el(`
    <section class="camera-view fade-in">
      <div class="camera-frame">
        <video playsinline autoplay muted></video>
      </div>
      <div class="camera-actions">
        <button type="button" class="btn btn-primary" data-action="capture">
          ${icons.camera} ${t("upload.capture")}
        </button>
        <button type="button" class="btn btn-ghost" data-action="cancel">
          ${icons.x} ${t("upload.cancel")}
        </button>
      </div>
    </section>
  `);

  scanVideo = wrapper.querySelector("video");
  if (scanState.stream) {
    scanVideo.srcObject = scanState.stream;
    scanVideo.play().catch(() => {});
  }

  wrapper.querySelector('[data-action="capture"]').addEventListener("click", capturePhoto);
  wrapper.querySelector('[data-action="cancel"]').addEventListener("click", () => {
    stopCamera();
    scanState.stage = "idle";
    renderScanPage();
  });

  return wrapper;
}

function capturePhoto() {
  if (!scanVideo) return;
  const width = scanVideo.videoWidth || 720;
  const height = scanVideo.videoHeight || 960;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(scanVideo, 0, 0, width, height);
  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const file = new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" });
      stopCamera();
      analyzeFile(file);
    },
    "image/jpeg",
    0.9,
  );
}

/* --- analyzing + analyze --- */
async function analyzeFile(file) {
  if (file.size > MAX_BYTES) {
    scanState.error = t("upload.tooLarge");
    scanState.stage = "idle";
    renderScanPage();
    return;
  }

  if (scanState.preview) {
    try { URL.revokeObjectURL(scanState.preview); } catch {}
  }
  scanState.preview = URL.createObjectURL(file);
  scanState.result = null;
  scanState.awarded = null;
  scanState.error = null;
  scanState.stage = "analyzing";
  renderScanPage();

  try {
    const [thumbnail, result] = await Promise.all([
      createThumbnail(file),
      classifyImage(file),
    ]);
    const outcome = addScan({
      category: result.category,
      confidence: result.confidence,
      thumbnail,
    });
    scanState.result = result;
    scanState.awarded = { points: outcome.pointsEarned, streak: outcome.streak };
    scanState.stage = "result";
    renderScanPage();
  } catch (err) {
    console.error(err);
    scanState.error = err?.message === "TOO_LARGE" ? t("upload.tooLarge") : t("upload.error");
    scanState.stage = "idle";
    renderScanPage();
  }
}

function renderScanAnalyzing() {
  return el(`
    <section class="analyzing-view fade-in">
      <div class="analyzing-preview">
        ${scanState.preview ? `<img src="${scanState.preview}" alt="" />` : ""}
        <div class="analyzing-overlay"><span class="spin">${icons.loader}</span></div>
      </div>
      <div class="analyzing-text">
        <strong>${t("upload.analyzing")}</strong>
        <span>${t("upload.analyzingHint")}</span>
      </div>
    </section>
  `);
}

/* --- result --- */
function renderScanResult() {
  const { category, confidence } = scanState.result;
  const bin = BIN_BY_CATEGORY[category];
  const tips = tList(`tips.${category}`);
  const fact = t(`facts.${category}`);
  const binName = t(`bins.${bin}`);
  const emoji = CATEGORY_EMOJI[category];

  const wrapper = el(`
    <section class="result-view fade-in">
      <div class="result-hero">
        <div class="result-image">
          ${scanState.preview
            ? `<img src="${scanState.preview}" alt="" />`
            : `<div class="result-image-placeholder">${emoji}</div>`}
          <span class="result-image-label">${t("result.title")}</span>
        </div>
        <div class="result-header">
          <div class="result-title-row">
            <div class="result-title">
              <span class="emoji">${emoji}</span>
              <div>
                <h2>${t(`categories.${category}`)}</h2>
                <p class="result-confidence">${t("result.confidence")}: <strong>${confidence}%</strong></p>
              </div>
            </div>
            ${scanState.awarded
              ? `<span class="pill pill-success">${icons.trophy} ${t("result.pointsEarned", { points: scanState.awarded.points })}</span>`
              : ""}
          </div>
          <div>
            <div class="confidence-bar"><div class="confidence-bar-fill" style="width:${confidence}%"></div></div>
            ${scanState.awarded
              ? `<p class="result-streak-note">${t("result.streakLabel", { count: scanState.awarded.streak })}</p>`
              : ""}
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-section-title">${icons.trash} ${t("result.binTitle")}</h3>
        <div class="bin-card bin-${bin}">
          <span class="bin-card-icon">${icons.trash}</span>
          <div>
            <strong>${binName}</strong>
            <p>${t("result.binHelp", { bin: binName })}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-section-title">${icons.info} ${t("result.tipsTitle")}</h3>
        <ul class="tips-list">
          ${tips.map((tip) => `<li>${icons.check}<span>${tip}</span></li>`).join("")}
        </ul>
      </div>

      <div class="fact-box">
        <h3>${icons.lightbulb} ${t("result.factTitle")}</h3>
        <p>${fact}</p>
      </div>

      <button type="button" class="btn btn-secondary" data-action="reset" style="width:100%">
        ${icons.refresh} ${t("result.scanAnother")}
      </button>
    </section>
  `);

  wrapper.querySelector('[data-action="reset"]').addEventListener("click", () => {
    if (scanState.preview) {
      try { URL.revokeObjectURL(scanState.preview); } catch {}
    }
    scanState.preview = null;
    scanState.result = null;
    scanState.awarded = null;
    scanState.stage = "idle";
    renderScanPage();
  });

  return wrapper;
}

/* --------------------------------------------------------------------------
   10. HISTORY PAGE
   -------------------------------------------------------------------------- */
function renderHistoryPage() {
  if (currentRoute !== "history") return;
  const root = document.getElementById("page-root");
  if (!root) return;

  const user = getUser();
  const locale = getLocale();

  root.innerHTML = `
    <section class="history-page fade-in">
      <header class="history-heading">
        <div>
          <h1>${t("history.title")}</h1>
          <p>${t("history.subtitle")}</p>
        </div>
        ${user.history.length > 0
          ? `<button type="button" class="btn btn-ghost btn-sm" data-action="clear">
               ${icons.trash} ${t("history.clear")}
             </button>`
          : ""}
      </header>

      <div class="history-summary">
        <div class="card card-tight">
          ${icons.trophy}<strong>${user.history.length}</strong><span>${t("history.totalScans")}</span>
        </div>
        <div class="card card-tight">
          ${icons.star}<strong>${user.points}</strong><span>${t("history.totalPoints")}</span>
        </div>
        <div class="card card-tight">
          ${icons.flame}<strong>${user.streak}</strong><span>${t("history.currentStreak")}</span>
        </div>
      </div>

      ${user.history.length === 0
        ? `<div class="history-empty">
             <div class="history-empty-icon">${icons.trophy}</div>
             <p>${t("history.empty")}</p>
             <a href="#/scan" class="btn btn-primary btn-sm">${t("history.emptyCta")}</a>
           </div>`
        : `<ul class="history-list">
             ${user.history.map((item) => renderHistoryItem(item, locale)).join("")}
           </ul>`}
    </section>
  `;

  const clearBtn = root.querySelector('[data-action="clear"]');
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (window.confirm(t("history.confirm"))) clearHistory();
    });
  }
}

function renderHistoryItem(item, locale) {
  const bin = BIN_BY_CATEGORY[item.category];
  const binShort = t(`bins.${bin}`).split("—")[0].trim();
  const time = formatDateTime(item.timestamp, locale);
  const emoji = CATEGORY_EMOJI[item.category];
  const categoryLabel = escapeHtml(t(`categories.${item.category}`));

  return `
    <li class="history-item">
      <div class="history-thumb">
        ${item.thumbnail ? `<img src="${item.thumbnail}" alt="" />` : emoji}
      </div>
      <div class="history-body">
        <strong>${categoryLabel}</strong>
        <time datetime="${new Date(item.timestamp).toISOString()}">${time}</time>
      </div>
      <div class="history-meta">
        <span class="history-confidence">${item.confidence}%</span>
        <span class="pill pill-muted">
          <span class="dot dot-${bin}"></span>${escapeHtml(binShort)}
        </span>
      </div>
    </li>
  `;
}

/* --------------------------------------------------------------------------
   11. ROUTER
   -------------------------------------------------------------------------- */
function parseRoute() {
  const hash = location.hash.replace(/^#\/?/, "").toLowerCase();
  return hash === "history" ? "history" : "scan";
}

function route() {
  const next = parseRoute();
  if (next !== currentRoute) {
    if (currentRoute === "scan") cleanupScanPage();
    currentRoute = next;
  }

  renderNavbar();

  if (currentRoute === "scan") renderScanPage();
  else renderHistoryPage();
}

/* --------------------------------------------------------------------------
   12. BOOTSTRAP
   -------------------------------------------------------------------------- */
function boot() {
  initLocale();
  loadUser();

  renderNavbar();
  renderFooter();

  window.addEventListener("hashchange", route);

  onLocaleChange(() => {
    renderNavbar();
    renderFooter();
    if (currentRoute === "scan") renderScanPage();
    else renderHistoryPage();
  });

  onUserChange(() => {
    updateNavbarStats();
    if (currentRoute === "history") renderHistoryPage();
  });

  route();
}

boot();
