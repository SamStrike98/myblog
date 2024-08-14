import Post from "@/models/post-model";


// GET ALL POSTS
export async function getAllPosts() {
    try {
        const posts = await Post.find({}).select('_id title createdAt category').sort({ createdAt: -1 }).lean();
        return posts;
    } catch (error) {
        throw new Error(error)
    }
}

// GET POST BY ID
export async function getPostById(id) {
    try {
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        throw new Error(error)
    }
}

// CREATE POST
export async function createPost(post) {
    try {
        await Post.create(post);
        return post;
    } catch (error) {
        throw new Error(error)
    }
}

