import { ErrorAuth, ErrorSchema } from "../../models/errors"
import { NextApiRequest, NextApiResponse } from "next"

import { Auth } from "../../models/auth"
import { CorsMiddleware } from "../../models/cors"
import { Web } from "../../models/web"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await CorsMiddleware(req, res)
    const auth = new Auth(req, res)
    const login = auth.isLogin()
    if (typeof login === "string") {
      const me = new Web(login)
      switch (req.method) {
        default:
          throw ErrorSchema
        case "POST":
          const data = req.body.data as {
            name: string
            address: string
          }[]
          if ("length" in data) {
            const out = data
              .filter(({ name, address }) => name && address)
              .map(({ name, address }) => {
                return me.addInvitation(name, address)
              })
            return res.json({
              data: await Promise.all(out),
            })
          }
          throw ErrorSchema
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
