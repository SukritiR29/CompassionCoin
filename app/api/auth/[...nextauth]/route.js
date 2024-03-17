import { connectMongoDB } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

<<<<<<< HEAD
      async authorize(credentials) {
        const { email, password, role } = credentials;
=======
            async authorize(credentials) {
                const { email, password, role} = credentials;
>>>>>>> 068aadefba426f630a77e9f859c7d63d1ce837c0

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          if (user.role !== role){
            return null;
          }
          
          return { ...user.toObject(), role };
        } catch (error) {
          console.log(error);
        }
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    login: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
