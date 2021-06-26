import { Comment, Invitation } from "@prisma/client"
import { ReactNode, createContext, useEffect, useState } from "react"

import { fetchMe } from "../services/fetcher"

export interface Me {
  username: string
  link: string
  name: string
  template: string
  invitations: Invitation[]
  comments: Comment[]
}

export const MeCtx = createContext<{ me: Me; update: () => void }>({
  me: {
    username: "",
    name: "",
    link: "",
    template: "",
    invitations: [],
    comments: [],
  },
  update: () => {},
})

export const MeProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<Me>({
    username: "",
    name: "",
    link: "",
    template: "",
    invitations: [],
    comments: [],
  })

  const update = () => {
    fetchMe()
      .then((d) => {
        if (!d.error) setMe(d.data)
      })
      .catch(console.log)
  }
  useEffect(() => {
    update()
  }, [])

  return <MeCtx.Provider value={{ me, update }}>{children}</MeCtx.Provider>
}
