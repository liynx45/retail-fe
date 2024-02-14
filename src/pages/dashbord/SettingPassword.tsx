import { Button, Form, Input, Typography, message } from 'antd'
import React from 'react'
import axiosPrivate from '../../libs/axios'
import { useUser } from '../../hooks/useUser'
import useLoading from '../../hooks/useLoading'
import { useSelector } from 'react-redux'
import { RootState } from '../../libs/redux/store'

function SettingPassword() {

    const { auth: {data}  } = useSelector((state: RootState) => state)
    const [form] = Form.useForm()
    const { isLoading, setLoading } = useLoading()

    const handlerPass = async () => {
        const pass_1 = form.getFieldValue("new_pass")
        const pass_2 = form.getFieldValue("re_pass")
        if (pass_1 !== pass_2) {
            message.warning("Password tidak sama")
            return
        }
        try {
            setLoading("loading")
            const reqData = {
                current_password: form.getFieldValue("current_pass"),
                new_password: form.getFieldValue("new_pass")
            }
            const update = await axiosPrivate.patch(`/api/users/${data?.username}/password`, reqData)
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
                <button disabled={isLoading === "loading"} className='py-1 bg-sky-400 rounded-md w-full tetx-white' type='submit'>Submit</button>
            </Form>
        </div>
    )
}

export default SettingPassword
