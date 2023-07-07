import { Auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { linksRef, statisticsRef } from "$lib/server/db"

export async function load({ cookies, params }) {
    const token = cookies.get("token") || false;
    if(!token) throw redirect(301, "/log-in");

    const auth = await Auth(token);
    if(auth.error) throw redirect(301, "/log-in");

    const link = await linksRef.findOne({ id:params.link_id })
    if(!link)throw redirect(301, "/log-in");
    if(link.username !== auth.username) throw redirect(301, "/dashboard");

    const statistics = await statisticsRef.findOne({ id:params.link_id });

    if(statistics) return { link:(({ _id, ...o }) => o)(link), statistics:(({ _id, ...o }) => o)(statistics) }

    return { link:(({ _id, ...o }) => o)(link), statistics:statistics }
};