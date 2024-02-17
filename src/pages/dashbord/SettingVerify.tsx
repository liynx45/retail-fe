import { Form, Input, InputNumber, Typography, message } from 'antd'
import React from 'react'
import axiosPrivate from '../../libs/axios'
import { Link } from 'react-router-dom'
import useLoading from '../../hooks/useLoading'
import { useSession } from '../../components/layouts/AuthProvider'

function SettingVerify() {

    const { user } = useSession()
    const [form] = Form.useForm()
    const { isLoading, setLoading } = useLoading()

    const handlerCode = async () => {
        setLoading("loading")
        try {
            const get = await axiosPrivate.get(`/api/users/${user?.username}/code`)
            if (get.status === 200) {
                message.success("Code verifikasi sudah dikirim")
                setLoading("success")
            }
        } catch (error: any) {
            message.error(error.response.data.errors)
            setLoading("error")
        }
    }

    const handlerVerify = async () => {
        const reqData = {
            code: form.getFieldValue("code"),
            email: form.getFieldValue("email")
        }
        setLoading("loading")
        try {
            const post = await axiosPrivate.post(`/api/users/${user.username}/verify`, reqData)
            if (post.status === 200) {
                user.verify = true
                setLoading("success")
                message.success("Akun berhasil diverifikasi")
            }
        } catch (e: any) {
            message.warning(e.response.data.errors)
            setLoading("error")
        }
    }

    return (
        <div className=' p-6 rounded-md mr-6'>
            <div>
                <Typography.Title level={3}>
                    Verifikasi
                </Typography.Title>
                {
                    user.verify ? (
                        <span>Email anda <span className='text-orange-400'>{user.email}</span> sudah terverifikasi</span>
                    ) : (
                        <Form
                            layout='vertical'
                            form={form}
                            onFinish={handlerVerify}
                        >
                            {
                                user.email ? (
                                    <div className='max-w-sm my-6'>
                                        <span>Email anda adalah <span className='text-orange-400'>{user.email}</span> silakan ganti jika terdapat kesalahan penulisan <Link className='text-sky-500' to={"/dashbord/setelan/user"}>ganti</Link></span>
                                    </div>
                                ) :
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input
                                            className='w-fit'
                                            placeholder="Silakan masukan email"
                                        />
                                    </Form.Item>
                            }
                            <div
                                className='flex gap-4 items-center'
                            >
                                <Form.Item
                                    label="Kode verifikasi"
                                    name="code"
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <button
                                    disabled={isLoading === "loading"}
                                    className='px-4 py-1 bg-sky-400 rounded-md h-fit'
                                    onClick={handlerCode}
                                    type='button'
                                >Dapatkan kode</button>
                            </div>
                            <button
                                disabled={isLoading === "loading"}
                                className='px-6 py-1 bg-sky-400 rounded-md'
                            >Verifikasi</button>
                        </Form>
                    )
                }
            </div>
        </div>
    )
}

export default SettingVerify
