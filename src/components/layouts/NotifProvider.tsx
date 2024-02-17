import React, { createContext, useContext, useEffect, useState } from 'react'
import { INotification } from '../../types/schema'
import axiosPrivate from '../../libs/axios'
import { useSession } from './AuthProvider'

const NotifContext = React.createContext<any>([])

export const useNotif = () => {
    return useContext(NotifContext)
}


function NotifProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [notif, setNotif] = useState<INotification[]>([])
    const { status } = useSession()

    const fetchNotif = async () => {
        try {
            const get = await axiosPrivate.get("/api/notif")
            if (get.status === 200) {
                setNotif(get.data.result.notif.reverse())
            }
        } catch {
            throw new Error()
        }
    }

    const updateNotif = (req: INotification) => {
        setNotif(notif.map((not: INotification) => {
            if (not.id === req.id) {
                return req
            } else {
                return not
            }
        }))
    }

    const removeNotif = (id: string) => {
        setNotif(notif.filter((not: INotification) => not.id !== id))
    }

    useEffect(() => {
        if (status === "authorized") {
            const notifInterval = window.setInterval(fetchNotif, 10000)
            return () => window.clearInterval(notifInterval)
        }
    }, [status])

    return (
        <NotifContext.Provider value={{ notif, updateNotif, removeNotif }}>
            {children}
        </NotifContext.Provider>
    )
}

export default NotifProvider
