import { NextApiRequest, NextApiResponse } from "next"

import { ErrorNotFound } from "../../../models/errors"
import { Web } from "../../../models/web"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string
  const me = new Web(username)
  const details = await me.details()
  try {
    if (!details) throw ErrorNotFound
    return res.json({
      data: details.comments,
    })
  } catch (e) {
    return res.status(e.code || 500).json({
      error: true,
      message: e.message,
    })
  }
}
