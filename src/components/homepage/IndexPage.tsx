import { Button, Typography } from 'antd'
import React from 'react'

function IndexHome() {
    return (
        <div
            className='grid grid-cols-2 items-center justify-center'
        >
            <div className='flex flex-col gap-6 pt-36 pb-36'>
                <Typography.Title>
                    Kos Abdi
                </Typography.Title>
                <Typography
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam illo architecto magni, eius consectetur tempore consequuntur dolor
                    laborum delectus. At, voluptatem architecto.
                </Typography>
                <Button
                    type='primary'
                    className='px-8 py-3 flex justify-center items-center rounded-full bg-orange-400 w-fit'
                >
                    Kontak Kami
                </Button>
            </div>
        </div>
    )
}

export default IndexHome
