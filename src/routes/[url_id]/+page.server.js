import { linksRef, statisticsRef } from "$lib/server/db"
import { error, redirect } from "@sveltejs/kit";

export const ssr = false;

export async function load({ params }) {
    const doc = await linksRef.findOne({ id:params.url_id });

    if(doc){
        if(doc.username){
            await statisticsRef.findOneAndUpdate({ id:doc.id }, { $addToSet:{ views:new Date().getTime() } }, { upsert:true });
        }
        throw redirect(308, doc.redirectTo);
    }else{
        throw error(404, { message:"Link not found!" });
    }
};