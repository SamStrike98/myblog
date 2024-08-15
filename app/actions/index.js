'use server'

import { signIn } from "@/auth";

export async function doCredentialLogin(formData) {
    try {
        console.log(formData.get('email'), formData.get("password"))
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        });

        return response;

    } catch (error) {

        console.log(error)
        // throw new Error(error)
    }
}