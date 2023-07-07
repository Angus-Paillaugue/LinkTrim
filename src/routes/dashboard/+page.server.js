import { Auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies  }) {
    const token = cookies.get("token") || false;
    if(!token) throw redirect(301, "/log-in");

    const auth = await Auth(token);
    if(auth.error) throw redirect(301, "/log-in");
    
    return
};