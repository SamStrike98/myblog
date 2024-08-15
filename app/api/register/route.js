import { NextResponse } from "next/server"
import { createUser } from "@/queries/users"
import dbConnect from "@/lib/mongo"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"

export const POST = async (request) => {
    const { name, email, password } = await request.json()

    // Create a DB Connection
    await dbConnect()

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Form a Db payload
    const newUser = {
        name,
        email,
        password: hashedPassword,
        role: 'admin',
        createdAt: Date.now(),

    }

    // Update the DB
    try {
        console.log(newUser)
        await createUser(newUser)
    } catch (error) {
        console.log(error)
        return new NextResponse(error.message, {
            status: 500
        })
    }

    return new NextResponse("User has been created", {
        status: 201
    })
}