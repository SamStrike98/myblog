import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: Date,
    },
    draft: {
        required: true,
        type: Boolean
    },
    description: {
        required: true,
        type: String
    },
    img: {
        required: true,
        type: String
    },
    githubLink: {
        type: String
    },
    liveSiteLink: {
        type: String
    },
    tech: {
        required: true,
        type: Array
    },
    featured: {
        required: true,
        type: Boolean
    }
});

// Check if the model exists before defining it
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;