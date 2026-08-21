"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CarFront, Menu, X} from "lucide-react";

const links = [
  {label: 'Beranda', href: '#beranda'},
  {label: 'Layanan', href: '#layanan'},
  {label: 'Armada', href: '#armada'},
  {label: 'Cara Sewa', href: '#cara-sewa'},
  {label: 'Testimoni', href: '#testimoni'},
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b bg-background/80 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link href="#" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <CarFront className="size-5"/>
          </span>
          <span className="text-base font-bold tracking-tight sm:text-lg">
            Prisma<span className="text-primary">Rental</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild className="shadow-lg shadow-primary/30">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5"/> : <Menu className="size-5"/>}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-2 w-full">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
