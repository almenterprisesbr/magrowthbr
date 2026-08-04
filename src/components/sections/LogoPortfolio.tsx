import { Eyebrow, Heading, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

const logos = [
  {
    name: "Brasa Burger House",
    before: "/portfolio/logos/brasa-antes.png",
    after: "/portfolio/logos/brasa-depois.png",
  },
  {
    name: "Aura Beauty Cosmetics",
    before: "/portfolio/logos/aura-antes.png",
    after: "/portfolio/logos/aura-depois.png",
  },
  {
    name: "Bella Essence Boutique",
    before: "/portfolio/logos/bella-antes.png",
    after: "/portfolio/logos/bella-depois.png",
  },
];

export function LogoPortfolio() {
  return (
    <Section id="logo-portfolio" label="Identidade Visual">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <Eyebrow>Identidade Visual</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading>Design que posiciona sua marca</Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Deslize para ver a transformação. Elevamos a percepção de valor do seu
              negócio através de um design profissional e estratégico.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {logos.map((logo, index) => (
            <Reveal key={logo.name} delay={0.1 + index * 0.1}>
              <div className="flex flex-col gap-4">
                <BeforeAfterSlider
                  beforeImage={logo.before}
                  afterImage={logo.after}
                  aspectRatio="aspect-square"
                  className="ring-1 ring-border shadow-xl shadow-black/5"
                />
                <h3 className="text-center font-display text-lg font-medium text-foreground">
                  {logo.name}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
