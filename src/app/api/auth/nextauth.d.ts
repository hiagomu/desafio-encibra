import { ContributorProps } from '@/app/@types';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      user: ContributorProps
    }
  }
}