import { NextResponse } from "next/server";
import { createPost, getAllPublishedPosts } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { auth } from "@/auth";


export const POST = auth(async function (request) {
    if (request.auth?.user.role === 'admin') {
        try {
            const { title, content, draft, category } = await request.json();

            // Create a DB Connection
            await dbConnect();
            console.log("Database connected");

            const createdAt = new Date();

            // Form a DB Payload
            const newPost = {
                title, content, createdAt, draft, category
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
    } else {
        return NextResponse.json({ message: "Not Authorised" }, { status: 401 })
    }
});

export const dynamic = 'force-dynamic';
export const GET = async (request) => {
    try {
        await dbConnect();
        console.log("Database connected");

        const posts = await getAllPublishedPosts();
        // console.log("Fetched products:", products);

        return new NextResponse(JSON.stringify(posts), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};


