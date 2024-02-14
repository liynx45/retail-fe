import { Button, Form, Input, InputNumber, Select, Typography, message } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'
import axiosPrivate from '../../libs/axios'
import { FacilityColumnProps, TotalProps } from '../../pages/dashbord/Facility'
import useLoading from '../../hooks/useLoading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../libs/redux/store';
import { addFacility } from '../../libs/redux/slices/facilitySlice';
import { useSearchParams } from 'react-router-dom';
import { fetchfacility } from '../../services/redux';

const AddFacility: React.FC = () => {

    const [form] = Form.useForm()
    const { isLoading, setLoading } = useLoading()
    const { category, facility } = useSelector((state: RootState) => state)
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch<AppDispatch>()

    const handlerAdd = async () => {
        const take = searchParams.get("take") || 5
        const page = searchParams.get("page") || 1
        try {
            const data = {
                name: form.getFieldValue("name"),
                categoryId: form.getFieldValue("category"),
                status: form.getFieldValue("status"),
                cost: form.getFieldValue("cost")
            }
            setLoading("loading")
            const create = await axiosPrivate.post("/api/facility", data)
            if (create.status === 200) {
                message.success("Sukses menambahkan fasilitas")
                if (facility.data.length < +take){
                    dispatch(addFacility(create.data.data))
                } else {
                    dispatch(fetchfacility(`?page=${+page + 1}&take=${take}`))
                }
                form.resetFields()
                setLoading("success")
            }
        } catch (e: any) {
            message.error(e.response.data.errors)
            setLoading("error")
        }
    }

    return (
        <div>
            <Form
                form={form}
                layout='vertical'
                onFinish={handlerAdd}
            >
                <Typography.Title className='py-2' level={3}>
                    Tambah Fasilitas
                </Typography.Title>
                <div className='grid grid-cols-2 gap-3 w-full'>
                    <Form.Item
                        name="name"
                        label="Name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="cost"
                        label="Perawatan"

                    >
                        <InputNumber className='w-full' />
                    </Form.Item>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <Form.Item
                        name="status"
                        label="Status"
                    >
                        <Select
                            placeholder="Pilih status"
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
                            options={category.data.map((data: { id: string, name: string }) => ({
                                label: data.name,
                                value: data.id
                            }))}
                        />
                    </Form.Item>
                </div>
                <Button disabled={isLoading === "loading"} className='w-full bg-sky-400 text-white font-bold' htmlType='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default AddFacility
