import { axiosPrivate } from "../libs/axios";
import { decryptData, encryptData } from "../libs/crypto"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface User {
    username: string;
    role: number;
    first_name: string;
    last_name: string;
    profile: string;
    email: string;
    verify: boolean
}

interface StatusProps {
    user: User;
    status: "authorized" | "unauthorized" | "loading";
    setStatus: React.Dispatch<React.SetStateAction<"authorized" | "unauthorized" | "loading">>;
    setUser: React.Dispatch<React.SetStateAction<User>>
}

const AuthContext = React.createContext<StatusProps>({
    user: {
        username: "",
        role: 0,
        first_name: "",
        last_name: "",
        profile: "",
        email: "",
        verify: false
    },
    status: "unauthorized",
    setStatus: () => { },
    setUser: () => { }
})

export const useSession = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    const { pathname } = useLocation()
    const [user, setUser] = useState<User>({
        username: "",
        role: 0,
        first_name: "",
        last_name: "",
        profile: "",
        email: "",
        verify: false
    })
    const [status, setStatus] = useState<"authorized" | "unauthorized" | "loading">("unauthorized")

    const navigate = useNavigate()

    const isRefresh = useCallback(async () => {
        setStatus("loading")
        try {
            const get = await axiosPrivate.get("/auth/me")
            if (get.status === 200) {
                setStatus("authorized")
            }
        } catch {
            setStatus("unauthorized")
        }
    }, [status])

    const fetchUser = useCallback(async () => {
        const get = await axiosPrivate.get(`/auth/current`)
        if (get.status === 200) {
            window.localStorage.setItem("_user", encryptData(JSON.stringify(get.data.result)))
            setUser(get.data.result)
        }
    }, [user, status])

    const fetchAccess = useCallback(async () => {
        try {
            setStatus("loading")
            const get = await axiosPrivate.get("/auth/refresh")
            if (get.status === 200) {
                setStatus("authorized")
                window.localStorage.setItem(process.env.REACT_APP_LOCAL_KEY!, encryptData(get.data.data.access_Token))
            }
        } catch {
            setStatus("unauthorized")
            navigate("/auth/login")
        }
    }, [status])

    const isVerifyLocal = useCallback(() => {
        const getAccess = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
        const getUser = window.localStorage.getItem("_user")

        if (!getAccess) {
            fetchAccess()
        } else {
            const access = decryptData(getAccess)
            if (!access) {
                fetchAccess()
            }
        }

        if (!getUser) {
            fetchUser()
        } else {
            const user = decryptData(getUser)
            if (!user) {
                fetchUser()
            }
        }
    }, [status, user])

    useEffect(() => {

        if (status === "loading")
            return

        if (status === "authorized") {
            isVerifyLocal()
        }

        if (pathname.startsWith("/dashboard")) {
            if (status === "unauthorized") {
                navigate("/auth/login")
            }
        }

        if (pathname.startsWith("/auth")) {
            if (status === "authorized") {
                navigate("/dashboard")
            }
        }

        console.log("Session :", status)

    }, [status])

    useEffect(() => {
        if (pathname.startsWith("/dashboard")) {
            isRefresh()
        }
    }, [pathname])

    useEffect(() => {
        const getUser = window.localStorage.getItem("_user")
        if (!getUser) {
            fetchUser()
        } else {
            const user = decryptData(getUser)
            if (!user) {
                fetchUser()
            } else {
                setUser(JSON.parse(user))
            }
        }
        isRefresh()
    }, [])

    return (
        <div>
            <AuthContext.Provider value={{ status, setStatus, user, setUser }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider
