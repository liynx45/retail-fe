import { Button, Form, Input, InputNumber, Select, SelectProps, Space, message } from "antd"
import useLoading from "../../../hooks/useLoading"
import { axiosPrivate } from "../../../libs/axios"
import TextArea from "antd/es/input/TextArea"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../libs/redux/store"
import { updateRooms } from "../../../libs/redux"
import { IFacility } from "../../../types/schema"
import { RoomEditProps, RoomType } from "../../../pages/admin/Rooms"

type RoomEditFieldProps = {
    drawerHandler: (data?: RoomType) => void,
    drawer: RoomEditProps
}

const EditRoomField: React.FC<RoomEditFieldProps> = ({ drawerHandler, drawer }) => {

    const [form] = Form.useForm()
    const { isLoading, setLoading } = useLoading()
    const data = drawer.data
    const { facility } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()


    const handleUpdate = async () => {
        setLoading("loading")
        const reqData = {
            name: form.getFieldValue("name") ? form.getFieldValue("name") : data?.name,
            wide: form.getFieldValue("wide") ? form.getFieldValue("wide") : data?.wide,
            long: form.getFieldValue("long") ? form.getFieldValue("long") : data?.long,
            no_room: form.getFieldValue("no_room"),
            desc: form.getFieldValue("desc"),
            price: form.getFieldValue("price") ? form.getFieldValue("price") : data?.price,
            status: form.getFieldValue("status"),
            type: form.getFieldValue("type"),
            facility: form.getFieldValue("facility")
        }
        try {
            const reqUpload = await axiosPrivate.patch(`/api/rooms/${data?.id}`, reqData)
            if (reqUpload.status === 200) {
                setLoading("success")
                dispatch(updateRooms(reqUpload.data.data))
                message.open({
                    content: "Success",
                    type: "success"
                })
                form.resetFields()
                drawerHandler()
            }
        } catch (e: any) {
            setLoading('error')
            message.open({
                content: e.response.data.errors,
                type: "warning"
            })
        }
    }

    return (
        <Form
            layout='vertical'
            onFinish={handleUpdate}
            form={form}
        >
            <div
                className='grid grid-cols-2 gap-2'
            >
                <div className="flex flex-col justify-between">
                    <Space
                        className='grid grid-cols-2'
                    >
                        <Form.Item
                            label="Nama"
                            name="name"
                        >
                            <Input className='w-full' placeholder={data?.name} key={data?.name} />
                        </Form.Item>
                        <Form.Item
                            label="No Ruang"
                            name="no_room"
                        >
                            <InputNumber
                                defaultValue={data?.no_room}
                                className='w-full'
                                key={data?.no_room}
                            />
                        </Form.Item>
                    </Space>
                    <Form.Item
                        label="Fasilitas"
                        name="facility">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Pilih fasilitas"
                            optionLabelProp="label"
                            defaultValue={drawer.data?.facility}
                            options={facility.data.map((data: IFacility) => ({ value: data.id, label: data.name }))}
                        />
                    </Form.Item>
                    <Space
                        className='grid grid-cols-2'
                    >
                        <Form.Item
                            label="Lebar"
                            name="wide"
                        >
                            <InputNumber
                                defaultValue={data?.wide}
                                className='w-full'
                                key={data?.wide}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Panjang"
                            name="long"
                        >
                            <InputNumber
                                defaultValue={data?.long}
                                className='w-full'
                                key={data?.long}
                            />
                        </Form.Item>
                    </Space>
                </div>
                <div>
                    <Form.Item
                        label="Harga"
                        name="price"
                    >
                        <InputNumber
                            defaultValue={data?.price}
                            className='w-full'
                            key={data?.price}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Deskripsi"
                        name={"desc"}
                    >
                        <TextArea placeholder={data?.desc} key={data?.desc} />
                    </Form.Item>
                    <Space
                        className='grid grid-cols-2'
                    >
                        <Form.Item
                            label="Status"
                            name="status"
                        >
                            <Select
                                placeholder={data?.status}
                                options={[
                                    {
                                        label: "Tersedia",
                                        value: true
                                    }, {
                                        label: "Tidak Tersedia",
                                        value: false
                                    }
                                ]} />
                        </Form.Item>
                        <Form.Item
                            label="Tipe"
                            name="type"
                        >
                            <Select
                                placeholder={data?.type}
                                key={data?.type}
                                options={[
                                    {
                                        label: "Pria",
                                        value: "man"
                                    }, {
                                        label: "Wanita",
                                        value: "woman"
                                    }
                                ]} />
                        </Form.Item>
                    </Space>
                </div>
            </div>
            <button type='submit' className='bg-sky-400 rounded-md py-1 text-white w-full' disabled={isLoading === "loading"}>
                {isLoading === "loading" ? "Loading.." : "Submit"}
            </button>
        </Form>
    )
}

export default EditRoomField