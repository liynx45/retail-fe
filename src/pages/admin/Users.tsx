import { Flex, Pagination, Popconfirm, Table, TableColumnsType, TableProps, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../libs/redux/store';
import { removeUser } from '../../libs/redux/slices/usersSlice';
import axiosPrivate from '../../libs/axios';
import useLoading from '../../hooks/useLoading';
import ModalEditUser from '../../components/modal/ModalEditUser';
import { IUser } from '../../types/schema';
import { fetchUsers } from '../../services/redux';
import { userRole } from '../../utils';

type OnChange = NonNullable<TableProps<IUser>['onChange']>
type Filters = Parameters<OnChange>[1]
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const Users = () => {

    const [filterSelect, setFilterSelect] = useState<Filters>({})
    const [sortSelect, setSortSelect] = useState<Sorts>({})
    const [isEditUser, setIsEditUser] = useState<{ status: boolean, user: IUser | null }>({
        status: false,
        user: null
    })
    const [searcParams, setSearchParams] = useSearchParams()
    const { users } = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, setLoading } = useLoading()
    const page = searcParams.get("page") || 1
    const take = searcParams.get("take") || 5


    const handleDeleteUser = async (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, username: string) => {
        try {
            setLoading("loading")
            const remove = await axiosPrivate.delete(`/api/users/${username}`)
            if (remove.status === 200) {
                setLoading("success")
                message.success("Sukses menghapus user")
                if (+page === users.pagging.total_page){
                    dispatch(removeUser(username))
                }else{
                    dispatch(fetchUsers(`?page=${page}&take=${take}`))
                }
            }
        } catch (e: any) {
            message.open({
                content: e.response.data.errors,
                type: "warning"
            })
            setLoading("error")
        }
    }

    const handleChange = (page: number, take: number) => {
        searcParams.set("page", page.toString())
        searcParams.set("take", take.toString())
        setSearchParams(searcParams)
        dispatch(fetchUsers(`?page=${page}&take=${take}`))
    }

    const handlerEditUser = (data?: any) => {
        setIsEditUser(prev => ({
            user: data?.username ? data : prev.user,
            status: !prev.status,
        }))
    }

    const columns: TableColumnsType<IUser> = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            hidden: true
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (value) => {
                return <span>{value || "Kosong"}</span>
            }
        },
        {
            title: "First Name",
            dataIndex: ["user_info", "first_name"],
            key: "first_name"
        },
        {
            title: "Last Name",
            dataIndex: ["user_info", "last_name"],
            key: "last_name",
            render: (value) => {
                return <span>{value || "Kosong"}</span>
            }
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            filters: [
                { text: "User", value: "user" },
                { text: "Pemilik", value: "pemilik" },
                { text: "Admin", value: "admin" }
            ],
            filteredValue: filterSelect.role || null,
            // onFilter: (value: any, record) => record.role.includes(value),
            ellipsis: true,
            render(value, record, index) {
                const result = userRole(value)
                return <span className={result?.class} >{result?.label}</span>
            },
        },
        {
            title: "Last Login",
            dataIndex: ["user_token", "login_at"],
            key: "login_at",
            // sorter: (a, b) => getTime(a.login_at) - getTime(b.login_at),
            ellipsis: true
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div
                    className='flex gap-4'
                >
                    <Popconfirm
                        okType='danger'
                        title="Apakah anda ingin menghapus?"
                        onConfirm={(e) => handleDeleteUser(e, record.username)}
                    >
                        <button
                            className='bg-red-400 rounded-sm px-1 text-white'
                            disabled={isLoading === "loading"}
                        >
                            <DeleteOutlined />
                        </button>
                    </Popconfirm>
                    <button
                        onClick={() => handlerEditUser(record)}
                        className='bg-orange-400 rounded-sm px-1 text-white'
                        disabled={isLoading === "loading"}
                    >
                        <EditOutlined />
                    </button>
                </div>
            )
        }
    ]

    useEffect(() => {
        dispatch(fetchUsers(""))
    }, [])

    return (
        <div>
            <Flex
                justify="flex-start"
                align='center'
                className='py-2'
            >
                <Typography.Title
                    level={2}>
                    Daftar User
                </Typography.Title>
            </Flex>
            <div
                className='overflow-auto'
            >
                <ModalEditUser key={new Date().getTime()} open={isEditUser} onClose={handlerEditUser}/>
                <Table
                    loading={users.status === "loading"}
                    columns={columns}
                    dataSource={users.data}
                    pagination={false}
                // onChange={handleChange}
                />
                <Pagination
                    onChange={handleChange}
                    className='py-2'
                    pageSize={5}
                    pageSizeOptions={[5, 10, 15, 20, 25]}
                    showSizeChanger
                    total={users.pagging.total_item}
                    disabled={users.status === "loading"}
                />
            </div>
        </div>
    )
}

export default Users
