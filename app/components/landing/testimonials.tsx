import {Reveal} from "@/app/components/landing/reveal";
import {Quote, Star} from "lucide-react";

export type LandingTestimonial = {
  id: number
  name: string
  pekerjaan: string
  description: string
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({length: 5}).map((_, index) => (
        <Star key={index} className="size-4 fill-primary text-primary"/>
      ))}
    </div>
  )
}

function Card({item}: {item: LandingTestimonial}) {
  return (
    <div
      className="w-72 shrink-0 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50 sm:w-80"
    >
      <div className="flex items-center justify-between">
        <Stars/>
        <Quote className="size-5 text-primary/30"/>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{item.description}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3 border-t pt-4">
        <span
          className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary"
        >
          {item.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.pekerjaan}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials({testimonials}: {testimonials: LandingTestimonial[]}) {
  if (testimonials.length === 0) return null

  const half = Math.ceil(testimonials.length / 2)
  const rowA = [...testimonials.slice(0, half), ...testimonials.slice(0, half)]
  const rowB = [...testimonials.slice(half), ...testimonials.slice(half)]

  return (
    <section id="testimoni" className="overflow-hidden bg-muted/40 py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl px-4 text-center md:px-6">
        <span className="text-sm font-semibold tracking-widest text-primary uppercase">
          Testimoni
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Kata Mereka yang Sudah Sewa
        </h2>
        <p className="mt-4 text-muted-foreground">
          Ribuan pelanggan telah mempercayakan perjalanannya kepada kami.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-5">
        <div
          className="flex w-max animate-marquee-reverse gap-5 pr-5 hover:[animation-play-state:paused]"
        >
          {rowA.map((item, index) => (
            <Card key={`a-${item.id}-${index}`} item={item}/>
          ))}
        </div>
        {rowB.length > 0 && (
          <div className="flex w-max animate-marquee gap-5 pr-5 hover:[animation-play-state:paused]">
            {rowB.map((item, index) => (
              <Card key={`b-${item.id}-${index}`} item={item}/>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
