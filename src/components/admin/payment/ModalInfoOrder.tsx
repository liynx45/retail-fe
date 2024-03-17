import { Modal, Typography } from 'antd';
import React, { SetStateAction } from 'react'
import { ITransaction } from '../../../types/schema';
import { ToggleOrder } from '../../../pages/admin/Payment/HistoryPayment';

type ModalInfoOrder = {
    data: ToggleOrder;
    onClose: React.Dispatch<SetStateAction<ToggleOrder>>;
}
const ModalInfoOrder: React.FC<ModalInfoOrder> = ({ data, onClose }) => {


    const trans = data.data;
    const room = trans && trans.rooms[0];
    const user = trans && trans.users;

    const getdate = (date: Date) => `${new Date(date).getDate()}-${new Date(date).getMonth() + 1}-${new Date(date).getFullYear()}`;

    return (
        <Modal
            footer={false}
            open={data.open}
            onCancel={() => onClose(pv => ({ ...pv, open: false }))}
        >
            <div>
                <Typography.Title level={3}>
                    Informasi Pemesanan
                </Typography.Title>
                <div className='my-5'>
                    <Typography.Title level={4} className='text-center'>
                        Pemesanan
                    </Typography.Title>
                    {
                        trans ? (
                            <>
                                <div className='flex w-full justify-between'>
                                    <div className='text-left flex flex-col'>
                                        <span>Code</span>
                                        <span>Tanggal</span>
                                        <span>Tanggal sewa</span>
                                        <span>Tanggal akhir</span>
                                        <span>Status</span>
                                        <span>Pesan</span>
                                        <span>Pembayaran</span>
                                        <span>Total</span>
                                        {
                                            trans.payment === "cash" && (
                                                <>
                                                    <span>Tunai</span>
                                                    <span>Kembalian</span>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className='text-right flex flex-col'>
                                        <span>{trans.code}</span>
                                        <span>{getdate(trans.date)}</span>
                                        <span>{getdate(trans.start_date)}</span>
                                        <span>{getdate(trans.expire)}</span>
                                        <span>{trans.status}</span>
                                        <span>{trans.message || "Tidak ada pesan"}</span>
                                        <span>{trans.payment}</span>
                                        <span>{trans.total_amount}</span>
                                        {
                                            trans.payment === "cash" && (
                                                <>
                                                    <span>{trans.cash || 0}</span>
                                                    <span>{trans.return || 0}</span>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        ) : (
                            <span>Tidak ada data</span>
                        )
                    }
                </div>
                <div className='w-full grid grid-cols-2 gap-12'>
                    {
                        room ? (
                            <div>
                                <Typography.Title level={4} className='text-center'>
                                    Ruang
                                </Typography.Title>
                                <div className='flex w-full justify-between'>
                                    <div className='flex flex-col text-left'>
                                        <span>Nama</span>
                                        <span>No</span>
                                        <span>Tipe</span>
                                        <span>Harga sewa</span>
                                        <span>Luas</span>
                                    </div>
                                    <div className='flex flex-col text-right'>
                                        <span>{room.room_info?.name}</span>
                                        <span>{room.no_room}</span>
                                        <span>{room.room_info?.type}</span>
                                        <span>{room.price}</span>
                                        <span>{`${room.room_info?.long}x${room.room_info?.wide}`}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <span>Tidak ada data</span>
                        )
                    }
                    {
                        user ? (
                            <div>
                                <Typography.Title level={4} className='text-center'>
                                    Pembeli
                                </Typography.Title>
                                <div className='flex justify-between w-full'>
                                    <div className='text-left flex flex-col'>
                                        <span>Username</span>
                                        <span>Nama</span>
                                        <span>Email</span>
                                        <span>Gender</span>
                                        <span>No Telepon</span>
                                    </div>
                                    <div className='flex flex-col text-right'>
                                        <span>{user.username}</span>
                                        <span>{user.user_info?.first_name}</span>
                                        <span>{user.email}</span>
                                        <span>Laki</span>
                                        <span>081226948593</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <span>Tidak ada data</span>
                        )
                    }
                </div>
            </div>
        </Modal>
    )
}

export default ModalInfoOrder
