import { Modal, Tabs, TabsProps } from 'antd'
import React from 'react'
import { RoomEditProps, RoomType } from '../../pages/dashbord/Rooms'
import EditRoomField from './EditRoomFields'
import EditRoomUpload from './EditRoomUpload'

type RoomEditCardProps = {
    drawerHandler: (data?: RoomType) => void,
    drawer: RoomEditProps
}
const RoomEdit: React.FC<RoomEditCardProps> = ({ drawerHandler, drawer }) => {
    const items: TabsProps['items'] = [
        {
            key: "1",
            label: "Ruang",
            children: <EditRoomField key={drawer.data?.id} drawerHandler={drawerHandler} drawer={drawer} />
        },
        {
            key: "2",
            label: "Gambar",
            children: <EditRoomUpload key={drawer.data?.id} drawerHandler={drawerHandler} drawer={drawer} />
        }
    ]

    return (
        <div>
            <Modal
                open={drawer.status}
                onCancel={() => drawerHandler()}
                title="Edit Ruang"
                footer={false}
                style={{
                    top: "40px"
                }}
                width={"750px"}
            >
                <Tabs defaultActiveKey='1' items={items} />
            </Modal>
        </div>
    )
}

export default RoomEdit
