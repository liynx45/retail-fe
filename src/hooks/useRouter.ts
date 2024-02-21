import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function useRouter(path?: string) {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    return useMemo(() => ({
        back: navigate(-1),
        push: navigate({ pathname: path }),
        reload: window.location.reload(),
        replace: navigate({ pathname: path }, { replace: true })
    }), [pathname, path])
}

export {
    useRouter
}
