import useLoading from '../../../../hooks/useLoading';
import { axiosPrivate } from '../../../../libs/axios';
import { updateFacility } from '../../../../libs/redux';
import { RootState } from '../../../../libs/redux/store';
import { FacilityDrawerprops } from '../../../../pages/admin/Room/Facility';
import { Button, Form, Input, InputNumber, Modal, Select, Typography, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';

interface EditFacilityProps {
    handleOpen: () => void;
    data?: FacilityDrawerprops
}
const EditFacility: React.FC<EditFacilityProps> = ({ handleOpen, data }) => {

    const [form] = Form.useForm()
    const { isLoading, setLoading } = useLoading()
    const dispatch = useDispatch()
    const { category } = useSelector((state: RootState) => state)

    const handleUpdate = async () => {
        try {
            const reqData = {
                name: form.getFieldValue("name") || data?.data?.name,
                categoryId: form.getFieldValue("category") || data?.data?.category.id,
                cost: +form.getFieldValue("cost") || data?.data?.cost,
                status: form.getFieldValue("status") ? form.getFieldValue("status") : data?.data?.status === "Tersedia" ? true : false
            }
            setLoading("loading")
            const edit = await axiosPrivate.patch(`/api/facility/${data?.data?.id}`, reqData)
            if (edit.status === 200) {
                message.success("Sukses edit fasilitas")
                dispatch(updateFacility(edit.data.data))
                handleOpen()
                setLoading("success")
            }
        } catch (e: any) {
            message.error(e.response.data.errors)
            setLoading("error")
        }
    }

    return (
        <Modal
            open={data?.status}
            onCancel={handleOpen}
            footer={false}
            key={data?.data?.id}
        >
            <Form
                layout='vertical'
                form={form}
                onFinish={handleUpdate}
                key={data?.data?.id}
            >
                <Typography.Title className='py-2' level={3}>
                    Edit Fasilitas
                </Typography.Title>
                <div className='grid grid-cols-2 gap-3'>
                    <Form.Item
                        name="name"
                        label="Name"
                    >
                        <Input defaultValue={data?.data?.name as string} />
                    </Form.Item>
                    <Form.Item
                        name="cost"
                        label="Perawatan"
                    >
                        <InputNumber className='w-full' defaultValue={data?.data?.cost} />
                    </Form.Item>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <Form.Item
                        name="status"
                        label="Status"
                    >
                        <Select
                            placeholder="Pilih status"
                            defaultValue={data?.data?.status}
                            options={[
                                {
                                    label: "Tersedia",
                                    value: true
                                },
                                {
                                    label: "Tidak tersedia",
                                    value: false
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Kategori"
                    >
                        <Select
                            placeholder="Pilih kategori"
                            defaultValue={data?.data?.category.id}
                            options={category.data.map((data: any) => ({
                                label: data.name,
                                value: data.id
                            }))}
                        />
                    </Form.Item>
                </div>
                <Button disabled={isLoading === "loading"} className='w-full bg-sky-400' htmlType='submit'>Submit</Button>
            </Form>
        </Modal>
    )
}

export default EditFacility
