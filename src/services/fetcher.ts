import fetch, { RequestInit } from "node-fetch"

import { Me } from "../components/MeCtx"

export const fetcher = async <T>(url: string, ops?: RequestInit) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    ...ops,
  }).then<T>((r) => r.json())

export const fetchMe = () =>
  fetcher<{ error: boolean; data: Me; message?: string }>("/api/me")
