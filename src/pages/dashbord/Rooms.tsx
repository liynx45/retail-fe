import { Card, Flex, Modal, Pagination, PaginationProps, Popconfirm, Space, Statistic, Table, TableColumnsType, TableProps, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, DownCircleTwoTone, EditOutlined, EyeOutlined, FastBackwardFilled, GlobalOutlined, HomeFilled, HomeOutlined, MenuFoldOutlined, UpCircleTwoTone } from '@ant-design/icons';
import axiosPrivate from '../../libs/axios/index'
import RoomEdit from '../../components/cards/EditRoom';
import Cards from '../../components/cards/Card';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../libs/redux/store';
import { fetchCategory, fetchRoom, fetchfacility } from '../../services/redux';
import { columnRooms, statusRoom } from '../../utils';
import { IRoom } from '../../types/schema';
import { IOptionProps } from '../../types/input';
import { removeRooms } from '../../libs/redux/slices/roomSlice';

export interface RoomType {
    id: string;
    name: string;
    long: number;
    wide: number;
    no_room: number;
    desc: string;
    price: number;
    facility: IOptionProps[];
    status: boolean;
    type: string | "all" | "man" | "woman";
}

export interface RoomEditProps {
    status: boolean;
    data?: RoomType
}

function Rooms() {

    const { rooms } = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()
    const [isDrawer, setIsDrawer] = useState<RoomEditProps>({
        status: false,
        data: undefined
    })
    const [facilityDrawer, setFacilityDrawer] = useState<{ status: boolean, data?: IOptionProps[] }>({
        status: false,
        data: []
    })
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1
    const take = searchParams.get("take") || 5

    const handlerDrawer = (data?: RoomType) => {
        setIsDrawer(prev => ({
            data: data ? data : prev.data,
            status: !prev.status
        }))
    }

    const handlerDelete = async (roomId: string) => {
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

    const handlerfacility = (data?: IOptionProps[]) => {
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
                        onClick={() => handlerfacility(record.facility)}
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
                        onConfirm={() => handlerDelete(record.id)}
                        className='bg-red-400 rounded-sm px-1 border hover:text-red-500 text-white hover:border hover:border-red-400 hover:bg-red-200 '
                        key={`delete-${record.id}`}
                    >
                        <button><DeleteOutlined /></button>
                    </Popconfirm>
                    <button
                        key={`edit-${record.id}`}
                        onClick={() => handlerDrawer(record)}
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
                            dataSource={rooms.data.map((room: IRoom) => columnRooms(room))}
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
                <RoomEdit key={Math.floor(Math.random() * 100)} drawerHandler={handlerDrawer} drawer={isDrawer} />
                <Modal
                    open={facilityDrawer.status}
                    onCancel={() => handlerfacility()}
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
                                    facilityDrawer.data?.map((data: IOptionProps) => (
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
                                    <Link to={"/dashbord/ruang/fasilitas"}>Lihat</Link>
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
