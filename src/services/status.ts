import { Status } from "@prisma/client"

export const statusMapping = (stat: Status) => {
  switch (stat) {
    default:
      return { name: "Undefined", color: "black" }
    case Status.ABSENT:
      return { name: "Tidak Hadir", color: "red.600" }
    case Status.CONFIRMED:
      return { name: "Hadir", color: "teal.600" }
    case Status.CONFUSED:
      return { name: "BINGUNG", color: "gray.600" }
    case Status.NO_CONFIRMATION:
      return { name: "Belum Konfimasi", color: "orange.600" }
  }
}
