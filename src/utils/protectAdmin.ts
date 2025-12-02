import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenBerPage } from "./verifyToken";

export async function protectAdmin() {
  const token = (await cookies()).get("jwtToken")?.value;

  if (!token) {
    redirect("/"); 
  }

  const payload =  verifyTokenBerPage(token);

  if (!payload?.isAdmin) {
    redirect("/");
  }

}
