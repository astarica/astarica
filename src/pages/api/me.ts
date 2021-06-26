import { NextApiRequest, NextApiResponse } from "next"

import { Auth } from "../../models/auth"
import { ErrorAuth } from "../../models/errors"
import { Web } from "../../models/web"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = new Auth(req, res)
    const login = auth.isLogin()
    if (typeof login === "string") {
      const me = new Web(login)
      return res.json({
        data: await me.details(),
      })
    }
    throw ErrorAuth
  } catch (e) {
    return res.status(e.code || 500).json({
      error: true,
      message: e.message,
    })
  }
}
