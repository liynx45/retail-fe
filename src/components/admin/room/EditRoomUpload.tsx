import { DeleteFilled, FileAddOutlined } from "@ant-design/icons";
import { axiosPrivate } from "../../../libs/axios";
import { Image, message } from "antd";
import { useEffect, useState } from "react"
import { RoomEditProps, RoomType } from "../../../pages/admin/Rooms";

interface ImageProps {
    id: String;
    url: String;
    roomId: String
}
type RoomUploadProps = {
    drawerHandler: (data?: RoomType) => void,
    drawer: RoomEditProps
}
type LoadingProps = "loading" | "error" | "success" | "idle"
const EditRoomUpload: React.FC<RoomUploadProps> = ({ drawerHandler, drawer }) => {

    const [fileList, setFIleList] = useState<any[]>([])
    const [isLoading, setLoading] = useState<{ status: LoadingProps, index?: number }>({
        status: "idle"
    })

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files)
                return
            const fileImg = e.target.files[0]
            if (fileImg.size > 1024 * 1024)
                return message.warning("Ukuran terlalu besar")
            message.loading("loading")
            const data = new FormData()
            data.append("no_room", drawer.data?.no_room.toString()!)
            data.append("room", e.target.files[0])
            const upload = await axiosPrivate.post(`/api/rooms/${drawer.data?.id}/upload`, data)
            if (upload.status === 200) {
                message.success("Upload success")
                setFIleList([
                    ...fileList,
                    upload.data.result
                ])
            }
        } catch {
            message.error("Error upload file")
        }

    }

    const handleRemove = async (imageId: string, index: number) => {
        const roomId = drawer.data?.id
        try {
            setLoading({
                status: "loading",
                index: index
            })
            const data = {
                imageId: imageId
            }
            const reqDelete = await axiosPrivate.delete(`/api/rooms/${roomId}/upload`, {
                data: data
            })
            if (reqDelete.status === 200) {
                setFIleList(list => list.filter((file: ImageProps) => file.id !== imageId))
                setLoading({
                    status: "success",
                    index: undefined
                })
                message.success("success menghapus")
            }
        } catch {
            setLoading({
                status: "error",
                index: undefined
            })
            message.error("Error delete")
        }

    }


    useEffect(() => {
        const fetchImg = async () => {
            try {
                const img = await axiosPrivate.get(`/api/rooms/${drawer.data?.id}`)
                if (img.status === 200) {
                    setFIleList([...img.data.result.room_image])
                }
            } catch (e) {

            }
        }
        fetchImg()
    }, [])

    return (
        <div className='w-full flex flex-col h-[300px] justify-between'>
            <div className='flex flex-wrap w-full gap-3 '>
                {
                    fileList.map((img: any, index: number) => (
                        <div className='bg-slate-400 h-[100px] w-[100px] rounded-md relative flex flex-direction'>
                            <Image width={100} className='rounded-md absolute object-cover' height={100} src={img.url} />
                            {
                                fileList.length > 1 &&
                                <button
                                    disabled={index === isLoading.index}
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
                    fileList.length >= 6 ?
                        null :
                        <div className='w-[100px] h-[100px] border-2 rounded-md border-dashed border-slate-300 bg-slate-100 cursor-pointer flex justify-center hover:border-sky-400 items-center'>
                            <input
                                accept=".png, .jpg, .jpeg"
                                className='w-[100px] h-[100px] cursor-pointer relative opacity-0 after:bg-slate-600 after:w-[100px] after:h-[100px] '
                                type="file"
                                onChange={(e) => handleFile(e)}
                            />
                            <span className='absolute text-2xl text-slate-400 pointer-events-none'>
                                <FileAddOutlined />
                            </span>
                        </div>
                }
            </div>
        </div>
    )
}

export default EditRoomUpload