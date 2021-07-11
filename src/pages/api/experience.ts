/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { query as q } from 'faunadb';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../services/fauna';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const session = await getSession({ req });
    const {
      level,
      experience,
      currentExperienceToNextLevel,
      challengesCompleted,
    } = req.body;

    const userData = {
      level: String(level),
      experience: String(experience),
      current_experience_to_next_level: String(currentExperienceToNextLevel),
      challenges_completed: String(challengesCompleted),
    };

    await fauna.query(
      q.Update(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('user_by_email'), session.user.email))
        ), // os novos dados
        {
          data: {
            level: userData.level,
            experience: userData.experience,
            current_experience_to_next_level:
              userData.current_experience_to_next_level,
            challenges_completed: userData.challenges_completed,
          },
        }
      )
    );

    res.status(200).send('updated');
  } else {
    res.setHeader('Allow', 'PUT');
    res.status(405).end('method not allowed');
  }
};
