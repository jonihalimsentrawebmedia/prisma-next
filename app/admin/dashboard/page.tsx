import DashboardView from "@/app/admin/dashboard/components/dashboard-view";
import {getSessionUser} from "@/lib/session";

const DashboardPage = async () => {
  const user = await getSessionUser()

  return <DashboardView user={{name: user.name}}/>
}

export default DashboardPage
