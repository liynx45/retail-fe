import { useMemo } from "react"
import profileImg from "./img/profile.jpg"

export const imageUrl = useMemo(() => ({
    profile: profileImg
}), [])