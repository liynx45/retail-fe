import React from 'react'
import { useSession } from '../../../../context/AuthProvider'
import { Link } from 'react-router-dom'


const InfoMember: React.FC = () => {

    const { user } = useSession()
    const _input_class = 'flex gap-2 items-center';

    return (
        <div>
            <h4 className='text-xl font-semibold my-2'>Informasi pembeli</h4>
            <div className='my-4 p-6 shadow'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <div className={_input_class}>
                            <span>Nama :</span>
                            <span>{user.first_name}</span>
                        </div>
                        <div className={_input_class}>
                            <span>Alamat :</span>
                            <span>{user.address}</span>
                        </div>
                        <div className={_input_class}>
                            <span>No :</span>
                            <span>{user.phone}</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>

                        <Link
                            to={"/dashboard/setelan/user"}
                            className='py-1 px-4 bg-primary rounded-md text-white'
                        >
                            Ubah
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoMember
