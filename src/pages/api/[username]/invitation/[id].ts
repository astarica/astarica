import { ErrorNotFound, ErrorSchema } from "../../../../models/errors"
import { NextApiRequest, NextApiResponse } from "next"

import { Invite } from "../../../../models/invite"
import { Status } from "@prisma/client"
import { Web } from "../../../../models/web"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string
  const id = Number(req.query.id as string)

  const me = new Web(username)
  const data = await me.details()
  try {
    if (!data) throw ErrorNotFound
    if (!id) throw ErrorSchema
    const invitation = data.invitations.find(
      ({ id: invitationId }) => invitationId === id
    )
    if (!invitation) throw ErrorNotFound
    switch (req.method) {
      default:
        throw ErrorSchema

      case "GET":
        return res.json({
          data: invitation,
          status: Object.keys(Status),
        })

      case "POST":
        const status = req.body.status as string
        const comment = req.body.comment as string

        const invite = new Invite(id)
        if (status) await invite.updateStatus(status)
        if (comment) await invite.addComment(comment)

        return res.json({ data: { status, comment } })
    }
  } catch (e) {
    return res.status(e.code || 500).json({
      error: true,
      message: e.message,
    })
  }
}
