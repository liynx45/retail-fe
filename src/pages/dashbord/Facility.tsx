import { Card, Pagination, Popconfirm, Table, TableColumnsType, message } from 'antd'
import React, { useEffect, useState } from 'react'
import axiosPrivate from '../../libs/axios';
import useLoading from '../../hooks/useLoading';
import { DeleteOutlined, EditOutlined, FolderOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import EditFacility from '../../components/cards/EditFacility';
import AddFacility from '../../components/cards/AddFacility';
import ModalCategory from '../../components/cards/ModalCategory';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../libs/redux/store';
import { removeFacility } from '../../libs/redux/slices/facilitySlice';
import { fetchfacility } from '../../services/redux';

export interface FacilityColumnProps {
  id: string;
  name: String;
  category: String;
  status: string,
  cost: number;
}

export interface FacilityDrawerprops {
  status: boolean;
  data?: {
    id: string;
    name: String;
    status: string,
    cost: number;
    category: {
      id: string;
      name: string;
    }
  }
}

export interface TotalProps {
  total_item: number;
  total_page: number
}
function Facility() {

  const [seacrhParams, setSearchParams] = useSearchParams()
  const { isLoading, setLoading } = useLoading()
  const [toggleOpen, setToggleOpen] = useState<FacilityDrawerprops>({
    status: false
  })
  const [toggleCatgeory, setToggleCategory] = useState(false)
  const { category, facility } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const page = seacrhParams.get("page") || 1
  const take = seacrhParams.get("take")

  const handlerDelete = async (req: string) => {
    try {
      setLoading("loading")
      const remove = await axiosPrivate.delete(`/api/facility/${req}`)
      if (remove.status === 200) {
        if (facility.data.length <= 1 && page) {
          seacrhParams.set("page", (+page - 1).toString())
          setSearchParams(seacrhParams)
          dispatch(fetchfacility(`?page=${+page - 1}&take=${take}`))
        }
        if (facility.pagging.total_page === +page) {
          dispatch(removeFacility(req))
        } else {
          dispatch(fetchfacility(`?page=${page}&take=${take}`))
        }
        setLoading("success")
        message.success("Sukses mengapus")
      }
    } catch (e: any) {
      message.error(e.response.data.errors)
      setLoading("error")
    }
  }
  
  const handlerOpen = (id?: string) => {
    const existing = facility.data.find((facility: any) => facility.id === id)
    setToggleOpen(prev => ({
      data: existing || prev.data,
      status: !prev.status
    }))
  }

  const column: TableColumnsType<FacilityColumnProps> = [
    {
      key: "id",
      dataIndex: "id",
      hidden: true
    },
    {
      key: "name",
      title: "name",
      dataIndex: "name"
    },
    {
      key: "status",
      title: "status",
      dataIndex: "status",
      render: (value, record, index) => (
        <div>
          <span
            style={
              value === "Tersedia" ? {
                background: "#bbf7d0",
                border: "1px solid #16a34a"
              } : {
                background: "#fecaca",
                border: "1px solid #ef4444"
              }
            }
            className=' rounded-md px-2 py-1'
          >{value}</span>
        </div>
      ),
    },
    {
      key: "category",
      title: "category",
      dataIndex: "category",
    },
    {
      key: "cost",
      title: "Perawatan",
      dataIndex: "cost"
    },
    {
      key: "action",
      title: "Action",
      render: (e, record) => (
        <div className='flex gap-4'>
          <Popconfirm
            okType='default'
            title="Apakah anda yankin ingin menghapus"
            className='bg-red-400 rounded-sm px-1 border hover:text-red-500 text-white hover:border hover:border-red-400 hover:bg-red-200 '
            onConfirm={() => handlerDelete(record.id)}
          >
            <button><DeleteOutlined /></button>
          </Popconfirm>
          <button
            className='bg-orange-400 rounded-sm px-1 border hover:text-orange-500 text-white hover:border hover:border-orange-400 hover:bg-orange-200 '
            onClick={() => handlerOpen(record.id)}
          >
            <EditOutlined />
          </button>
        </div>
      )
    }
  ]

  const changeItem = (e: any, i: any) => {
    seacrhParams.set("page", e)
    seacrhParams.set("take", i)
    setSearchParams(seacrhParams)
    dispatch(fetchfacility(`?page=${e}&take=${i}`))
  }

  useEffect(() => {
    dispatch(fetchfacility(""))
  }, [])

  return (
    <div className='flex gap-4'>
      <div className='w-[75%]'>
        <Table
          columns={column}
          dataSource={facility.data.map((data: any) => ({
            id: data.id,
            name: data.name,
            category: data.category?.name,
            cost: data?.cost === 0 ? "Setel biaya" : data.cost,
            status: data.status ? "Tersedia" : "Tidak tersedia"
          }))}
          pagination={false}
          loading={facility.status === "loading"}
        />
        <EditFacility key={new Date().getTime()} handlerOpen={handlerOpen} data={toggleOpen} />
        <Pagination
          disabled={isLoading === "loading"}
          className='mt-6'
          pageSizeOptions={[5, 10, 15, 25]}
          defaultPageSize={5}
          showSizeChanger
          onChange={changeItem}
          total={facility.pagging.total_item}
        />
      </div>
      <div className='w-[25%] flex gap-3 flex-col border rounded-md p-4 justify-between'>
        <AddFacility />
        <div className='border p-4 rounded-md h-full'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
              <span className='text-md'>Kategori</span>
              <div className='flex items-end gap-1'>
                <span className='text-xl'>{category.data.length}</span>
                <span><FolderOutlined /></span>
              </div>
            </div>
            <ModalCategory key={new Date().getTime()} open={toggleCatgeory} close={setToggleCategory} />
            <button onClick={() => setToggleCategory(prev => !prev)} className='px-4 py-1 bg-sky-400 rounded-md text-white'>Lihat</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Facility
