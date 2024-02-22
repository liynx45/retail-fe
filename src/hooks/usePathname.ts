import { useMemo } from "react"
import { useLocation } from "react-router-dom"

export const usePathnme = () => {
    const { pathname } = useLocation()

    return useMemo(() => ({

    }), [])
}