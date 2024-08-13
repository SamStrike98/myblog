import { NextResponse } from "next/server";
import { getPostById } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
    try {
        await dbConnect();
        console.log("Database connected");
        console.log(params.id)
        const postId = params.id

        const post = await getPostById(postId);
        console.log("Fetched item:", post);

        return new NextResponse(JSON.stringify(post), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};