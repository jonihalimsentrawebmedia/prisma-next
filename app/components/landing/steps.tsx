import {Reveal} from "@/app/components/landing/reveal";
import {CalendarCheck2, CarFront, KeyRound} from "lucide-react";

const steps = [
  {
    icon: CarFront,
    step: '01',
    title: 'Pilih Mobil',
    description: 'Jelajahi armada kami dan temukan mobil yang paling cocok dengan kebutuhan perjalanan Anda.',
  },
  {
    icon: CalendarCheck2,
    step: '02',
    title: 'Booking & Bayar',
    description: 'Tentukan tanggal, selesaikan pembayaran dengan mudah, dan terima konfirmasi instan.',
  },
  {
    icon: KeyRound,
    step: '03',
    title: 'Berangkat!',
    description: 'Ambil mobil di lokasi terdekat atau minta diantar — selamat menikmati perjalanan!',
  },
]

export function Steps() {
  return (
    <section id="cara-sewa" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-widest text-primary uppercase">
          Cara Sewa
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Hanya 3 Langkah Mudah
        </h2>
        <p className="mt-4 text-muted-foreground">
          Proses penyewaan yang cepat dan tanpa ribet, dari pemilihan hingga perjalanan.
        </p>
      </Reveal>

      <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
        <div
          className="absolute top-9 right-[16%] left-[16%] hidden h-0.5 animate-road rounded-full md:block [background-image:repeating-linear-gradient(90deg,color-mix(in_oklab,var(--primary)_45%,transparent)_0_20px,transparent_20px_40px)]"
        />

        {steps.map((item, index) => (
          <Reveal key={item.step} delay={index * 150}>
            <div className="group relative flex flex-col items-center text-center">
              <div className="relative">
                <span
                  className="absolute inset-0 animate-pulse-glow rounded-2xl bg-primary/30 blur-lg"
                />
                <span
                  className="relative flex size-18 items-center justify-center rounded-2xl border bg-card text-primary shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <item.icon className="size-8"/>
                </span>
                <span
                  className="absolute -top-2.5 -right-2.5 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md"
                >
                  {index + 1}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
