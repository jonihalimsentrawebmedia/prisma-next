import Sidemenu from "@/app/admin/components/sidemenu";
import {getSessionUser} from "@/lib/session";

const AdminLayout = async ({children}: {children: React.ReactNode}) => {
  const user = await getSessionUser()

  return (
    <div className="min-h-dvh bg-muted/40">
      <Sidemenu user={{name: user.name, email: user.email}}/>
      <main className="md:pl-64">
        <div className="mx-auto max-w-6xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
