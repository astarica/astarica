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
      include: {
        invitations: { orderBy: { lastUpdate: "desc" } },
        comments: { orderBy: { createdAt: "desc" } },
      },
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

export const DEFAULT_MSG_TEMPLATE = `Kepada *[name]* di [address]

_Assalamualaikum Warohmatullohi Wabarokatuh_

Pada kesempatan yang berbahagia ini, tanpa mengurangi rasa hormat, kami ingin mengundang sdr [name] untuk hadir dalam acara pernikahan kami yang akan diselenggarakan pada :

Hari/Tgl.   :
Waktu       :
Lokasi      :

*Berikut link undangan kami lampirkan, mohon untuk konfimasi kehadiran pada link berikut.*

[Link]

Merupakan kehormatan dan kebahagiaan bagi kami apabila anda berkenan untuk hadir dan memberikan doa restu kepada kami 🙏🏻

Salam,
*Wafa & Dwi*

Kel. Bp Slamet dan Ibu Juwarti
Kel. Bp Jumadi dan Ibu Ratna

Wassalamualaikum Warohmatullohi Wabarokatuh.
`
