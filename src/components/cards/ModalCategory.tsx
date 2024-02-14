import { Input, Modal, Typography, message } from 'antd'
import React, { useState } from 'react'
import axiosPrivate from '../../libs/axios'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../libs/redux/store';
import useLoading from '../../hooks/useLoading';
import { fetchCategory } from '../../services/redux';
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { addcategory, removeCategory, updateCategory } from '../../libs/redux/slices/categorySlice';

interface LabelcategoryProps {
    id: string;
    name: string;
}
const LabelCatgeory: React.FC<LabelcategoryProps> = ({id, name}) => {

    const [category, setCategory] = useState(name || "")
    const dispatch = useDispatch<AppDispatch>()
    const {isLoading, setLoading} = useLoading()

    const handlerDelete = async (categoryId: string) => {
        try {
            setLoading("loading")
            const remove = await axiosPrivate.delete(`/api/category/${categoryId}`)
            if (remove.status === 200) {
                message.success("Success menghapus")
                dispatch(removeCategory(remove.data.result.id))
                setLoading("success")
            }
        } catch(e: any) {
            message.warning(e.response.data.errors)
            setLoading("error")
        }
    }

    const handlerUpdate = async () => {
        try {
            setLoading("loading")
            const update = await axiosPrivate.patch(`/api/category/${id}`, { name: category })
            if (update.status === 200) {
                message.success("Sukses update")
                dispatch(updateCategory(update.data.result))
                setLoading("success")
            }
        }catch(e: any) {
            message.warning(e.response.data.errors)
            setLoading("error")
        }
    }

    return (
        <div className='flex gap-3 items-center w-full justify-between' >
            <div className='relative group/field'>
                <input className='w-full  outline-none group-focus/field font-semibold' value={category} onChange={(e) => setCategory(e.target.value)} />
                <button 
                onClick={handlerUpdate} 
                disabled={isLoading === "loading"} 
                className='absolute invisible text-base group-focus-within/field:visible right-2 hover:text-green-500'><CheckCircleOutlined /></button>
            </div>
            <button
                onClick={() => handlerDelete(id)} 
                disabled={isLoading === "loading"}
                className='text-red-500 text-base'><DeleteOutlined /></button>
        </div>
    )
}

interface ModalcategoryProps {
    open: boolean;
    close: React.Dispatch<React.SetStateAction<boolean>>
}
interface CategoryProps {
    id: string;
    name: string;
}
const ModalCategory: React.FC<ModalcategoryProps> = ({ open, close }) => {

    const [category, setCategory] = useState("")
    const categoryList = useSelector((state: RootState) => state.category.data)
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, setLoading } = useLoading()


    const handlerAdd = async () => {
        try {
            setLoading("loading")
            const create = await axiosPrivate.post("/api/category", {
                name: category
            })
            if (create.status === 200) {
                message.success("Sukses menambahkan")
                dispatch(addcategory(create.data.result))
                setLoading('success')
                setCategory("")
            }
        } catch(e: any) {
            setLoading("error")
            message.warning(e.response.data.errors)
        }
    }

    return (
        <Modal
            open={open}
            onCancel={() => close(prev => !prev)}
            footer={false}
            width={350}
        >
            <div>
                <Typography.Title level={3}>
                    Daftar Kategori
                </Typography.Title>
                <div className='py-5 px-3 max-h-36 overflow-y-scroll scroll-pr-0'>
                    {
                        categoryList.length === 0 ?
                            <span>Kategori kosong</span> :
                            categoryList.map((category: CategoryProps) => (
                                <LabelCatgeory key={category.id} name={category.name} id={category.id} />
                            ))
                    }
                </div>
                <div className='flex gap-3'>
                    <Input placeholder='Tambah category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    <button
                        disabled={isLoading === "loading"}
                        className='px-3 py-1 bg-sky-400 rounded-md'
                        onClick={handlerAdd}>Tambah</button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalCategory
