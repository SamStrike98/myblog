import { NextResponse } from "next/server";
import { updatePost } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import { auth } from "@/auth";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";


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


            // Use Promise.all to wait for all async image uploads to complete
            await Promise.all(content.content.map(async (item) => {
                if (item.type === 'image') {
                    const imgUrl = await uploadToCloudinary(item.attrs.src, item.attrs.alt);
                    item.attrs.src = imgUrl; // update the src after upload
                }
            }));

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