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
  scannerVideo: "videos/escaner-intraoral-future-bass.mp4",
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

  // Casos de antes y después (fotos en images/casos/).
  //   name = nombre de la pestaña, desc = descripción corta, full = imagen completa del caso.
  // Cuando tengas tus fotos, colócalas en /img y cambia las rutas,
  // por ejemplo: before: "img/caso1-antes.jpg", after: "img/caso1-despues.jpg"
  // y pon simulate: false.
  // simulate: true = usa la misma foto con un filtro para simular el "antes".
  beforeAfter: [
    { name: "Coronas estéticas", desc: "Cambio de coronas y pernos antiguos por coronas nuevas de aspecto natural en el sector anterior.",
      before: "images/casos/caso1-antes.jpg", after: "images/casos/caso1-despues.jpg", full: "images/casos/caso1-completo.jpg", simulate: false },
    { name: "Rehabilitación superior", desc: "Rehabilitación de la arcada superior con coronas sobre pilares, devolviendo función y estética.",
      before: "images/casos/caso2-antes.jpg", after: "images/casos/caso2-despues.jpg", full: "images/casos/caso2-completo.jpg", simulate: false },
    { name: "Diseño de sonrisa", desc: "Transformación completa de la sonrisa con coronas diseñadas a la medida del paciente.",
      before: "images/casos/caso3-antes.jpg", after: "images/casos/caso3-despues.jpg", full: "images/casos/caso3-completo.jpg", simulate: false },
    { name: "Corona unitaria", desc: "Corona individual en un diente anterior, integrada en color y forma con los dientes vecinos.",
      before: "images/casos/caso4-antes.jpg", after: "images/casos/caso4-despues.jpg", full: "images/casos/caso4-completo.jpg", simulate: false },
    { name: "Puente inferior", desc: "Puente fijo en el sector anterior inferior para reemplazar las piezas perdidas.",
      before: "images/casos/caso5-antes.jpg", after: "images/casos/caso5-despues.jpg", full: "images/casos/caso5-completo.jpg", simulate: false }
  ]
};
