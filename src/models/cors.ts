import { NextApiRequest, NextApiResponse } from "next"

import Cors from "cors"

const cors = Cors()

export const CorsMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) =>
  new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
