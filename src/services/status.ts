import { Status } from "@prisma/client"

export const statusMapping = (stat: Status) => {
  switch (stat) {
    default:
      return { name: "Undefined" }
    case Status.ABSENT:
      return { name: "Tidak Hadir" }
    case Status.CONFIRMED:
      return { name: "Hadir" }
    case Status.CONFUSED:
      return { name: "BINGUNG" }
    case Status.NO_CONFIRMATION:
      return { name: "Belum Konfimasi" }
  }
}
