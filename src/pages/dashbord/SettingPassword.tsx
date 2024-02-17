import { Button, Form, Input, InputNumber, Typography, message } from 'antd'
import React from 'react'
import axiosPrivate from '../../libs/axios'
import useLoading from '../../hooks/useLoading'
import { useSession } from '../../components/layouts/AuthProvider'

function SettingPassword() {

    const { user } = useSession()
    const [form] = Form.useForm()
    const { isLoading, setLoading } = useLoading()

    const handlerPass = async () => {
        const pass_1 = form.getFieldValue("new_pass")
        const pass_2 = form.getFieldValue("re_pass")
        const code = form.getFieldValue("code")
        if (pass_1 !== pass_2) {
            message.warning("Password tidak sama")
            return
        }
        try {
            setLoading("loading")
            const reqData: {
                current_password: string;
                new_password: string;
                code?: number
            } = {
                current_password: form.getFieldValue("current_pass"),
                new_password: form.getFieldValue("new_pass")
            }

            if (code !== null || code !== undefined) reqData.code = code

            const update = await axiosPrivate.patch(`/api/users/${user.username}/password`, reqData)
            if (update.status === 200) {
                message.success("Password berhasil di rubah")
                setLoading("success")
                form.resetFields()
            }
        } catch (e: any) {
            setLoading("error")
            message.warning(e.response.data.errors)
        }
    }

    const handlerCode = async () => {
        try {
            const get = await axiosPrivate.get(`/api/users/${user.username}/code`)
            if (get.status === 200) {
                message.success("Code verifikasi sudah dikirim")
            }
        } catch (error: any) {
            message.error(error.response.data.errors)
        }
    }

    return (
        <div className=' p-6 rounded-md mr-6'>
            <Typography.Title level={3}>
                Ubah Password
            </Typography.Title>
            <Form
                form={form}
                layout='vertical'
                className='w-[450px] mt-6'
                onFinish={handlerPass}
            >
                <Form.Item
                    label="Masukan password lama"
                    name="current_pass"
                >
                    <Input type='password' />
                </Form.Item>
                <Form.Item
                    label="Masukan baru"
                    name="new_pass"
                >
                    <Input type='password' />
                </Form.Item>
                <Form.Item
                    label="Ulangi password"
                    name="re_pass"
                >
                    <Input type='password' />
                </Form.Item>
                {
                    user.email ? (
                        <div
                            className='flex gap-4 items-center'
                        >
                            <Form.Item
                                label="Kode verifikasi"
                                name="code"
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <button
                                className='px-4 py-1 bg-sky-300 rounded-md h-fit'
                                onClick={handlerCode}
                                type='button'
                            >Dapatkan kode</button>
                        </div>
                    ) : null
                }
                <button disabled={isLoading === "loading"} className='py-1 bg-sky-400 rounded-md w-full tetx-white' type='submit'>Submit</button>
            </Form>
        </div>
    )
}

export default SettingPassword
