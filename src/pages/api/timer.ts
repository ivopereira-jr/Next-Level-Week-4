import { query as q } from 'faunadb';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { fauna } from '../../services/fauna';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'PUT') {
    const session = await getSession({ req });
    const { newTimerValue } = req.body;

    const userData = {
      newTimerValue: String(newTimerValue),
    };

    await fauna.query(
      q.Update(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('user_by_email'), session.user.email))
        ),
        {
          data: {
            timer_defined_by_user: userData.newTimerValue,
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
