"use client"

import {useState} from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {
  Car,
  ChevronDown,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

type MenuChild = {
  label: string
  href: string
}

type MenuItem = {
  label: string
  href?: string
  icon: LucideIcon
  children?: MenuChild[]
}

const menus: MenuItem[] = [
  {label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard},
  {
    label: 'Penyewaan',
    icon: KeyRound,
    children: [
      {label: 'Rental', href: '/admin/tenancy/rent'},
    ],
  },
  {label: 'Mobil', href: '/admin/cars', icon: Car},
]

type SidemenuProps = {
  user: {
    name: string
    email: string
  }
}

const Sidemenu = ({user}: SidemenuProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<string[]>(() =>
    menus
      .filter((item) => item.children?.some((child) => pathname.startsWith(child.href)))
      .map((item) => item.label)
  )

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const handleLogout = () => {
    Cookies.remove('token')
    router.replace('/login')
  }

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
        <span className="text-lg font-semibold">Prisma Admin</span>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu className="size-5"/>
        </Button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white transition-transform duration-200 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <span className="text-lg font-semibold">Prisma Admin</span>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X className="size-5"/>
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menus.map((item) => {
            if (item.children) {
              const expanded = openGroups.includes(item.label)
              const groupActive = item.children.some((child) => pathname.startsWith(child.href))

              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.label)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      groupActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="size-4"/>
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={cn('size-4 transition-transform', expanded && 'rotate-180')}
                    />
                  </button>

                  {expanded && (
                    <div className="mt-1 space-y-1 pl-6">
                      {item.children.map((child) => {
                        const active = pathname.startsWith(child.href)

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              'block rounded-md px-3 py-2 text-sm transition-colors',
                              active
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            const active = pathname.startsWith(item.href as string)

            return (
              <Link
                key={item.label}
                href={item.href as string}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="size-4"/>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t px-3 py-4">
          <div className="px-3 pb-3">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="size-4"/>
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}

export default Sidemenu
