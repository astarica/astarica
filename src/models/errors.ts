function errorFactory(code: number, message: string) {
  return { code, message }
}

export const ErrorSchema = errorFactory(400, "Bad Schema Implementation!")
export const ErrorNotFound = errorFactory(404, "Not Found!")
export const ErrorAuth = errorFactory(401, "Unauthorized!")
