import Project from "@/models/project-model";


// GET ALL PROJECTS
export async function getAllProjects() {
    try {
        const projects = await Project.find({}).select('_id name draft img description tech githubLink liveSiteLink').sort({ createdAt: -1 }).lean();
        return projects;
    } catch (error) {
        throw new Error(error)
    }
}

// GET ALL PUBLISHED PROJECTS
export async function getAllPublishedProjects() {
    try {
        const projects = await Project.find({ draft: true }).select('_id name draft img description tech githubLink liveSiteLink').sort({ createdAt: -1 }).lean();
        return projects;
    } catch (error) {
        throw new Error(error)
    }
}



// GET PROJECT BY ID
// export async function getProjectById(id) {
//     try {
//         const project = await Project.findById(id);
//         return project;
//     } catch (error) {
//         throw new Error(error)
//     }
// }



// CREATE PROJECT
export async function createProject(project) {
    try {
        await Project.create(project);
        return project;
    } catch (error) {
        throw new Error(error)
    }
}


// UPDATE PROJECT
export async function updateProject(id, { name, img, tech, description, githubLink, liveSiteLink, draft, featured }) {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: id },
            { name, img, tech, description, githubLink, liveSiteLink, draft, featured }
        );
        return project;
    } catch (error) {
        throw new Error(error)
    }
}
