import {prisma} from '@/lib/prisma'
import {Navbar} from "@/app/components/landing/navbar";
import {Hero} from "@/app/components/landing/hero";
import {PerksMarquee} from "@/app/components/landing/perks-marquee";
import {Features, type LandingFeature} from "@/app/components/landing/features";
import {Fleet, type FleetCar} from "@/app/components/landing/fleet";
import {Steps} from "@/app/components/landing/steps";
import {Testimonials, type LandingTestimonial} from "@/app/components/landing/testimonials";
import {AirPorts, type LandingAirPort} from "@/app/components/landing/airports";
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

async function getFeatures(): Promise<LandingFeature[]> {
  try {
    const features = await prisma.feature.findMany({
      orderBy: {id: 'asc'},
    })

    return features.map((feature) => ({
      id: feature.id,
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
    }))
  } catch {
    return []
  }
}

async function getTestimoni(): Promise<LandingTestimonial[]> {
  try {
    const testimoni = await prisma.testimoni.findMany({
      where: {is_publish: true},
      orderBy: {id: 'asc'},
    })

    return testimoni.map((item) => ({
      id: item.id,
      name: item.name,
      pekerjaan: item.pekerjaan,
      description: item.description,
    }))
  } catch {
    return []
  }
}

async function getAirPorts(): Promise<LandingAirPort[]> {
  try {
    const airPorts = await prisma.airPort.findMany({
      include: {car: true},
      orderBy: {id: 'asc'},
    })

    return airPorts.map((airport) => ({
      id: airport.id,
      price: airport.price,
      name: airport.car.name,
      seat: airport.car.seat,
      transmisi: airport.car.transmisi,
      type: airport.car.type,
      image: airport.car.image,
    }))
  } catch {
    return []
  }
}

export default async function Home() {
  const [cars, features, testimonials, airPorts] = await Promise.all([
    getFleetCars(),
    getFeatures(),
    getTestimoni(),
    getAirPorts(),
  ])

  return (
    <div className="min-h-dvh">
      <Navbar/>
      <main>
        <Hero/>
        <PerksMarquee/>
        <Features features={features}/>
        <Fleet cars={cars}/>
        <AirPorts airPorts={airPorts}/>
        <Steps/>
        <Testimonials testimonials={testimonials}/>
        <CtaSection/>
      </main>
      <Footer/>
    </div>
  )
}
