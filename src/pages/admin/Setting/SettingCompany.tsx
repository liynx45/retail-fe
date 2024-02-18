import React, { useEffect, useState } from 'react'
import { Cascader, Form, Input, InputNumber, Modal, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import useLoading from '../../../hooks/useLoading';
import axiosPrivate from '../../../libs/axios';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { RootState } from '../../../libs/redux/store';
import { updateCompany } from '../../../libs/redux/slices/companySlice';
import ModalUploadBanners from '../../../components/admin/Setting/Company/ModalUploadBanners';

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

const SettingCompany = () => {
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const [address, setAddress] = useState("")
    const [banner, setBanner] = useState(false)
    const [form] = Form.useForm()
    const {company} = useSelector((state: RootState) => state)
    const {isLoading, setLoading} = useLoading()
    const dispatch = useDispatch()

    const handleUpdate = async () => {
        const reqData = {
            name: form.getFieldValue("name"),
            address: address === "" ? undefined : address,
            about: form.getFieldValue("about"),
            phone: form.getFieldValue("phone"),
            email: form.getFieldValue("email"),
            owner: form.getFieldValue("owner")
        }
        setLoading("loading")
        try {
            const update = await axiosPrivate.post("/api/company", reqData)
            if (update.status === 200) {
                dispatch(updateCompany(update.data.result))
                message.success("Berhasil di rubah")
                setLoading("success")
                form.resetFields()
            }
        } catch(e: any) {
            setLoading("error")
            message.error(e.response.data.errors)
        }
    }

    const getAddress = async (prov: string, query: string) => {
        try {
            const response = await axios.get(`https://ibnux.github.io/data-indonesia/${prov}` + (query || ""));
            const data = response.data.map(({ id, nama }: { id: string, nama: string }) => ({ value: id, label: nama, children: [] }));
            return data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleAddress = async (data: string[]) => {
        switch (data.length) {
            case 1:
                const kab = await getAddress("kabupaten/", (data[0] + ".json"))
                if (kab) {
                    setFilteredOptions(filteredOptions.map((prov: Option) => {
                        if (prov.value === data[0]) {
                            return {
                                ...prov,
                                children: kab
                            }
                        } else {
                            return prov
                        }
                    }))
                }
                break;
            case 2:
                const kec = await getAddress("kecamatan/", (data[1] + ".json"))

                if (kec) {
                    setFilteredOptions(filteredOptions.map((prov: Option) => {
                        if (prov.value === data[0]) {
                            return {
                                ...prov,
                                children: prov.children?.map((kab: Option) => {
                                    if (kab.value === data[1]) {
                                        return {
                                            ...kab,
                                            children: kec
                                        }
                                    } else {
                                        return kab
                                    }
                                })
                            }
                        } else {
                            return prov
                        }
                    }))
                }
                break;
            case 3:
                const lurah = await getAddress("kelurahan/", (data[2] + ".json"))

                if (lurah) {
                    setFilteredOptions(filteredOptions.map((prov: Option) => {
                        if (prov.value === data[0]) {
                            return {
                                ...prov,
                                children: prov.children?.map((kab: Option) => {
                                    if (kab.value === data[1]) {
                                        return {
                                            ...kab,
                                            children: kab.children?.map((kec: Option) => {
                                                if (kec.value === data[2]) {
                                                    return {
                                                        ...kec,
                                                        children: lurah
                                                    }
                                                } else {
                                                    return kec
                                                }
                                            })
                                        }
                                    } else {
                                        return kab
                                    }
                                })
                            }
                        } else {
                            return prov
                        }
                    }))
                }
                break;
        }
    }

    const handleCascader = (data: any, vol: any) => {
        handleAddress(data)
        setAddress(vol.map((data: any) => (data.label)).join(", "));

    }

    useEffect(() => {
        const push = async () => {
            const get = await getAddress("provinsi.json", "");
            setFilteredOptions(get)
        }
        push()
    }, []);

    return (
        <div className='p-6 rounded-md mr-6 max-h-[55vh] overflow-y-scroll'>
            <Form
                onFinish={handleUpdate}
                layout='vertical'
                form={form}
            >
                <Form.Item
                    label="Nama"
                    name="name"
                >
                    <Input defaultValue={company.data.name} />
                </Form.Item>
                <Form.Item
                    label="Tentang"
                    name="about"
                >
                    <TextArea defaultValue={company.data.about} />
                </Form.Item>
                <div  className='w-full grid items-center gap-4 grid-cols-2'>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email"
                            }
                        ]}
                    >
                        <Input defaultValue={company.data.email} />
                    </Form.Item>
                    <Form.Item
                        label="Pemilik"
                        name="owner"
                    >
                        <Input defaultValue={company.data.owner} />
                    </Form.Item>
                </div>
                <div className='w-full grid items-center gap-4 grid-cols-2'>
                    <Form.Item
                        label="Kontak"
                        name="phone"
                    >
                        <InputNumber className='w-full' defaultValue={company.data.phone} />
                    </Form.Item>
                    <div>
                        <Form.Item
                        label="Banner">
                            <button onClick={() => setBanner(true)} type='button' className='px-4 py-1 w-full bg-sky-400 rounded-md'>Edit banner</button>
                        </Form.Item>
                        <ModalUploadBanners open={banner} onClose={setBanner} />
                    </div>
                </div>
                <Form.Item
                    label="Alamat"
                    name="address"
                >
                    <Cascader options={filteredOptions} onChange={handleCascader} placeholder="Please select" />
                </Form.Item>
                <button disabled={isLoading === "loading"} className='w-full bg-sky-400 py-1 rounded-md' type='submit'>Submit</button>
            </Form>
        </div>
    );
}

export default SettingCompany;

