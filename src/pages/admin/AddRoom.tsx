import useLoading from "../../hooks/useLoading";
import { AppDispatch, RootState } from "../../libs/redux/store"
import { fetchRoom, fetchfacility } from "../../services/redux"
import { Button, Card, Form, Input, InputNumber, Select, SelectProps, Space, Typography, Upload, UploadFile, UploadProps, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IFacility } from '../../types/schema'
import { ROOM_STATUS } from '../../constants/status_code'  
import axiosPrivate from '../../libs/axios'

const AddRoom: React.FC = () => {

  const [form] = Form.useForm()
  const { isLoading, setLoading } = useLoading()
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useDispatch<AppDispatch>()
  const { facility, rooms } = useSelector((state: RootState) => state)

  const ruleInput = {
    required: true,
    min: 3
  }

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList?.indexOf(file);
      const newFileList = fileList?.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList: fileList,
    listType: "picture-card",
  };

  const handleCreate = async () => {
    const formData = new FormData()

    setLoading("loading")
    const reqData: any = {
      name: form.getFieldValue("name"),
      wide: form.getFieldValue("wide"),
      long: form.getFieldValue("long"),
      no_room: form.getFieldValue("no_room"),
      desc: form.getFieldValue("desc"),
      price: form.getFieldValue("price"),
      status: form.getFieldValue("status"),
      type: form.getFieldValue("type"),
      cost: form.getFieldValue("cost"),
      facility: form.getFieldValue("facility")
    }

    Object.keys(reqData).forEach((key: string) => {
      formData.append(key, reqData[key])
    })

    fileList.forEach((file: any) => {
      formData.append("room", file)
    })

    try {
      const reqCreate = await axiosPrivate.post("/api/rooms", formData)
      if (reqCreate.status === 200) {
        message.open({
          content: "Ruang berhasil dibuat",
          type: "success"
        })
        form.resetFields()
        setFileList([])
        if (rooms.data.length <= 5) {
          dispatch(fetchRoom(""))
        }
        setLoading("success")
      }
    } catch (e: any) {
      message.open({
        content: e.response.data.errors,
        type: "warning"
      })
      setLoading("error")
    }
  }

  useEffect(() => {
    dispatch(fetchfacility("?all=true"))
  }, [])

  return (
    <div>
      <Form
        layout='vertical'
        form={form}
        onFinish={handleCreate}
      >
        <div
          className='flex flex-col gap-2'
        >
          <Typography.Title
            level={3}
          >
            Tambahkan Ruang
          </Typography.Title>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <Space
                className='grid grid-cols-2'
              >
                <Form.Item
                  label="Nama"
                  name="name"
                  rules={[
                    ruleInput
                  ]}
                >
                  <Input className='w-full' />
                </Form.Item>
                <Form.Item
                  label="No Ruang"
                  name="no_room"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <InputNumber
                    className='w-full'
                    min={1}
                  />
                </Form.Item>
              </Space>
              <Form.Item
                label="Fasilitas"
                name="facility">
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Pilih fasilitas"
                  optionLabelProp="label"
                  options={facility.data.map((data: IFacility) => ({
                    value: data.id,
                    label: data.name
                  }))}
                />
              </Form.Item>
              <Space
                className='grid grid-cols-2'
              >
                <Form.Item
                  label="Lebar"
                  name="wide"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <InputNumber
                  min={1}
                    className='w-full'
                  />
                </Form.Item>
                <Form.Item
                  label="Panjang"
                  name="long"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <InputNumber
                    className='w-full'
                    min={1}
                  />
                </Form.Item>
              </Space>
              <div className='grid grid-cols-2 w-full gap-3'>
                <Form.Item
                  label="Harga"
                  name="price"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <InputNumber
                    className='w-full'
                    min={1}
                  />
                </Form.Item>
                <Form.Item
                  label="Tipe"
                  name="type"
                >
                  <Select
                    options={[
                      {
                        label: "Pria",
                        value: "man"
                      }, 
                      {
                        label: "Wanita",
                        value: "woman"
                      },
                      {
                        label: "Semua",
                        value: "all"
                      }
                    ]} />
                </Form.Item>
              </div>
              <Form.Item
                label="Deskripsi"
                name={"desc"}
              >
                <TextArea />
              </Form.Item>
              <Space
                className='grid grid-cols-2'
              >
                <Form.Item
                  label="Status"
                  name="status"
                >
                  <Select
                    options={[
                      {
                        label: "Tersedia",
                        value: ROOM_STATUS.AVAILABLE
                      }, {
                        label: "Pemeliharaan",
                        value: ROOM_STATUS.MAINTANCE
                      },
                      {
                        label: "Pending",
                        value: ROOM_STATUS.PENDING
                      }, {
                        label: "Disewakan",
                        value: ROOM_STATUS.RENT
                      }
                    ]} />
                </Form.Item>
                <Form.Item
                  label="Perawatan"
                  name="cost"
                >
                  <InputNumber
                    className='w-full'
                  />
                </Form.Item>
              </Space>
            </div>
            <Card>
              <Typography.Title level={4}>
                Upload
              </Typography.Title>
              <Upload
                {...props}
              >
                {fileList.length >= 6 ? null : " + Upload"}
              </Upload>
            </Card>
          </div>
          <Button disabled={isLoading === "loading"} htmlType='submit' className='bg-sky-400 text-white' >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AddRoom
