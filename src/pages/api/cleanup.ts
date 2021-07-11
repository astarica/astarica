import { NextApiRequest, NextApiResponse } from "next"

import { db } from "../../db"

export default async (_: NextApiRequest, res: NextApiResponse) => {
  await db.invitation.deleteMany({
    where: { webUsername: "mwafa" },
  })
  await db.comment.deleteMany({
    where: { webUsername: "mwafa" },
  })
  res.json({})
}
