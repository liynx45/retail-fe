import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { INotification } from '../types/schema';
import { useSession } from './AuthProvider';
import { axiosPrivate } from '../libs/axios';

interface NotifProps {
    notif: INotification[];
    updateNotif: (req: INotification) => void;
    removeNotif: (req: string) => void;
    clearNotif: () => void
}

const NotifContext = React.createContext<NotifProps>({
    notif: [],
    updateNotif: (req: INotification) => {},
    removeNotif: (req: string) => {},
    clearNotif: () => {}
})

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

    const fetchNotif = useCallback(async () => {
        try {
            const get = await axiosPrivate.get("/api/notif")
            if (get.status === 200) {
                setNotif(get.data.result.notif.reverse())
            }
        } catch(err) {
            throw err
        }
    }, [notif])

    const updateNotif = useCallback((req: INotification) => {
        setNotif(notif.map((data: INotification) => {
            if (data.id === req.id) {
                return req
            } else {
                return data
            }
        }))
    }, [notif])

    const removeNotif = useCallback((id: string) => {
        setNotif(notif.filter((not: INotification) => not.id !== id))
    }, [notif])

    const clearNotif = useCallback(() => {
        setNotif([])
    }, [notif])

    useEffect(() => {
        if (status === "authorized") {
            const notifInterval = window.setInterval(fetchNotif, 10000)
            return () => window.clearInterval(notifInterval)
        }
    }, [status])

    return (
        <NotifContext.Provider value={{ notif, updateNotif, removeNotif, clearNotif }}>
            {children}
        </NotifContext.Provider>
    )
}

export default NotifProvider
