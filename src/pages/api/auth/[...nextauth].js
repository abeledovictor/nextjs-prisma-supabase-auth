// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

// Instantiate Prisma Client
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

const sendWelcomeEmail = async ({ user }) => {
  const { email } = user;

  try {
    await transporter.sendMail({
      from: `"✨ APP - " ${process.env.EMAIL_FROM}`,
      to: email,
      subject: 'Welcome! 🎉',
      html: '<div><p>Welcome!</p><p>I hope you enjoy using my app.</p></div>',
    });
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email})`);
  }
};

export default NextAuth({
  events: {
    createUser: sendWelcomeEmail
  },
  adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
        maxAge: 15 * 60, // Magic links are valid for 15 min only
      }),
    ],
  });