"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Counter} from "@/app/components/landing/reveal";
import {
  ChevronDown,
  MapPin,
  MousePointerClick,
  Sparkles,
  Wallet,
} from "lucide-react";

const HERO_CAR =
  'https://pusatpromomitsubishi.com/assets/img/product/passenger/pajero-sport/black.png'

const stats = [
  {value: 500, suffix: '+', label: 'Armada Siap Sewa'},
  {value: 12, suffix: 'K+', label: 'Pelanggan Puas'},
  {value: 4.9, suffix: '/5', label: 'Rating Layanan', decimals: 1},
  {value: 24, suffix: '/7', label: 'Support Online'},
]

export function Hero() {
  const [offset, setOffset] = useState(0)
  const [pointer, setPointer] = useState({x: 0, y: 0})

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="beranda"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPointer({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        })
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-24 size-96 animate-blob rounded-full bg-primary/20 blur-3xl"
        />
        <div
          className="absolute top-1/3 -right-32 size-[28rem] animate-blob-delayed rounded-full bg-ring/20 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="size-3.5 text-primary"/>
            Rental Mobil Terpercaya di Indonesia
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60"/>
              <span className="relative inline-flex size-2 rounded-full bg-primary"/>
            </span>
          </div>

          <h1 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Sewa Mobil{' '}
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-4 bg-clip-text text-transparent">
              Premium
            </span>{' '}
            Kapan Saja, Ke Mana Saja
          </h1>

          <p className="mt-4 max-w-lg text-sm text-muted-foreground sm:text-base md:mt-5 md:text-lg">
            Armada terawat, supir profesional, dan proses booking super cepat.
            Perjalanan nyaman dimulai dari sini — tanpa ribet, tanpa biaya tersembunyi.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group w-full shadow-xl shadow-primary/30 sm:w-auto">
              <a href="#armada">
                Mulai Sewa Sekarang
                <MousePointerClick className="size-4 transition-transform group-hover:rotate-12"/>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/login">Masuk Admin</Link>
            </Button>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-6 sm:max-w-none sm:grid-cols-4 sm:gap-x-8 lg:max-w-xl">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                  className="text-2xl font-bold text-primary md:text-3xl"
                />
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div
            className="absolute inset-0 -z-10 m-auto aspect-square w-[85%] animate-pulse-glow rounded-full bg-gradient-to-tr from-primary/40 via-chart-2/30 to-ring/30 blur-2xl"
          />
          <div
            className="absolute inset-0 -z-10 m-auto aspect-square w-[92%] animate-spin-slower rounded-full border-2 border-dashed border-primary/30"
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_CAR}
            alt="Mobil rental premium"
            className="relative z-10 w-full animate-float object-contain drop-shadow-2xl"
            style={{
              transform: `translate(${pointer.x * 18}px, ${pointer.y * 14 - offset * 0.06}px)`,
              transition: 'transform 150ms ease-out',
            }}
          />

          <div
            className="absolute top-4 left-0 z-20 animate-float-delayed rounded-xl border bg-background/90 p-2.5 shadow-xl backdrop-blur sm:rounded-2xl sm:p-3 md:-left-6 md:top-6"
            style={{transform: `translate(${pointer.x * -26}px, ${pointer.y * -18}px)`}}
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary sm:size-9 sm:rounded-xl">
                <Wallet className="size-4 sm:size-4.5"/>
              </span>
              <div>
                <p className="text-[10px] text-muted-foreground sm:text-[11px]">Mulai dari</p>
                <p className="text-xs font-bold sm:text-sm">Rp 250rb /hari</p>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-0 right-0 z-20 animate-float-slow rounded-xl border bg-background/90 p-2.5 shadow-xl backdrop-blur sm:rounded-2xl sm:p-3 md:-right-4 md:-bottom-2"
            style={{transform: `translate(${pointer.x * -20}px, ${pointer.y * -26}px)`}}
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary sm:size-9 sm:rounded-xl">
                <MapPin className="size-4 sm:size-4.5"/>
              </span>
              <div>
                <p className="text-[10px] text-muted-foreground sm:text-[11px]">Layanan Antar</p>
                <p className="text-xs font-bold sm:text-sm">Seluruh Kota</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 left-1/2 z-0 h-1.5 w-3/4 -translate-x-1/2 animate-road rounded-full opacity-70 [background-image:repeating-linear-gradient(90deg,color-mix(in_oklab,var(--primary)_60%,transparent)_0_24px,transparent_24px_48px)]"/>
        </div>
      </div>

      <a
        href="#layanan"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground md:flex"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 p-1.5">
          <span className="size-1.5 animate-scroll-dot rounded-full bg-primary"/>
        </span>
        <ChevronDown className="size-4 animate-bounce"/>
      </a>
    </section>
  )
}
