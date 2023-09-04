import TableData from "../components/TableData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");
  return <TableData />;
};

export default DashboardPage;
