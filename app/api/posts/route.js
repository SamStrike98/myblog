import { NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";


export const POST = async (request) => {
    // if (request.auth?.user.role === 'admin') {
    try {
        const { title, content } = await request.json();

        // Create a DB Connection
        await dbConnect();
        console.log("Database connected");

        const createdAt = new Date();

        // Form a DB Payload
        const newPost = {
            title, content, createdAt
        };

        // Update the DB
        await createPost(newPost);
        console.log("Post created:", newPost);


        return new NextResponse("Post has been created", {
            status: 201
        });
    } catch (error) {
        console.error("Error creating Post:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};


export const GET = async (request) => {
    try {
        await dbConnect();
        console.log("Database connected");

        const items = await getAllItems();
        // console.log("Fetched products:", products);

        return new NextResponse(JSON.stringify(items), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};