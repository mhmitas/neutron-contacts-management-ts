import { model, models, Schema, Document } from "mongoose";



export interface IContact extends Document {
    _id: string;
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    favorite: boolean;
    favoriteAt?: Date;
    user: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ContactSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        avatar: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false
        },
        favoriteAt: {
            type: Date,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)


export const Contact = models.Contact || model('Contact', ContactSchema)