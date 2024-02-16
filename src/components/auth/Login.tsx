import { Button, Form, Input, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';
import { encryptData } from '../../libs/crypto';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';


function Login() {

    const [form] = Form.useForm();
    const navigate = useNavigate()
    const { isLoading, setLoading } = useLoading()
    const { setStatus, setUser } = useUser()

    const submit = async () => {

        const username = form.getFieldValue("username")
        const password = form.getFieldValue("password")
        setLoading("loading")
        message.open({
            content: "Mohon tunggu",
            type: "loading"
        })

        try {
            setStatus("loading")
            const reqLogin = await axios.post("http://localhost:3001/auth/login", {
                username: username,
                password: password
            }, {
                withCredentials: true
            })
            if (reqLogin.status === 200) {
                window.localStorage.setItem(process.env.REACT_APP_LOCAL_KEY!, encryptData(reqLogin.data.accessToken))
                localStorage.setItem("_user", encryptData(JSON.stringify(reqLogin.data.user)))
                message.open({
                    content: "Success login",
                    type: "success"
                })
                setUser(reqLogin.data.user)
                setStatus("authorized")
                navigate("/dashbord")
                form.resetFields()
                setLoading("success")
            }
        } catch (err: any) {
            form.setFieldValue("password", "")
            setLoading("error")
            setStatus("unauthorized")
            message.open({
                content: err.response.data?.errors || "Error",
                type: "warning"
            })
        }
    }

    return (
        <div
            className='w-[400px] bg-slate-200 p-6 rounded-xl h-fit'
        >
            <Typography.Title level={3}>
                Login
            </Typography.Title>
            <Typography
                className='my-3 mb-6'
            >
                Please login to your account!
            </Typography>
            <Form
                layout="vertical"
                form={form}
                onFinish={submit}
                action='submit'
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
                    Don't have any account? <Link to={"/auth/register"}>Register</Link>
                </Typography>
                <Form.Item>
                    <Button
                        type="primary"
                        className='bg-sky-400 w-full'
                        htmlType='submit'
                        disabled={isLoading === "loading"}
                    >Login</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login
