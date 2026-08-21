import {prisma} from '@/lib/prisma'
import {Navbar} from "@/app/components/landing/navbar";
import {Hero} from "@/app/components/landing/hero";
import {PerksMarquee} from "@/app/components/landing/perks-marquee";
import {Features} from "@/app/components/landing/features";
import {Fleet, type FleetCar} from "@/app/components/landing/fleet";
import {Steps} from "@/app/components/landing/steps";
import {Testimonials} from "@/app/components/landing/testimonials";
import {CtaSection, Footer} from "@/app/components/landing/cta-footer";

async function getFleetCars(): Promise<FleetCar[]> {
  try {
    const cars = await prisma.car.findMany({
      include: {rent: true},
      orderBy: {id: 'asc'},
    })

    return cars.map((car) => ({
      id: car.id,
      name: car.name,
      seat: car.seat,
      transmisi: car.transmisi,
      type: car.type,
      image: car.image,
      minPrice: car.rent.length > 0 ? Math.min(...car.rent.map((r) => r.price)) : null,
    }))
  } catch {
    return []
  }
}

export default async function Home() {
  const cars = await getFleetCars()

  return (
    <div className="min-h-dvh">
      <Navbar/>
      <main>
        <Hero/>
        <PerksMarquee/>
        <Features/>
        <Fleet cars={cars}/>
        <Steps/>
        <Testimonials/>
        <CtaSection/>
      </main>
      <Footer/>
    </div>
  )
}
