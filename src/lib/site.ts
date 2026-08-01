export const site = {
  name: "MA Growth",
  tagline: "Tecnologia e crescimento previsível",
  whatsappNumber: "5511987654321",
  whatsappMessage:
    "Olá! Vim pelo site da MA Growth e quero entender como acelerar o crescimento da minha empresa.",
  instagram: "https://instagram.com/magrowth",
  email: "contato@magrowth.com.br",
  location: "São Paulo · Brasil · Atendimento remoto",
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;
