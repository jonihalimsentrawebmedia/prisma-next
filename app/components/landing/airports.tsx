import {Reveal} from "@/app/components/landing/reveal";
import {Button} from "@/components/ui/button";
import {CarFront, Clock3, Cog, PlaneTakeoff, Users} from "lucide-react";

export type LandingAirPort = {
  id: number
  price: number
  name: string
  seat: string
  transmisi: string
  type: string
  image: string
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)

export function AirPorts({airPorts}: {airPorts: LandingAirPort[]}) {
  if (airPorts.length === 0) return null

  return (
    <section id="bandara" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">
            Layanan Bandara
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Antar Jemput Bandara Tanpa Ribet
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tiba tepat waktu dengan armada terbaik kami. Pilih mobil, kami yang
            urus sisanya — dari rumah sampai gate keberangkatan.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-10 flex max-w-md items-center gap-3" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-primary/70 shadow-[0_0_0_4px] shadow-primary/15"/>
            <span className="h-px flex-1 border-t-2 border-dashed border-primary/40"/>
            <span className="flex items-center gap-1 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Clock3 className="size-3.5 text-primary"/>
              Siap 24/7
            </span>
            <span className="h-px flex-1 border-t-2 border-dashed border-primary/40"/>
            <PlaneTakeoff className="size-5 text-primary"/>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {airPorts.map((airport, index) => (
            <Reveal key={airport.id} delay={(index % 3) * 100}>
              <div
                className="group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15"
              >
                <div
                  className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-background"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 60%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)',
                    }}
                  />
                  {airport.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={airport.image}
                      alt={airport.name}
                      className="relative z-10 h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <CarFront className="size-16 text-muted-foreground/40"/>
                  )}
                  <span
                    className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30"
                  >
                    <PlaneTakeoff className="size-3.5"/>
                    Airport
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="truncate text-base font-semibold">{airport.name}</h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="size-3.5 text-primary"/>
                      {airport.seat}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Cog className="size-3.5 text-primary"/>
                      {airport.transmisi}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-[11px] text-muted-foreground">Mulai dari</p>
                      <p className="text-sm font-bold text-primary">
                        {formatPrice(airport.price)}
                        <span className="text-xs font-normal text-muted-foreground"> /perjalanan</span>
                      </p>
                    </div>
                    <Button asChild size="sm" className="group/btn">
                      <a href="#kontak">
                        Booking
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
