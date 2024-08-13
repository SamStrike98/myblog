import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongo"
import User from '@/models/user-model'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/db"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"


const providers = [
    GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        allowDangerousEmailAccountLinking: true,
        profile(profile) {
            return {
                // Return the default fields
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                // Add a new one
                displayName: profile.name,
            };
        },

        authorization: {
            params: {
                prompt: 'consent',
                access_type: 'offline',
                response_type: 'code'
            }
        }
    }),
    CredentialsProvider({
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials) return null;
            await dbConnect()
            try {

                const user = await User.findOne({ email: credentials?.email })

                if (user) {
                    const isMatch = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (isMatch) {
                        console.log('email and password match', user)
                        return user;
                    } else {
                        console.log("email and password do not match")
                        throw new Error("Password incorrect")
                    }
                } else {
                    throw new Error("User not found")
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    })
]

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    // session: {
    //     strategy: 'jwt'
    // },
    adapter: MongoDBAdapter(clientPromise),
    providers: providers,
    session: {
        strategy: 'jwt'
    },

    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
                token.accessToken = user.access_token;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken;
            session.user.id = token.id;


            return session;
        },
    },

    signIn: async ({ user, account, profile, email, credentials }) => {
        try {
            if (account?.provider === "google") {
                const { email, name } = user;

                await dbConnect();
                const existingUser = await User.findOne({ email });

                if (!existingUser) {
                    await User.create({ email, name, role: 'user', displayName: name });
                }

                // Log success and return true to allow sign-in
                console.log("Sign-in successful for:", email);
                return true;
            }

            // Default to allow sign-in for other providers
            return true;

        } catch (error) {
            // Log the error and return false to deny sign-in
            console.error("Error during sign-in:", error);
            return false;
        }
    },
    // pages: {
    //     signIn: "/signin"
    // }
})



