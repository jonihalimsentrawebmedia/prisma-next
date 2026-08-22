import {Reveal} from "@/app/components/landing/reveal";
import {
  BadgePercent,
  FileCheck2,
  Headset,
  MapPinned,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type LandingFeature = {
  id: number
  icon: string
  title: string
  description: string
}

export const ICON_COMPONENTS: Record<string, LucideIcon> = {
  ShieldCheck,
  BadgePercent,
  Sparkles,
  MapPinned,
  Headset,
  FileCheck2,
}

export function Features({features}: {features: LandingFeature[]}) {
  if (features.length === 0) return null

  return (
    <section id="layanan" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-widest text-primary uppercase">
          Kenapa Pilih Kami
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Layanan Terbaik untuk Perjalanan Nyaman
        </h2>
        <p className="mt-4 text-muted-foreground">
          Kami mengutamakan kenyamanan dan keamanan Anda dengan standar layanan
          yang tidak pernah kompromi.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const IconComponent = ICON_COMPONENTS[feature.icon] ?? Sparkles

          return (
            <Reveal key={feature.id} delay={index * 90}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                <div
                  className="absolute -top-10 -right-10 size-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  className="relative flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <IconComponent className="size-5.5"/>
                </span>
                <h3 className="relative mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
