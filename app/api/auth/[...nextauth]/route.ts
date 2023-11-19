import GoogleProvider from 'next-auth/providers/google';
import NextAuth, {SessionOptions} from "next-auth";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '',
            clientSecret: ''
        })
    ],
    async session({session}: any) {

    },
    async signIn({profile}: any) {

    }
});

export {handler as GET, handler as POST}