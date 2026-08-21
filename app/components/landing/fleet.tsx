"use client"

import {Reveal} from "@/app/components/landing/reveal";
import {Button} from "@/components/ui/button";
import {CarFront, Cog, Users} from "lucide-react";

export type FleetCar = {
  id: number
  name: string
  seat: string
  transmisi: string
  type: string
  image: string
  minPrice: number | null
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)

export function Fleet({cars}: {cars: FleetCar[]}) {
  const list = cars.length > 0 ? cars.slice(0, 6) : []

  return (
    <section id="armada" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              Armada Kami
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Pilih Mobil Impian Anda
            </h2>
            <p className="mt-4 text-muted-foreground">
              Dari city car yang lincah hingga SUV keluarga yang lega — semua
              siap menemani perjalanan Anda.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="group">
            <a href="#kontak">
              Lihat Semua Armada
            </a>
          </Button>
        </Reveal>

        {list.length === 0 ? (
          <Reveal delay={150}>
            <div className="mt-14 flex flex-col items-center justify-center rounded-3xl border border-dashed bg-card py-20 text-center">
              <CarFront className="size-12 text-muted-foreground/50"/>
              <p className="mt-4 font-medium">Armada belum tersedia</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Silakan hubungi kami untuk info ketersediaan mobil.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((car, index) => (
              <Reveal key={car.id} delay={(index % 3) * 100}>
                <div
                  className="group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15"
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
                    {car.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={car.image}
                        alt={car.name}
                        className="relative z-10 h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <CarFront className="size-16 text-muted-foreground/40"/>
                    )}
                    <span
                      className="absolute top-3 left-3 z-20 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30"
                    >
                      {car.type}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="truncate text-base font-semibold">{car.name}</h3>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Users className="size-3.5 text-primary"/>
                        {car.seat}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Cog className="size-3.5 text-primary"/>
                        {car.transmisi}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      {car.minPrice !== null ? (
                        <div>
                          <p className="text-[11px] text-muted-foreground">Mulai dari</p>
                          <p className="text-sm font-bold text-primary">
                            {formatPrice(car.minPrice)}
                            <span className="text-xs font-normal text-muted-foreground"> /hari</span>
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Hubungi kami</p>
                      )}
                      <Button size="sm" className="group/btn">
                        Sewa
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
