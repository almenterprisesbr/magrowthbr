export const site = {
  name: "MA Growth",
  founder: "Matheus Almeida Vieira",
  tagline: "Marketing digital pontual, sem contrato engessado",
  whatsappNumber: "5513988631429",
  whatsappDisplay: "(13) 98863-1429",
  whatsappMessage: "Oi Matheus! Quero montar um projeto pontual para minha empresa.",
  instagram: "https://instagram.com/ma.growthbr",
  instagramHandle: "@ma.growthbr",
  email: "almenterprisesbr@gmail.com",
  location: "Atendimento online · Brasil",
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const whatsappWith = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
