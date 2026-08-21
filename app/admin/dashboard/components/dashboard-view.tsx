import {Card, CardContent} from "@/components/ui/card";
import {Car, Users, Wallet} from "lucide-react";

type DashboardViewProps = {
  user: {
    name: string
  }
}

const DashboardView = ({user}: DashboardViewProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Selamat datang kembali, <span className="font-medium text-foreground">{user.name}</span>!
          Ini adalah tampilan dashboard sementara.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-md bg-primary/10 p-3">
              <Users className="size-6 text-primary"/>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total User</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-md bg-primary/10 p-3">
              <Car className="size-6 text-primary"/>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Mobil</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-md bg-primary/10 p-3">
              <Wallet className="size-6 text-primary"/>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pendapatan</p>
              <p className="text-2xl font-bold">Rp 0</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardView
