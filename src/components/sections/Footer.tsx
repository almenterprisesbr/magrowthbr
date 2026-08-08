import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";

import { site, whatsappUrl } from "@/lib/site";

const links = [
  { href: site.instagram, label: "Instagram", icon: Instagram, external: true },
  { href: whatsappUrl, label: "WhatsApp", icon: MessageCircle, external: true },
  { href: `mailto:${site.email}`, label: site.email, icon: Mail, external: false },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <a href="#topo" className="flex items-center gap-2.5 text-sm font-semibold">
            <img
              src="/logo-icon.webp"
              alt="MA Growth"
              className="size-9 rounded-full object-contain"
            />
            MA <span className="text-brand-gradient">Growth</span>
          </a>

          <ul className="flex flex-wrap items-center gap-6">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-brand"
                >
                  <l.icon
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <p className="inline-flex items-center gap-2">
            <MapPin aria-hidden className="size-4 text-brand" />
            {site.location}
          </p>
          <p>© {new Date().getFullYear()} MA Growth. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
