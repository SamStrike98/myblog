import User from "@/models/user-model";
import mongoose from "mongoose";


export async function createUser(user) {

    try {
        await User.create(user)
    } catch (error) {
        throw new Error(error)
    }
}