import {
  BadgePercent,
  Fuel,
  Headset,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

const perks = [
  {icon: ShieldCheck, label: 'Asuransi All-Risk'},
  {icon: UserRoundCheck, label: 'Supir Berpengalaman'},
  {icon: BadgePercent, label: 'Harga Bisa Nego'},
  {icon: Fuel, label: 'BBM Terjangkau'},
  {icon: Headset, label: 'Support 24/7'},
  {icon: Sparkles, label: 'Mobil Selalu Terawat'},
]

function MarqueeGroup({hidden}: {hidden?: boolean}) {
  return (
    <div
      className="flex items-center gap-5 pr-5 md:gap-10 md:pr-10"
      aria-hidden={hidden}
    >
      {perks.map((perk) => (
        <div
          key={perk.label}
          className="flex items-center gap-2 rounded-full border bg-background/70 py-1.5 pr-4 pl-1.5 shadow-sm backdrop-blur md:gap-2.5"
        >
          <span
            className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary md:size-8"
          >
            <perk.icon className="size-3.5 md:size-4"/>
          </span>
          <span className="text-xs font-medium whitespace-nowrap sm:text-sm">
            {perk.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function PerksMarquee() {
  return (
    <div className="relative overflow-hidden border-y bg-muted/50 py-3 md:py-4">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent md:w-24"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent md:w-24"
      />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <MarqueeGroup/>
        <MarqueeGroup hidden/>
      </div>
    </div>
  )
}
