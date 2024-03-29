import React, { useEffect, useState } from 'react';
import {
  BellOutlined,
  HomeOutlined,
  RightOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Breadcrumb, Flex, Layout, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../../context/AuthProvider';
import { useNotif } from '../../context/NotifProvider';
import UserModal from '../../components/modal/ModalUser';
import NotifModal from '../../components/modal/ModalNotif';
import { INotification } from '../../types/schema';
import SideBar from '../../components/navbar/SideBar';



const { Header, Content, Footer } = Layout;

const DashbordLayout: React.FC = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { pathname } = useLocation()
  const [isUserModal, setIsUserModal] = useState<boolean>(false)
  const [isNotifModal, setIsNotifModal] = useState<boolean>(false)
  const { user } = useSession()
  const { notif } = useNotif()

  const handlerUserModal = () => {
    setIsUserModal(prev => !prev)
  }

  const handlerNotifModal = () => {
    setIsNotifModal(prev => !prev)
  }

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <SideBar />
      <Layout>
        <Header title='AbdiKos' style={{ padding: 0, background: colorBgContainer }} role='searchbox'>
          <Flex justify="flex-end"
            align='center'
            className='px-8'
          >
            <Flex
              gap={15}
              align='center'
            >
              <Avatar size={36} src={user?.profile} icon={!user?.profile ? <UserOutlined /> : false} onClick={handlerUserModal} />
              <span>{`${user?.first_name} ${user?.last_name || ""}`}</span>
              <Badge count={notif.filter((data: INotification) => !data.read).length}>
                <button onClick={handlerNotifModal}><BellOutlined className='text-xl ml-6' /></button>
              </Badge>
              <UserModal open={isUserModal} handlerOpen={handlerUserModal} />
              <NotifModal open={isNotifModal} handlerOpen={handlerNotifModal} />
            </Flex>
          </Flex>
        </Header>
        <Content style={{ margin: '0 12px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}
            separator={<RightOutlined />}
            items={pathname.split("/").map((path: string, i: number) => {
              const name = path.charAt(0).toUpperCase() + path.split("").slice(1).join("")
              const link = pathname.split("/").slice(0, i + 1).join("/")
              if (i === 0) {
                return {
                  title: <Link to={"/"}><HomeOutlined /></Link>,
                }
              }
              return {
                title: <Link to={link}>{name}</Link>,
              }
            })}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              maxHeight: "73vh",
              overflowY: "scroll"
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Made by Iqbal with
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashbordLayout;
