import LogIn from "./components/LogIn";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const HomePage = async () => {
  const session = await getServerSession(authOptions);

  // if (session) redirect("/dashboard");
  return <LogIn />;
};

export default HomePage;
