import { ErrorAuth, ErrorSchema } from "../../models/errors"
import { NextApiRequest, NextApiResponse } from "next"

import { Auth } from "../../models/auth"
import { CorsMiddleware } from "../../models/cors"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await CorsMiddleware(req, res)
  const auth = new Auth(req, res)
  try {
    switch (req.method) {
      default:
        throw ErrorSchema
      case "GET":
        if (auth.isLogin()) {
          auth.update()
          return res.json({ token: auth.toBearer() })
        }
        throw ErrorAuth

      case "POST":
        if (req.body.username && req.body.password) {
          const login = await auth.login(req.body.username, req.body.password)
          if (login) {
            return res.status(200).json({
              token: auth.toBearer(),
            })
          }
          throw { code: 401, message: "wrong username or password!" }
        }
        throw ErrorSchema
      case "DELETE":
        auth.logout()
        res.json({ message: "Log out!" })
    }
  } catch (e) {
    const code = e.code || 500
    return res.status(code).json({
      error: true,
      message: e.message,
    })
  }
}
