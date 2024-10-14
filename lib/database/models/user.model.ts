import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    provider: 'credentials' | 'google' | 'facebook' | 'github';
    verified?: boolean;
    verificationToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


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