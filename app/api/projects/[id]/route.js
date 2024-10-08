import { NextResponse } from "next/server";
import { getProjectById } from "@/queries/projects";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';
export const GET = async (request, { params }) => {
    try {
        await dbConnect();
        console.log("Database connected");
        console.log(params.id)
        const projectId = params.id

        const project = await getProjectById(projectId);


        return new NextResponse(JSON.stringify(project), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching project:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};