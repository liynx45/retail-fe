import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Form, Input } from 'antd'
import React from 'react'
import { useSession } from '../../../../context/AuthProvider'

const InfoMember = () => {

    const { user } = useSession()
    const _input_class = 'flex gap-2 items-center'

    return (
        <div className='my-5'>
            <h4 className='text-xl font-semibold my-2'>Informasi pembeli</h4>
            <div className='my-4 p-6 rounded-lg border'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <div className={_input_class}>
                            <span>Nama :</span>
                            <span>{user.first_name}</span>
                        </div>
                        <div className={_input_class}>
                            <span>Alamat :</span>
                            <span>Jepara, Jawa tengah Keliapucang wetan</span>
                        </div>
                        <div className={_input_class}>
                            <span>No :</span>
                            <span>081226948547</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <button>Ubah</button>
                        <span>|</span>
                        <button>Tambah</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoMember
