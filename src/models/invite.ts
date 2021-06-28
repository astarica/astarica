import { Status } from "@prisma/client"
import { db } from "../db"

export class Invite {
  id: number
  constructor(id: number) {
    this.id = id
  }

  async updateStatus(stat: string) {
    const status = Object.keys(Status).find((s) => s === stat) as
      | Status
      | undefined
    if (status)
      return await db.invitation.update({
        where: { id: this.id },
        data: { status },
      })
    return null
  }

  async addComment(t: string) {
    const me = await db.invitation.findUnique({ where: { id: this.id } })
    if (!me) return null
    return await db.comment.create({
      data: {
        webUsername: me.webUsername,
        name: me.name,
        text: t,
        createdAt: new Date(),
      },
    })
  }
}
