import { Anchor, Flex, Typography } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function NavBar() {
    const accessToken = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
    const linkTab = [
        {
            key: "1",
            title: "Ruang",
            href: "/ruang"
        },
        {
            key: "2",
            title: "Tentang",
            href: "/tentang"
        },
        {
            key: "3",
            title: "Kontak",
            href: "/kontak"
        },
        {
            key: "4",
            title: "Masuk",
            href: accessToken ? "/dashbord" : "/auth/login"
        }
    ]

    const { pathname } = useLocation()

    return (
        <nav
            className='p-4 px-8'
        >
            <Flex
                align='center'
                justify='space-between'
            >
                <Typography.Title
                    level={4}
                >
                    <Link to={"/"}>Kos Abdi</Link>
                </Typography.Title>

                <Flex
                    align='center'
                    justify='center'
                    gap={24}
                >
                    {
                        linkTab.map(nav =>
                            <Link
                                key={nav.key}
                                to={nav.href}
                                style={pathname == nav.href ? { borderBottom: "solid 2px blue" } : {}}
                                className='p-2'
                            >
                                {nav.title}
                            </Link>
                        )
                    }
                </Flex>
            </Flex>
        </nav>
    )
}

export default NavBar
