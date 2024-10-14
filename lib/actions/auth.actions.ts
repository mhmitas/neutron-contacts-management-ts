"use server"

import { SignUpParams } from "@/types";
import { connectDB } from "../database/mongoose";
import { User } from "../database/models/user.model";
import bcrypt from "bcryptjs"
import { signIn } from "@/auth";

export async function createUser({ name, email, password }: SignUpParams) {
    try {
        await connectDB()

        // check if user already exists
        const userExists = await User.exists({ email })

        if (userExists) {
            return { error: "User already exists" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // create user
        await User.create({
            name,
            email,
            password: hashedPassword,
            provider: "credentials"
        })

        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        })

        return { success: true }

    } catch (error) {
        throw error
    }
}

export async function signInUser(email: string, password: string) {
    try {
        await connectDB()
        const user = await User.findOne({ email })
        if (!user) {
            return { error: "User not found" }
        }
        const passwordMatch = await comparePassword(password, user.password as string)
        if (!passwordMatch) {
            return { error: "Invalid password" }
        }

        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        })

        return { success: true }
    } catch (error) {
        throw error
    }
}

export async function getUserByEmail(email: string) {
    try {
        await connectDB()
        const user = await User.findOne({ email }).select("-password")
        return user
    } catch (error) {
        throw error
    }
}

export async function comparePassword(password: string, hashedPassword: string) {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        throw error
    }
}