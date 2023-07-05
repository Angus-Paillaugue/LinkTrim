import { Auth } from "$lib/server/auth"
import { usersRef } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AUTH_TOKEN_SECRET } from "$env/static/private"

export const load = async ({ cookies }) => {
    const token = cookies.get("token") || false;
    if(token){
        const auth = await Auth(token);
        if(!auth.error) throw redirect(301, "/dashboard");
    }
};

export const actions = {
    default: async ({ cookies, request }) => {
        try{
            const formData = Object.fromEntries(await request.formData());
            const { email, password } = formData;
    
            const userExists = await usersRef.findOne({ username:email });
            if(!email) return { success:false, formData:formData, message:"No account with this email!" };
            const compare = await bcrypt.compare(password, userExists.password);
            if(compare){
                cookies.set("token", generateAccessToken(email), { path:"/", sameSite:"strict" });
                throw redirect(301, "/dashboard");
            }
            return { success:false, formData:formData, message:"Incorrect password!" };
        }catch(err){
            console.log(err);
        }
    }
};

function generateAccessToken(email) {return jwt.sign(email, AUTH_TOKEN_SECRET);}