import { useEffect, useState } from "react"
import { decryptData } from "../libs/crypto";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import axiosPrivate from "../libs/axios";
import { useDispatch } from "react-redux";
import { updateAuth } from "../libs/redux/slices/authSlice";

interface User {
    username: string;
    role: number;
    first_name: string;
    last_name: string;
    profile: string;
}

const useUser = () => {

    const [status, setStatus] = useState<"authorized" | "unauthorized" | "loading">("unauthorized")
    const [user, setUser] = useState<User>({
        username: "",
        role: 0,
        first_name: "",
        last_name: "",
        profile: "",
    })
    const [trigger, setTrigger] = useState<boolean>(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getMe = async () => {
        const accessToken = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
        const userLocal = window.localStorage.getItem("_user")
        const decryptAccess = decryptData(accessToken!)
        const decryptUser = decryptData(userLocal!)
        if (!decryptAccess || !decryptUser) {
            setStatus("unauthorized")
            return
        } else {
            setStatus("authorized")
            setUser(JSON.parse(decryptUser))
            dispatch(updateAuth(JSON.parse(decryptUser)))
        }
        try {
            // setStatus("loading")
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
        const accessToken = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
        const userLocal = window.localStorage.getItem("_user")
        const decryptAccess = decryptData(accessToken!)
        const decryptUser = decryptData(userLocal!)
        if (!decryptAccess || !decryptUser) {
            setStatus("unauthorized")
            return
        } else {
            setStatus("authorized")
            setUser(JSON.parse(decryptUser))
        }
    }, [location.pathname])

    const refresh = () => {
        setTrigger(prev => !prev)
    }

    return { status, user, refresh }
}

export {
    useUser
}