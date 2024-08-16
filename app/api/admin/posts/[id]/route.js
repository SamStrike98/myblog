import { NextResponse } from "next/server";
import { updatePost } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import { auth } from "@/auth";


// Update Post 
export const PATCH = auth(async function PATCH(request, { params }) {

    if (request.auth?.user.role === 'admin') {
        const session = await auth()
        const id = params.id
        try {
            const { title, content, category, draft } = await request.json();

            // Create a DB Connection
            await dbConnect();
            console.log("Database connected");


            // Update the DB
            await updatePost(id, { title, content, category, draft });
            console.log("Post Updated", id);


            return new NextResponse("Post has been updated", {
                status: 201
            });
        } catch (error) {
            console.error("Error updating post:", error);
            return new NextResponse(error.message, {
                status: 500
            });
        }
    } else {
        return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }


});