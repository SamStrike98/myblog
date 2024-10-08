import { NextResponse } from "next/server";
import { createProject, getAllPublishedProjects } from "@/queries/projects";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";




export const POST = auth(async function (request) {
    // if (request.auth?.user.role === 'admin') {
    try {
        const formData = await request.formData();

        const name = formData.get('name');
        const img = formData.get('img');
        const tech = formData.get('tech');
        const description = formData.get('description');
        const githubLink = formData.get('githubLink');
        const liveSiteLink = formData.get('liveSiteLink');
        const draft = formData.get('draft');
        const featured = formData.get('featured');


        // Create a DB Connection
        await dbConnect();
        console.log("Database connected");


        // const imgUrl = await uploadToCloudinary(img.path, name);

        const techArr = tech.split(',');
        const createdAt = new Date();

        // Form a DB Payload
        const newProject = {
            name, img, tech: techArr, description, githubLink, liveSiteLink, draft, featured, createdAt
        };

        // Update the DB
        await createProject(newProject);
        console.log("Project created:", newProject);


        return new NextResponse("Project has been created", {
            status: 201
        });
    } catch (error) {
        console.error("Error creating Project:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
    // } else {
    //     return NextResponse.json({ message: "Not Authorised" }, { status: 401 })
    // }
});

export const dynamic = 'force-dynamic';
export const GET = async (request) => {
    try {
        await dbConnect();
        console.log("Database connected");

        const projects = await getAllPublishedProjects();
        // console.log("Fetched products:", products);

        return new NextResponse(JSON.stringify(projects), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};


