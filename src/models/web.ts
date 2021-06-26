import { Prisma, Status } from "@prisma/client"

import { db } from "../db"

export class Web {
  username: string
  constructor(username: string) {
    this.username = username
  }

  async details() {
    const me = await db.web.findUnique({
      where: { username: this.username },
      include: { invitations: true, comments: true },
    })
    if (me != null) {
      const { password: _, ...detail } = me
      return detail
    }
    return me
  }

  async update(data: Prisma.WebUpdateInput) {
    return await db.web.update({
      where: { username: this.username },
      data,
    })
  }

  async updateTemplate(template: string) {
    return await this.update({ template })
  }

  async addComment(name: string, comment: string) {
    return await db.comment.create({
      data: {
        webUsername: this.username,
        createdAt: new Date(),
        name,
        text: comment,
      },
    })
  }

  async addInvitation(name: string, address: string) {
    return db.invitation.create({
      data: {
        webUsername: this.username,
        name,
        address,
        status: Status.NO_CONFIRMATION,
        lastUpdate: new Date(),
      },
    })
  }
}
