import { Image, Modal, Typography, message } from 'antd'
import React, { SetStateAction, useEffect, useState } from 'react'
import axiosPrivate from '../../../../libs/axios';
import useLoading from '../../../../hooks/useLoading';
import { DeleteFilled, FileAddOutlined } from '@ant-design/icons';
import { IBannerCompany } from '../../../../types/schema';
import { useDispatch, useSelector } from 'react-redux';
import { removeBanner, updateBanner } from '../../../../libs/redux/slices/companySlice';
import { RootState } from '../../../../libs/redux/store';

interface ModalUploadbannersProps {
    open: boolean;
    onClose: React.Dispatch<SetStateAction<boolean>>
}
const ModalUploadBanners: React.FC<ModalUploadbannersProps> = ({ open, onClose }) => {

    const {company} = useSelector((state: RootState) => state)
    const { isLoading, setLoading } = useLoading()
    const dispatch = useDispatch()

    const handleRemove = async (id: string, i: number) => {
        setLoading("loading")
        try {
            const remove = await axiosPrivate.delete(`/api/company/banners/${id}`)
            if (remove.status === 200) {
                dispatch(removeBanner(id))
                setLoading("success")
                message.success("Berhasil menghapus")
            }
        } catch {
            setLoading("error")
        }
    }

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setLoading('loading')
            const reqData = new FormData()
            if (!e.target.files)
                return
            reqData.set("banner", e.target.files[0])
            const update = await axiosPrivate.post("/api/company/banners", reqData)
            if (update.status === 200) {
                dispatch(updateBanner(update.data.result))
                setLoading("success")
                message.success("Berhasil ditambahkan")
            }
        } catch {
            setLoading("error")
        }
    }

    return (
        <Modal
            open={open}
            onCancel={() => onClose(prev => !prev)}
            footer={false}
        >
            <div>
                <Typography.Title level={4}>
                    Update banner
                </Typography.Title>
                <div style={{ padding: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {
                        company.data.banner.map((img: IBannerCompany, index: number) => (
                            <div key={index} className='bg-slate-400 h-[100px] w-[100px] rounded-md relative flex flex-direction'>
                                <Image width={100} className='rounded-md absolute object-cover' height={100} src={img.url} />
                                {
                                    company.data.banner.length > 1 &&
                                    <button
                                        disabled={isLoading === "loading"}
                                        onClick={() => handleRemove(img.id, index)}
                                        className='absolute py-1 top-2 left-2 px-2 text-[12px] hover:bg-red-500/50 rounded-full bg-slate-400/50 text-white'
                                    >
                                        <DeleteFilled />
                                    </button>
                                }
                            </div>
                        ))
                    }
                    {
                        company.data.banner.length >= 6 ?
                            null :
                            <div className='w-[100px] h-[100px] border-2 rounded-md border-dashed border-slate-300 bg-slate-100 cursor-pointer flex justify-center hover:border-sky-400 items-center'>
                                <input
                                    accept=".png, .jpg, .jpeg"
                                    className='w-[100px] h-[100px] cursor-pointer relative opacity-0 after:bg-slate-600 after:w-[100px] after:h-[100px] '
                                    type="file"
                                    onChange={(e) => handleFile(e)}
                                    disabled={isLoading === "loading"}
                                />
                                <span className='absolute text-2xl text-slate-400 pointer-events-none'>
                                    <FileAddOutlined />
                                </span>
                            </div>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default ModalUploadBanners
