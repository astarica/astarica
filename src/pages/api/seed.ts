import { DEFAULT_MSG_TEMPLATE, Web } from "../../models/web"
import { NextApiRequest, NextApiResponse } from "next"

import { db } from "../../db"

export default async (_: NextApiRequest, res: NextApiResponse) => {
  await db.web.upsert({
    where: { username: "mwafa" },
    update: {
      username: "mwafa",
      password: "secret",
      link: "https://mwafa.net",
      name: "Muhammad Wafa",
      template: DEFAULT_MSG_TEMPLATE,
    },
    create: {
      username: "mwafa",
      password: "secret",
      link: "https://mwafa.net",
      name: "Muhammad Wafa",
      template: DEFAULT_MSG_TEMPLATE,
    },
  })
  const me = new Web("mwafa")
  me.addComment("Ignatius Sandra", "Yay...")
  me.addInvitation("Ignatius Sandra", "Java")
  res.json({})
}
