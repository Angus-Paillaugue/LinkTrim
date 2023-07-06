import { linksRef } from "$lib/server/db"
import { error } from "@sveltejs/kit";
import { Auth } from "$lib/server/auth"

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const formData = await request.json();

    const useStatistics = formData.useStatistics;
    const urlToShorten = new URL(formData.urlToShorten);

    const id = UUID();

    if(useStatistics){
        const token = cookies.get("token") || false;
        if(!token) throw error(500, { error:"No token provided" });
        const auth = await Auth(token);
        // Check if redirectTo is already used. If so reuse the same link
        const exists = await linksRef.findOne({ redirectTo:urlToShorten.href, username:auth.username });
        if(exists) return new Response(JSON.stringify({ redirectTo:urlToShorten.href, id:exists.id }));

        await linksRef.insertOne({ redirectTo:urlToShorten.href, id:id, username:auth.username, date:new Date().getTime() });
    }else{
        // Check if redirectTo is already used. If so reuse the same link
        const exists = await linksRef.findOne({ redirectTo:urlToShorten.href });
        if(exists) return new Response(JSON.stringify({ redirectTo:urlToShorten.href, id:exists.id }));
    
        await linksRef.insertOne({ redirectTo:urlToShorten.href, id:id, date:new Date().getTime() });
    }
    
    return new Response(JSON.stringify({ redirectTo:urlToShorten.href, id:id }));
};

function UUID() {
    let length = 7;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}