import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { comparePassword } from "./lib/actions/auth.actions";
import { User } from "./lib/database/models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                // find the user
                const user = await User.findOne({ email })
                if (!user) {
                    return null;
                }

                // compare password
                const passwordMatch = await comparePassword(password as string, user.password as string);
                // if password not match return null
                if (!passwordMatch) {
                    return null;
                }

                // if password match return user
                return {
                    id: user._id,
                    email: user.email,
                    name: user.name
                };
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            return session
        },
    },
    pages: {
        signIn: "/sign-in"
    }
})


declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            name: string
            email: string
            id: string
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"]
    }
}