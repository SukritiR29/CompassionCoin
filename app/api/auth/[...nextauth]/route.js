import { connectMongoDB } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import User from "@/models/user";


const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password, role} = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if(!user){
                        return null;
                    }

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if(!passwordsMatch){
                    return null;
                }

                return user;

                } catch (error) {
                    console.log(error)
                }
                return user;
            }
        })
    ],

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        login: "/login"
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST }