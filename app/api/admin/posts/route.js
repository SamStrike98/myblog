import { NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';
export const GET = async (request) => {
    try {
        await dbConnect();
        console.log("Database connected");

        const posts = await getAllPosts();
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