import { UploadOutlined } from '@ant-design/icons'
import { useLoading } from '../../../hooks'
import { axiosPrivate } from '../../../libs/axios'
import { Form, Input, Typography, message } from 'antd'
import React, { useRef, useState } from 'react'
import { useSession } from '../../../context/AuthProvider'

function SettingUser() {

    const { user, setUser } = useSession()
    const [form] = Form.useForm()
    const photo = useRef<HTMLInputElement>(null)
    const { isLoading, setLoading } = useLoading()
    const [profile, setProfile] = useState<string>("")

    const handleUser = async () => {
        try {
            setLoading("loading")
            const reqData = {
                first_name: form.getFieldValue("first_name") || user?.first_name,
                last_name: form.getFieldValue("last_name"),
                role: form.getFieldValue("role"),
                email: form.getFieldValue("email")
            }
            const update = await axiosPrivate.patch(`/api/users/${user?.username}`, reqData)
            if (update.status === 200) {
                setUser(prev => ({
                    ...prev,
                    username: update.data.result.username,
                    last_name: update.data.result.user_info.last_name,
                    first_name: update.data.result.user_info.first_name,
                    role: update.data.result.role,
                    profile: update.data.result.user_info.profile,
                }))
                if (reqData.email) {
                    setUser(prev => ({
                        ...prev,
                        email: update.data.result.email,
                        verify: false
                    }))
                }
                message.success("Sukses")
                setLoading("success")
                form.resetFields()
            }
        } catch (e: any) {
            message.warning(e.response.data.error)
            setLoading("success")
        }
    }


    const handleProfile = async () => {
        setLoading("loading")
        try {
            const reqData = new FormData()
            if (photo.current && photo.current.files) {
                if (photo.current.files.length === 0) {
                    setLoading("error")
                    return message.info("Masukan foto")
                }
                reqData.append("profile", photo.current.files[0])
                const update = await axiosPrivate.post(`/api/users/${user?.username}/profile`, reqData)
                if (update.status === 200) {
                    message.success("Sukses mengganti profile")
                    setLoading("success")
                    setUser(prev => ({
                        ...prev,
                        profile: update.data.result.profile
                    })) 
                }
            } else {
                message.warning("Masukan foto")
                setLoading("error")
            }

        } catch (e: any) {
            message.warning(e.response.data.errors)
            setLoading("error")
        }
    }

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const url = URL.createObjectURL(e.target.files[0]);
            setProfile(url)
        }
    }

    return (
        <div className='p-6 rounded-md mr-6'>
            <Typography.Title level={3} className='mb-4'>
                Ubah Profile
            </Typography.Title>
            <div className='flex gap-12 items-center'>
                <div className='flex flex-col gap-5 px-12 items-center justify-between h-full'>
                    <div className='relative group/profile'>
                        <img src={profile || user?.profile} className='w-[190px] group-hover:/profile:bg-slate-300/50 aspect-square object-cover rounded-full bg-sky-400' />
                        <label className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-3xl text-slate-400 z-30 pointer-events-none group-hover/profile:block hidden'>
                            <UploadOutlined />
                        </label>
                        <input
                            onChange={(e) => handlePhoto(e)}
                            className="absolute w-[190px] aspect-square z-20 cursor-pointer top-0 rounded-full opacity-0"
                            type="file"
                            ref={photo} />
                    </div>
                    <button disabled={isLoading === "loading"} onClick={handleProfile} className='w-full bg-sky-400 rounded-md py-1'>Ubah</button>
                </div>
                <Form
                    form={form}
                    onFinish={handleUser}
                    layout='vertical'
                >
                    <div>
                        <div className='flex justify-center gap-3 mt-6'>
                            <Form.Item
                                label="Nama Depan"
                                name="first_name"
                            >
                                <Input placeholder={user.first_name} />
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                label="Nama Belakang"
                            >
                                <Input placeholder={user.last_name} />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="email"
                            label="email"
                        >
                            <Input placeholder={user.email} />
                        </Form.Item>
                        <Form.Item
                            label="Alamat"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <button disabled={isLoading === "loading"} type='submit' className='w-full bg-sky-400 rounded-md py-1 '>Ubah</button>
                </Form>
            </div>

        </div>
    )
}

export default SettingUser
