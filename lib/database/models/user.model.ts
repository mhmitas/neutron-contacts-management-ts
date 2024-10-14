import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            minlength: 6
        },
        avatar: {
            type: String,
            default: '/default-avatar.png'
        },
        provider: {
            type: String,
            enum: ['credentials', 'google', 'facebook', 'github'],
            required: true,
        },
        verified: {
            type: Boolean,
            default: false
        },
        verificationToken: {
            type: String
        },
    },
    { timestamps: true }
);

// Compile the model from the schema
export const User = mongoose.models.User || mongoose.model('User', userSchema);