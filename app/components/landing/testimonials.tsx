import {Reveal} from "@/app/components/landing/reveal";
import {Quote, Star} from "lucide-react";

const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Traveler',
    text: 'Proses booking cepat banget, mobilnya bersih dan wangi. Supirnya juga ramah dan paham rute. Recommended!',
  },
  {
    name: 'Siti Rahma',
    role: 'Ibu Rumah Tangga',
    text: 'Sewa untuk arisan keluarga, mobil lega dan nyaman. Harganya masuk akal dengan pelayanan sebaik ini.',
  },
  {
    name: 'Andi Wijaya',
    role: 'Pengusaha',
    text: 'Langganan tiap ada tamu bisnis. Armada selalu prima dan tim support-nya responsif 24 jam. Mantap!',
  },
  {
    name: 'Dewi Lestari',
    role: 'Content Creator',
    text: 'Mobil datang tepat waktu bahkan lebih awal. Proses administrasinya gampang, cukup KTP dan SIM saja.',
  },
  {
    name: 'Rizky Pratama',
    role: 'Mahasiswa',
    text: 'Lepas kunci ke luar kota bareng teman-teman, harganya bersahabat buat kantong mahasiswa. Seru!',
  },
  {
    name: 'Maya Kusuma',
    role: 'Karyawan Swasta',
    text: 'Ada asuransi all-risk jadi tenang. Pernah kena batu di jalan tol, langsung ditanggung tanpa drama.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({length: 5}).map((_, index) => (
        <Star key={index} className="size-4 fill-primary text-primary"/>
      ))}
    </div>
  )
}

function Card({item}: {item: (typeof testimonials)[number]}) {
  return (
    <div
      className="w-72 shrink-0 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50 sm:w-80"
    >
      <div className="flex items-center justify-between">
        <Stars/>
        <Quote className="size-5 text-primary/30"/>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{item.text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3 border-t pt-4">
        <span
          className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary"
        >
          {item.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.role}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const rowA = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3)]
  const rowB = [...testimonials.slice(3), ...testimonials.slice(3)]

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
            <Card key={`a-${index}`} item={item}/>
          ))}
        </div>
        <div className="flex w-max animate-marquee gap-5 pr-5 hover:[animation-play-state:paused]">
          {rowB.map((item, index) => (
            <Card key={`b-${index}`} item={item}/>
          ))}
        </div>
      </div>
    </section>
  )
}
