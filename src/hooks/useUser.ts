import { useEffect, useState } from "react"
import { decryptData, encryptData } from "../libs/crypto";
import { useLocation, useNavigate } from "react-router-dom";
import axiosPrivate from "../libs/axios";

interface User {
    username: string;
    role: number;
    first_name: string;
    last_name: string;
    profile: string;
    email?: string;
    verify: boolean
}

const useUser = () => {

    const [status, setStatus] = useState<"authorized" | "unauthorized" | "loading">("unauthorized")
    const [user, setUser] = useState<User>({
        username: "",
        role: 0,
        first_name: "",
        last_name: "",
        profile: "",
        email: "",
        verify: false
    })
    const [trigger, setTrigger] = useState<boolean>(false)
    const location = useLocation()
    const navigate = useNavigate()

    const getMe = async () => {
        const accessToken = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
        const decryptAccess = decryptData(accessToken!)
        if (!decryptAccess) {
            setStatus("unauthorized")
            return
        } else {
            setStatus("authorized")
        }
        try {
            setStatus("loading")
            const me = await axiosPrivate.get("http://localhost:3001/auth/me", {
                headers: {
                    Authorization: `Bearer ${decryptAccess}`
                }
            })
            if (me.status === 200) {
                setStatus("authorized")
                return
            }
        } catch (e) {
            setStatus("unauthorized")
            navigate("/auth/login")
            return
        }
    }

    useEffect(() => {
        getMe()
    }, [trigger])

    useEffect(() => {

        if (!location.pathname.startsWith("/dashbord"))
            return

        const accessToken = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
        const userLocal = window.localStorage.getItem("_user")
        const decryptAccess = decryptData(accessToken!)
        const decryptUser = decryptData(userLocal!)

        if (!userLocal && accessToken !== null) {
            const getUser = async () => {
                const get = await axiosPrivate.get("/auth/current")
                if (get.status === 200) {
                    localStorage.setItem("_user", encryptData(JSON.stringify(get.data.result)))
                    setUser(get.data.result)
                }
            }
            getUser()
        } else {
            if (!decryptAccess || !decryptUser) {
                setStatus("unauthorized")
                return
            } else {
                setStatus("authorized")
                setUser(JSON.parse(decryptUser))
            }
        }
    }, [location.pathname])

    const refresh = () => {
        setTrigger(prev => !prev)
    }

    return { status, user, refresh, setUser, setStatus }
}

export {
    useUser
}