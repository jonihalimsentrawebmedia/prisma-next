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

export function PerksMarquee() {
  const items = [...perks, ...perks]

  return (
    <div className="relative border-y bg-muted/50 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"/>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"/>

      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {items.map((perk, index) => (
          <div key={`${perk.label}-${index}`} className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <perk.icon className="size-4"/>
            </span>
            <span className="text-sm font-medium whitespace-nowrap">{perk.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
