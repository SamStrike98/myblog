import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: Object
    },
    createdAt: {
        required: true,
        type: Date,
    },
    category: {
        type: String
    },
    draft: {
        required: true,
        type: Boolean
    },
    category: {
        required: true,
        type: String
    }
});

// Check if the model exists before defining it
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;