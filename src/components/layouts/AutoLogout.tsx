import React, { useCallback, useEffect, useState } from 'react'

function AutoLogout({
    children
}: {
    children: React.ReactNode
}) {
    const mouseEvent = [
        "click",
        "mousemove",
        "focus"
    ]
    const [lastActivity, setLastActivity] = useState<number>(new Date().getTime())
    let config = {
        intervalRefresh: 10 * 1000, // Interval refresh token 
        intervalActivity: 5 * 1000, // Interval pengecekan aktivitas,
        activity: 60 * 1000 // Interval aktivitas tambahan
    }
    const _local_key = "AusklnIDoa*sAIsnoAd-9JSpo"
    let isLogin = true

    const validation = useCallback(() => {
        if (typeof window === "undefined")
            return
        if (lastActivity + config.activity <= new Date().getTime()) {
            window.localStorage.removeItem(_local_key)
            console.log("loh out");
            isLogin = false
            
            return
        }

        const accessToken = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
        if (!accessToken) {
            window.localStorage.removeItem(process.env.REACT_APP_LOCAL_KEY!)
            return
        }
        console.log("validasi")

    }, [lastActivity])

    const getActivity = useCallback(() => {
        if (typeof window === "undefined")
            return
        const localLastActivity = window.localStorage.getItem(_local_key)
        console.log(localLastActivity);

        if (localLastActivity === null) {
            console.log("Empty local activity");
            
            window.localStorage.removeItem(_local_key)
            return
        }

        console.log("get activity")

        setLastActivity(+localLastActivity)
        if (localLastActivity) {
            setTimeout(validation, config.intervalRefresh)
        }

    }, [lastActivity])

    const setActivity = useCallback(() => {

        if (typeof window === "undefined")
            return

        setTimeout(() => {
            window.localStorage.setItem(_local_key, new Date().getTime().toString())
        }, 1000)

    }, [getActivity])

    // useEffect(() => {

    //     if (typeof window === "undefined")
    //         return

    //     if (!isLogin) {
    //         return
    //     }

    //     setInterval(() => {
    //         getActivity()
    //     }, config.intervalRefresh)

    //     mouseEvent.forEach(event => {
    //         window.addEventListener(event, setActivity)
    //     })

    //     return () => {
    //         mouseEvent.forEach(event => {
    //             window.removeEventListener(event, setActivity)
    //         })
    //     }
    // }, [lastActivity, getActivity, setActivity, validation])


    return (
        <div>
            {children}
        </div>
    )
}

export default AutoLogout
