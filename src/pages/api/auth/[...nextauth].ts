import { query as q } from 'faunadb';

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {
      const { name, image, email } = user;

      try {
        if (user.email) {
          await fauna.query(
            // verificar se o user ja existe
            q.If(
              q.Not(
                q.Exists(
                  q.Match(q.Index('user_by_email'), q.Casefold(user.email))
                )
              ), // se não faz a criaçao
              q.Create(q.Collection('users'), {
                data: {
                  name,
                  image,
                  email,
                  level: '1',
                  experience: '0',
                  challenges_completed: '0',
                  current_experience_to_next_level: '0',
                  timer_defined_by_user: '25',
                },
              }),
              // se sim pega os dados
              q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
            )
          );

          return true;
        }

        return false;
      } catch (err) {
        console.log(err);

        return false;
      }
    },
  },
  pages: {
    error: '/signinerro',
  },
});
