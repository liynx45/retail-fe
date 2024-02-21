import React, { useEffect, useState } from 'react'

type LoadingProps = "success" | "error" | "idle" | "loading"

function useLoading(load?: boolean) {
    const [isLoading, setIsloading] = useState<LoadingProps>("idle")

    const setLoading = (type: LoadingProps) => {
        setIsloading(type)
    }

    return { isLoading , setLoading }
}

export default useLoading