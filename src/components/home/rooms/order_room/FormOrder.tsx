import { Button, Form, Input } from 'antd'
import React from 'react'

const FormOrder = () => {
    return (
        <div>
            <div className='bg-slate-200 rounded-xl p-6 m-6'>
                <h4 className='text-xl font-semibold mb-8'>Informasi Pembeli</h4>
                <Form
                    layout='vertical'
                >
                    <Form.Item
                        label="Nama pembeli"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Jenis kelamin"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Alamat"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tanggal lahir"
                    >
                        <Input />
                    </Form.Item>
                    <Button>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default FormOrder
