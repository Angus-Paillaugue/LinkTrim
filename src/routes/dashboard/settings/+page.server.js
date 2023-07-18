import { Auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { usersRef } from "$lib/server/db"

export async function load({ cookies  }) {
    const token = cookies.get("token") || false;
    if(!token) throw redirect(301, "/log-in");

    const auth = await Auth(token);
    if(auth.error) throw redirect(301, "/log-in");
    
    return
};

export const actions = {
    save: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());

        const { email } = formData;
        const token = cookies.get("token") || false;
        if(!token) throw error(500, { error:"No token provided" });

        const auth = await Auth(token);
        if(auth.error) throw error(500, { error:auth.error });
        
        await usersRef.findOneAndUpdate({ username:auth.username }, { $set:{ email:email } }, { upsert: true });
        return { success:true };
    },
    deleteAccount: async ({ cookies }) => {
        const token = cookies.get("token") || false;
        if(!token) throw error(500, { error:"No token provided" });

        const auth = await Auth(token);
        if(auth.error) throw error(500, { error:auth.error });
        
        await usersRef.deleteOne({ username:auth.username });
        throw redirect(303, "/sign-in");
    },
};