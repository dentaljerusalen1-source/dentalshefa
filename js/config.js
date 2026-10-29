/* =========================================================
   CONFIGURACIÓN EDITABLE
   Cambia aquí tus precios reales y tus fotos de antes/después.
   ========================================================= */
window.SITE_CONFIG = {
  whatsapp: "50376559627",

  // Costo estimado del boleto de avión ida y vuelta (lo paga el paciente), en USD.
  // Solo se usa en la calculadora si el visitante marca la casilla.
  travelEstimate: 450,

  // Video del escáner intraoral (sección "Nuestra clínica").
  // Opción 1: sube el video a la carpeta videos/ y escribe, por ejemplo: "videos/escaner-intraoral.mp4"
  // Opción 2: pega un enlace de YouTube, por ejemplo: "https://www.youtube.com/watch?v=XXXXXXXX"
  // Déjalo vacío ("") para mostrar el aviso "Video próximamente".
  scannerVideo: "videos/escaner-intraoral.mp4",
  scannerPoster: "videos/escaner-intraoral.jpg",  // imagen que se ve antes de darle play

  // Precios de referencia en USD (por unidad).
  //   us     = precio promedio en EE. UU.
  //   clinic = precio en la clínica
  treatments: [
    { id: "implant",  us: 4500,  clinic: 1250, max: 12, es: "Implante dental + corona", en: "Dental implant + crown" },
    { id: "allon4",   us: 24000, clinic: 7500, max: 2,  es: "All-on-4 (por arcada)",    en: "All-on-4 (per arch)" },
    { id: "veneer",   us: 1800,  clinic: 450,  max: 20, es: "Carilla de porcelana",     en: "Porcelain veneer" },
    { id: "crown",    us: 1500,  clinic: 400,  max: 20, es: "Corona de zirconio",       en: "Zirconia crown" },
    { id: "rootcanal",us: 1300,  clinic: 300,  max: 6,  es: "Endodoncia",               en: "Root canal" },
    { id: "whitening",us: 700,   clinic: 200,  max: 1,  es: "Blanqueamiento",           en: "Teeth whitening" }
  ],

  // Casos de antes y después.
  // Cuando tengas tus fotos, colócalas en /img y cambia las rutas,
  // por ejemplo: before: "img/caso1-antes.jpg", after: "img/caso1-despues.jpg"
  // y pon simulate: false.
  // simulate: true = usa la misma foto con un filtro para simular el "antes".
  beforeAfter: [
    {
      before: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&w=1200&q=80",
      after:  "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&w=1200&q=80",
      simulate: true
    },
    {
      before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      after:  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      simulate: true
    },
    {
      before: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80",
      after:  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80",
      simulate: true
    }
  ]
};
