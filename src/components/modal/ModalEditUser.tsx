import useLoading from "../../hooks/useLoading"
import axiosPrivate from "../../libs/axios"
import { updateUser } from "../../libs/redux/slices/usersSlice"
import { AppDispatch } from "../../libs/redux/store"
import { Button, Flex, Form, Input, Modal, Select, Typography, message } from "antd"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { IUser } from "../../types/schema"
import { USER_ROLE } from "../../utils/codes"

const ModalEditUser = ({
    open,
    onClose
}: {
    open: { status: boolean, user: IUser | null },
    onClose: () => void
}) => {
    const [form] = Form.useForm()
    const { isLoading, setLoading } = useLoading()
    const dispatch = useDispatch<AppDispatch>()
    const [searchParams, setSearchParams] = useSearchParams()

    const updateData = async () => {
        setLoading("loading")
        message.open({
            content: 'Loading update user',
            type: "loading"
        })
        const data = {
            first_name: form.getFieldValue("first_name") || open.user?.user_info?.first_name,
            last_name: form.getFieldValue("last_name"),
            role: form.getFieldValue("role"),
            email: form.getFieldValue("email")
        }
        const update = await axiosPrivate.patch(`/api/users/${open.user?.username}`, data)
        if (update.status === 200) {
            message.open({
                content: "Success update",
            })
            setLoading("success")
            form.resetFields()
            dispatch(updateUser(update.data.result))
            onClose()

        } else {
            message.error("user failed update")
            setLoading("error")
        }
    }

    return (
        <Modal
            open={open.status}
            onCancel={onClose}
            footer={false}
            zIndex={10}
            mask={false}
        >
            <Typography.Title
                level={3}
                className='py-4'
            >
                Edit User
            </Typography.Title>
            <Form
                layout='vertical'
                onFinish={updateData}
                form={form}
                action="submit"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: "email"
                        }
                    ]}
                >
                    <Input defaultValue={open.user?.email!} />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                >
                    <Select
                        defaultValue={open.user?.role}
                        options={[
                            { label: "User", value: USER_ROLE.MEMBER },
                            { label: "Admin", value: USER_ROLE.ADMIN },
                            { label: "kasir", value: USER_ROLE.KASIR }
                        ]}
                    />
                </Form.Item>
                <Flex
                    justify='space-between'
                    gap={25}
                >
                    <Form.Item
                        label="First Name"
                        className='w-full'
                        name="first_name"
                    >
                        <Input defaultValue={open.user?.user_info?.first_name} />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        className='w-full'
                        name="last_name"
                    >
                        <Input defaultValue={open.user?.user_info?.last_name!} />
                    </Form.Item>
                </Flex>

                <Button
                    htmlType="submit"
                    className='bg-sky-400 text-white'
                    disabled={isLoading === "success"}
                >Submit</Button>
            </Form>
        </Modal>
    )
}

export default ModalEditUser