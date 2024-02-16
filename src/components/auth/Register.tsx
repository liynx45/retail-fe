import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Typography, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosPrivate from "../../libs/axios/index"
import useLoading from '../../hooks/useLoading'
import axios from 'axios'
import { useUser } from '../../hooks/useUser'

function Register() {
    const [form] = Form.useForm()
    const { isLoading, setLoading } = useLoading()
    const navigate = useNavigate()
    const { status } = useUser()

    const registerHandler = async () => {
        setLoading("loading")
        const data = {
            username: form.getFieldValue("username"),
            first_name: form.getFieldValue("first_name"),
            last_name: form.getFieldValue("last_name"),
            email: form.getFieldValue("email"),
            password: form.getFieldValue("password")
        }

        try {
            const create = await axiosPrivate.post("/auth/register", data)
            if (create.status === 200) {
                message.open({
                    content: "Success create user",
                    type: "success"
                })
                setLoading("success")
                navigate("/auth/login")
            }

        } catch (err: any) {
            message.open({
                content: err.response.data.errors || "Eror request",
                type: "warning"
            })
            setLoading("error")
            form.resetFields()
        }
    }

    return (
        <div
            className='w-[400px] bg-slate-200 p-6 rounded-xl h-fit'
        >
            <Typography.Title level={3}>
                Register
            </Typography.Title>
            <Typography
                className='my-3 mb-6'
            >
                Create to your account!
            </Typography>
            <Form
                layout="vertical"
                form={form}
                onFinish={registerHandler}
                action='submit'
                className='p-0 m-0'
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={
                        [
                            {
                                min: 6,
                                required: true,
                                type: "string"
                            },
                        ]
                    }
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="input placeholder"
                    />
                </Form.Item>
                <Flex
                    align='center'
                    gap={5}
                >
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[
                            {
                                min: 3,
                                required: true,
                                type: "string"
                            }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='jhon'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                min: 3,
                                required: false
                            }
                        ]}
                        label="Last Name"
                        name="last_name"
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Dea'
                        />
                    </Form.Item>
                </Flex>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            required: false
                        }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder='jhoh@gmail.com'
                    />
                </Form.Item>
                <Form.Item
                    name={"password"}
                    label="Password"
                    rules={
                        [
                            {
                                min: 8,
                                required: true,
                                type: "string"
                            },
                        ]
                    }
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="input placeholder"
                    />
                </Form.Item>
                <Typography
                    className='mb-6'
                >
                    Have account? <Link to={"/auth/login"}>Login</Link>
                </Typography>
                <Form.Item>
                    <Button
                        type="primary"
                        className='bg-sky-400 w-full'
                        htmlType='submit'
                        disabled={isLoading === "loading"}
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
