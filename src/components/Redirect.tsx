import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface RedirectProps {
    to: string
}
const Redirect: React.FC<RedirectProps> = ({to}) => {

    const navigate = useNavigate()
    useEffect(() => {
        navigate(to)
    }, [to])
    return (
        <div>
            <span>Unauthorized</span>
        </div>
    )
}

export default Redirect
