import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../libs/redux/store';
import { fetchOrder } from '../../../services/redux';
import { Pagination, Popconfirm, Table, TableProps, message } from 'antd';
import { ITransaction } from '../../../types/schema';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { axiosPrivate } from '../../../libs/axios';
import { removeOrder } from '../../../libs/redux/slices/orderSlice';
import { statusPayment } from '../../../utils';
import { ModalInfoOrder } from '../../../components/admin/payment';

export interface ToggleOrder {
  open: boolean;
  data?: ITransaction;
}

const HistoryPayment: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { data, pagging, status } = useSelector((state: RootState) => state.order)
  const [toggle, setToggle] = useState<ToggleOrder>({
    open: false,
    data: undefined
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get("page") || 1
  const pageSize = searchParams.get("take") || 5

  const handlePagination = (page: number, pagesize: number) => {
    searchParams.set("page", page.toString())
    searchParams.set("take", pagesize.toString())
    setSearchParams(searchParams)
    dispatch(fetchOrder(window.location.search))
  }

  const handleRemove = async (req: string) => {
    try {
      const remove = await axiosPrivate.delete(`/api/orders/${req}`)
      if (remove.status === 200) {
        message.success("Success")
        if (pagging.total_page === +page) {
          dispatch(removeOrder(req))
        } else {
          handlePagination(+page, +pageSize)
        }
      }
    } catch (e: any) {
      message.warning(e.response.data.errors)
    }
  }

  useEffect(() => {
    dispatch(fetchOrder(""))
  }, [])

  const columns: TableProps<ITransaction>["columns"] = [
    {
      key: "code",
      dataIndex: "code",
      title: "Code"
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status Pembayaran",
      render: (value) => {
        const label = statusPayment(value)
        return (
          <span className={label?.class}>{label?.label}</span>
        )
      }
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Tanggal Pesan",
      render(value, record, index) {
        return (
          <span>{`${new Date(value).getDate()}-${new Date(value).getMonth() + 1}-${new Date(value).getFullYear()}`}</span>
        )
      }
    },
    {
      key: "start_date",
      dataIndex: "start_date",
      title: "Tanggal Sewa",
      render(value, record, index) {
        return (
          <span>{`${new Date(value).getDate()}-${new Date(value).getMonth() + 1}-${new Date(value).getFullYear()}`}</span>
        )
      }
    },
    {
      key: "expire",
      dataIndex: "expire",
      title: "Tanggal akhir",
      render(value, record, index) {
        return (
          <span>{`${new Date(value).getDate()}-${new Date(value).getMonth() + 1}-${new Date(value).getFullYear()}`}</span>
        )
      }
    },
    {
      key: "payment",
      dataIndex: "payment",
      title: "Pembayaran"
    },
    {
      key: "total_amount",
      dataIndex: "total_amount",
      title: "Total"
    },
    {
      key: "action",
      title: "Action",
      render: (e, record) => {
        return (
          <div className='flex gap-4' key={`actions-${record.id}`}>
            <Popconfirm
              okType='default'
              title="Apakah anda yankin ingin menghapus"
              onConfirm={() => handleRemove(record.id)}
              className='bg-red-400 rounded-sm px-1 border hover:text-red-500 text-white hover:border hover:border-red-400 hover:bg-red-200 '
              key={`delete-${record.id}`}
            >
              <button><DeleteOutlined /></button>
            </Popconfirm>
            <button onClick={() => setToggle({
              open: true,
              data: record
            })} className='bg-red-400 rounded-sm px-1 border hover:text-red-500 text-white hover:border hover:border-red-400 hover:bg-red-200 '>
              <EyeOutlined />
            </button>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <h1 className='text-xl font-semibold mb-6'>Riwayat Pembayaran</h1>
      <div>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          loading={status === "loading"}
        />
        <Pagination
          total={pagging.total_item}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20, 25]}
          onChange={handlePagination}
          defaultPageSize={5}
        />
        <ModalInfoOrder data={toggle} onClose={setToggle} />
      </div>
    </div>
  );
};

export default HistoryPayment;