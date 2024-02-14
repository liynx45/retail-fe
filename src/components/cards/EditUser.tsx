import { Button, Flex, Form, Input, Modal, Select, Typography, message } from "antd"
import axiosPrivate from "../../libs/axios/index"
import useLoading from "../../hooks/useLoading"
import { IUser } from "../../types/schema"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../libs/redux/slices/usersSlice"
import { user_role } from "../../utils/code._status"
import { AppDispatch, RootState } from "../../libs/redux/store"
import { useSearchParams } from "react-router-dom"

const ModalEditUser = ({
    open,
    onClose,
    user
}: {
    open: { status: boolean, user: IUser | null },
    onClose: () => void,
    user: any
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
                            { label: "User", value: user_role.MEMBER },
                            { label: "Admin", value: user_role.ADMIN },
                            { label: "kasir", value: user_role.KASIR }
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