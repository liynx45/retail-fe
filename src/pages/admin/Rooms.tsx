import { Card, Flex, Modal, Pagination, Popconfirm, Space, Table, TableProps, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined, GlobalOutlined, HomeOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OptionProps } from 'antd/es/select';
import { AppDispatch, RootState } from '../../libs/redux/store';
import { columnRooms, statusRoom } from '../../utils/index';
import { fetchCategory, fetchRoom, fetchfacility } from "../../services/redux"
import { removeRooms } from '../../libs/redux/slices/roomSlice';
import Cards from '../../components/cards/Card';
import RoomEdit from '../../components/admin/room/EditRoom';
import { IRoom } from '../../types/schema';
import { axiosPrivate } from '../../libs/axios';

export interface RoomType {
    id: string;
    name: string;
    long: number;
    wide: number;
    no_room: number;
    desc: string;
    price: number;
    facility: OptionProps[];
    status: boolean;
    type: string | "all" | "man" | "woman";
}

export interface RoomEditProps {
    status: boolean;
    data?: RoomType
}

const Rooms = () => {

    const { rooms } = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()
    const [isDrawer, setIsDrawer] = useState<RoomEditProps>({
        status: false,
        data: undefined
    })
    const [facilityDrawer, setFacilityDrawer] = useState<{ status: boolean, data?: OptionProps[] }>({
        status: false,
        data: []
    })
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1
    const take = searchParams.get("take") || 5

    const handleDrawer = (data?: RoomType) => {
        setIsDrawer(prev => ({
            data: data ? data : prev.data,
            status: !prev.status
        }))
    }

    const handlerRemove = async (roomId: string) => {
        try {
            const reqDelete = await axiosPrivate.delete(`/api/rooms/${roomId}`)
            if (reqDelete.status === 200) {
                if (rooms.data.length <= 1) {
                    dispatch(fetchRoom(`?page=${+page - 1}&take=${take}`))
                } else {
                    dispatch(removeRooms(roomId))
                }
                message.success({
                    content: "Ruang berhasil di hapus"
                })
            }

        } catch (e: any) {
            message.warning({
                content: "Ruang gagal dihapus"
            })
        }
    }

    const handleFacility = (data?: OptionProps[]) => {
        setFacilityDrawer(prev => ({
            data: data ? data : prev.data,
            status: !prev.status
        }))
    }

    const columns: TableProps<RoomType>["columns"] = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
            hidden: true
        },
        {
            key: "name",
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Lebar",
            dataIndex: "wide",
            key: "wide"
        },
        {
            title: "Panjang",
            dataIndex: "long",
            key: "long"
        },
        {
            title: "No Ruang",
            dataIndex: "no_room",
            key: "no_room"
        },
        {
            title: "Harga",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Deskripsi",
            dataIndex: "desc",
            key: "desc"
        },
        {
            title: "Fasilitas",
            key: "fasilitas",
            render: (e, record) => (
                <div className='text-center' key={`facility-${record.id}`}>
                    <button
                        onClick={() => handleFacility(record.facility)}
                        className='text-md hover:bg-orange-400 hover:text-white bg-[#fed7aa] border-[#fb923c] border px-2 text-[#f97316] rounded-md'
                    >
                        <EyeOutlined />
                    </button>
                </div>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render(value, record, index) {
                const result = statusRoom(value)
                return <span key={`status-${record.id}`} className={result?.class} >{result?.label}</span>
            },
        },
        {
            title: "Tipe",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "Action",
            key: "action",
            render: (e, record) => (
                <div className='flex gap-4' key={`actions-${record.id}`}>
                    <Popconfirm
                        okType='default'
                        title="Apakah anda yankin ingin menghapus"
                        onConfirm={() => handlerRemove(record.id)}
                        className='bg-red-400 rounded-sm px-1 border hover:text-red-500 text-white hover:border hover:border-red-400 hover:bg-red-200 '
                        key={`delete-${record.id}`}
                    >
                        <button><DeleteOutlined /></button>
                    </Popconfirm>
                    <button
                        key={`edit-${record.id}`}
                        onClick={() => handleDrawer(record)}
                        className='bg-orange-400 rounded-sm px-1 border hover:text-orange-500 text-white hover:border hover:border-orange-400 hover:bg-orange-200 '
                    >
                        <EditOutlined />
                    </button>
                </div>
            )
        }
    ]

    const changePagination = (page: number, take: number) => {
        searchParams.set("page", page.toString())
        searchParams.set("take", take.toString())
        setSearchParams(searchParams)
        dispatch(fetchRoom(`?page=${page}&take=${take}`))
    }

    useEffect(() => {
        dispatch(fetchCategory())
        dispatch(fetchfacility("?all=true"))
        dispatch(fetchRoom(""))
    }, [])

    return (
        <div>
            <Flex
                gap={20}
            >
                <div className='flex flex-col gap-2'>
                    <div className='max-h-[60vh] overflow-y-scroll'>
                        <Table
                            className='w-[75%]'
                            columns={columns}
                            dataSource={rooms.data && rooms.data.map((room: IRoom) => columnRooms(room))}
                            pagination={false}
                            loading={rooms.status === 'loading'}
                            key={new Date().getTime()}
                        />
                    </div>
                    <Pagination
                        defaultPageSize={5}
                        pageSizeOptions={[5, 10, 15, 20, 25]}
                        showSizeChanger
                        onChange={changePagination}
                        total={rooms.pagging.total_item}
                    />
                </div>
                <RoomEdit key={Math.floor(Math.random() * 100)} drawerHandler={handleDrawer} drawer={isDrawer} />
                <Modal
                    open={facilityDrawer.status}
                    onCancel={() => handleFacility()}
                    footer={false}
                    key={new Date().getTime()}
                >
                    <div>
                        <Typography.Title level={4} className='pb-5'>
                            Daftar Fasilitas
                        </Typography.Title>
                        <div>
                            {
                                facilityDrawer.data?.length === 0 ?
                                    "Fasilitas tidak ada" :
                                    facilityDrawer.data?.map((data: OptionProps) => (
                                        <span
                                            className='py-1 px-3 mx-2 text-white font-semibold  bg-sky-400 rounded-md border'
                                        >
                                            {data.name}
                                        </span>
                                    ))
                            }
                        </div>
                    </div>
                </Modal>
                <Card className='w-[25%] overflow-y-scroll max-h-[65vh]'>
                    <Space
                        direction="vertical" size="middle" style={{ display: 'flex' }}
                    >
                        <Cards prefix={<GlobalOutlined />} title='Fasilitas' value={12}>
                            <ul>
                                <li>
                                    <Link to={"/dashboard/ruang/fasilitas"}>Lihat</Link>
                                </li>
                            </ul>
                        </Cards>
                        <Cards prefix={<HomeOutlined />} title='Total Kos' value={rooms.pagging.total_item} />
                    </Space>
                </Card>
            </Flex>
        </div>
    )
}

export default Rooms
