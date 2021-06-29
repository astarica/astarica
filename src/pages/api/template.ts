import { ErrorAuth, ErrorSchema } from "../../models/errors"
import { NextApiRequest, NextApiResponse } from "next"

import { Auth } from "../../models/auth"
import { Web } from "../../models/web"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = new Auth(req, res)
    const login = auth.isLogin()
    if (typeof login === "string") {
      const me = new Web(login)
      switch (req.method) {
        default:
          throw ErrorSchema
        case "POST":
          const template = req.body.template as string
          if (!template) throw ErrorSchema
          await me.updateTemplate(template)
          return res.json({
            data: template,
          })
      }
    }
    throw ErrorAuth
  } catch (e) {
    return res.status(e.code || 500).json({
      error: true,
      message: e.message,
    })
  }
}
