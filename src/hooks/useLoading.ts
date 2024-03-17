import React, { useEffect, useState } from 'react'

export type LoadingProps = "success" | "error" | "idle" | "loading"

function useLoading(load?: LoadingProps) {
    const [isLoading, setIsloading] = useState<LoadingProps>(load || "idle")

    const setLoading = (type: LoadingProps) => {
        setIsloading(type)
    }

    return { isLoading , setLoading }
}

export default useLoading