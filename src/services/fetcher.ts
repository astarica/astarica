import fetch, { RequestInit } from "node-fetch"

export const fetcher = async <T>(url: string, ops?: RequestInit) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    ...ops,
  }).then<T>((r) => r.json())
