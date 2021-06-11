import { NextApiRequest, NextApiResponse } from "next"

import Cookies from "cookies"
import { db } from "../db"
import jwt from "jsonwebtoken"

export class Auth {
  token: string
  req: NextApiRequest
  res: NextApiResponse
  Cookies: Cookies
  secret: string
  private CookieKey = "x-authorization"
  private TokenKey = "Bearer "

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req
    this.res = res
    this.secret = process.env.SECRET || "random-text"
    this.Cookies = new Cookies(req, res)
    const token = this.Cookies.get(this.CookieKey)
    try {
      if (token) this.token = token.split(this.TokenKey)[1]
      else this.token = ""
    } catch {
      this.token = ""
    }
  }

  sign(email: string) {
    this.token = jwt.sign({ email }, this.secret)
    return this.toBearer()
  }

  toBearer() {
    return this.TokenKey + this.token
  }

  async login(username: string, password: string) {
    const user = await db.web.findMany({
      where: { username: username.toLowerCase(), password },
    })
    if (user.length > 0) {
      this.sign(username)
      this.Cookies.set(this.CookieKey, this.toBearer(), { httpOnly: true })
      return true
    }
    return false
  }

  update() {
    return this.Cookies.set(this.CookieKey, this.toBearer(), { httpOnly: true })
  }

  isLogin(): boolean | string {
    try {
      const payload = jwt.verify(this.token, this.secret) as {
        email: string
      }
      return payload.email
    } catch {
      return false
    }
  }

  logout() {
    this.Cookies.set(this.CookieKey, "logout")
  }
}
