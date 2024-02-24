import { useEffect } from "react"
import { useLocation } from "react-router-dom"

interface UseScrollToTopProps {
    top: number;
    left: number;
    behaviour: string;
}
const useScrollToTop = () => {

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({
            top: 0,
        })
    }, [pathname])
}

export {
    useScrollToTop
}
