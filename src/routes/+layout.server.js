import { Auth } from "$lib/server/auth"
const shortUrlBaseUrl = "https://linktrim.hellkeeper.fr/"

export const load = async ({ cookies, url }) => {
    const { pathname } = url;

    const token = cookies.get("token") || false;
    if(token){
        let auth = await Auth(token);
        if(!auth.error) return { auth, pathname, shortUrlBaseUrl };
    }
    return { pathname, shortUrlBaseUrl }
};