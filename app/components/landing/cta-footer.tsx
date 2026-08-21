import Link from "next/link";
import {Reveal} from "@/app/components/landing/reveal";
import {Button} from "@/components/ui/button";
import {ArrowRight, PhoneCall} from "lucide-react";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-16 text-center text-background md:px-12"
        >
          <div
            className="absolute -top-24 -left-24 size-72 animate-blob rounded-full bg-primary/30 blur-3xl"
          />
          <div
            className="absolute -right-24 -bottom-24 size-72 animate-blob-delayed rounded-full bg-ring/25 blur-3xl"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
              Siap Berangkat? Mobil Impian Anda Menunggu
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-background/70 md:text-base">
              Booking sekarang dan dapatkan penawaran terbaik. Tim kami siap
              membantu perencanaan perjalanan Anda kapan saja.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="group shadow-xl shadow-primary/25">
                <a href="#armada">
                  Booking Sekarang
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/>
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <a href="tel:+6281234567890">
                  <PhoneCall className="size-4"/>
                  +62 812-3456-7890
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="kontak" className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="text-lg font-bold tracking-tight">
            Prisma<span className="text-primary">Rental</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Mitra perjalanan terpercaya Anda. Armada premium, harga transparan,
            layanan sepenuh hati.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigasi</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#beranda" className="transition-colors hover:text-primary">Beranda</a></li>
            <li><a href="#layanan" className="transition-colors hover:text-primary">Layanan</a></li>
            <li><a href="#armada" className="transition-colors hover:text-primary">Armada</a></li>
            <li><Link href="/login" className="transition-colors hover:text-primary">Login Admin</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Kontak</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Jl. Merdeka No. 123, Jakarta</li>
            <li>+62 812-3456-7890</li>
            <li>halo@prismarental.id</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} PrismaRental. Semua hak dilindungi.
      </div>
    </footer>
  )
}
