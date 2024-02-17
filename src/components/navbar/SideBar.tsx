import { FileSearchOutlined, HomeOutlined, PieChartOutlined, SettingOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Typography } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { user_role } from '../../utils/code._status';
import { useSession } from '../layouts/AuthProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';

type MenuItem = Required<MenuProps>['items'][number];

function menuItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
) {

    return {
        key,
        icon,
        children,
        label,
    };
}

const typeBar = (role?: number) => {
    const itemsMember = [
        menuItem(<Link to={"/dashbord"}>Dashbord</Link>, '1', <PieChartOutlined />),
        menuItem(<span>Pembayaran</span>, '5', <WalletOutlined />, [
            menuItem(<Link to={"/dashbord/pembayaran"}>Tagihan</Link>, '7'),
            menuItem(<Link to={"/dashbord/pembayaran/riwayat"}>Riwayat</Link>, '8')
        ]),
        menuItem(<Link to={"/dashbord/setelan"}>Setelan</Link>, '12', <SettingOutlined />),
    ]

    const itemsAdmin = [
        menuItem(<Link to={"/dashbord"}>Dashbord</Link>, '1', <PieChartOutlined />),
        menuItem(<Link to={"/dashbord/user"}>User Master</Link>, '2', <UserOutlined />),
        menuItem(<span>Ruang</span>, "6", <HomeOutlined />, [
            menuItem(<Link to={"/dashbord/ruang"}>Daftar Ruang</Link>, '3'),
            menuItem(<Link to={"/dashbord/ruang/tambah"}>Tambah Ruang</Link>, '4')
        ]),
        menuItem(<span >Pembayaran</span>, '5', <WalletOutlined />, [
            menuItem(<Link to={"/dashbord/pembayaran"}>Tagihan</Link>, '7'),
            menuItem(<Link to={"/dashbord/pembayaran/riwayat"}>Riwayat</Link>, '8')
        ]),
        menuItem(<span>Laporan</span>, '9', <FileSearchOutlined />, [
            menuItem(<Link to={"/dashbord/keuangan"}>Keuangan</Link>, '10'),
            menuItem(<Link to={"/dashbord/keuangan/analisis"}>Analisis Kerja</Link>, '11')
        ]),
        menuItem(<Link to={"/dashbord/setelan"}>Setelan</Link>, '12', <SettingOutlined />),
    ];

    switch (role) {
        case (user_role.MEMBER):
            return itemsMember
        case (user_role.ADMIN):
            return itemsAdmin
    }

    return []
}

function SideBar() {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSession()
    const { company } = useSelector((state: RootState) => state)

    return (
        <Sider
            collapsible
            theme='light'
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={
                { padding: "10px" }
            }
        >
            <Typography.Title
                level={4}
                style={
                    { padding: "6px" }
                }
            >
                <Link to={"/"}>
                    {!collapsed ? company.data.name : ""}
                </Link>
            </Typography.Title>
            <div className="demo-logo-vertical max-h-screen" />
            <Menu
                theme="light"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={typeBar(user && user?.role)}
            />
        </Sider>
    )
}

export default SideBar
