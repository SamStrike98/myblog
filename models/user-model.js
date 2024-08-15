import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: Date,
    },
    role: {
        required: true,
        type: String,
    }
});

// Check if the model exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;