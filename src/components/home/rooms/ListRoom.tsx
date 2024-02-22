import { MenuFoldOutlined } from "@ant-design/icons"
import { SetStateAction, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useSearchParams } from "react-router-dom"
import { RootState } from "../../../libs/redux/store"
import { ModalSearchRoom } from "./components"
import { Button, Checkbox, Form, Input, Select, Slider } from "antd"
import { ROOM_STATUS } from "../../../constants"

interface PaginationProps {
    children: React.ReactNode,
    setParams: React.Dispatch<SetStateAction<string>>,
    reload: () => void
}

const typeRoom = [
    "all",
    "man",
    "woman"
]

const ListRoom: React.FC<PaginationProps> = ({ children, reload, setParams }) => {

    const { rooms } = useSelector((state: RootState) => state)
    const [query] = Form.useForm()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1
    const take = searchParams.get("take") || 6
    const [toggle, setToggle] = useState(false)
    const { search } = useLocation()

    const handleChange = (name: string, value: string) => {
        searchParams.set(name, value)
        setSearchParams(searchParams)
        setToggle(!toggle)
    }

    const fromChange = () => {
        const queryStatus: number[] = query.getFieldValue("status_room") || []
        const queryType: string[] = query.getFieldValue("type") || []
        if (queryStatus.length >= 1) {
            searchParams.set("status", queryStatus.length >= 1 ? query.getFieldValue("status_room").join("%6") : '')
        } else {
            searchParams.delete("status")
        }
        if (queryType.length >= 1) {
            searchParams.set("type", queryType.length >= 1 ? query.getFieldValue("type").join("%6") : "")
        } else {
            searchParams.delete("type")
        }
        setSearchParams(searchParams)
        setToggle(!toggle)
    }

    const handleSlider = () => {
        query.getFieldValue("price") ? searchParams.set("price", query.getFieldValue("price").toString()) : searchParams.delete("price")
        query.getFieldValue("long") ? searchParams.set("long", query.getFieldValue("long").toString()) : searchParams.delete("long")
        query.getFieldValue("wide") ? searchParams.set("wide", query.getFieldValue("wide").toString()) : searchParams.delete("wide")
        setSearchParams(searchParams)
        setToggle(!toggle)
    }

    const handleSearch = (e: any) => {
        console.log(e);
        
    }

    const SelectSearch = <Select
        defaultValue={'name'}
        options={[
            { value: "name", label: "Nama" },
            { value: "no_room", label: "No Ruang" },
        ]}
        className="w-26"
    />

    useEffect(() => {
        if (+take >= 5) {
            searchParams.set("take", "6")
        }
        setParams(search)
    }, [toggle])

    return (
        <div>
            <div className="flex justify-between py-4 px-24 items-center shadow-md bg-slate-200 sticky top-0 z-40">
                <div className="flex justify-between gap-6 items-center">
                    <div>
                        <Input onChange={(e) => handleSearch(e)} addonBefore={SelectSearch} />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-6">
                    <div className="flex gap-4 items-center">
                        <span>Result</span>
                        <input
                            type="number"
                            onChange={(e) => handleChange("take", e.target.value.toString())}
                            className="border rounded-md outline-none w-12 pl-1"
                        />
                    </div>
                    <div>
                        Showing of {`${(+page === 1 ? 0 : +page * +take) === 0 ? 1 : +page === 1 ? 0 : +page * +take} - ${rooms.pagging.total_item - (+page === 1 ? 0 : +page * +take)}`} of {rooms.pagging.total_item} result
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-4 bg-slate-100 px-44">
                <Form
                    form={query}
                    onChange={fromChange}
                    className="w-[20%] p-6"
                >
                    <h3 className="text-2xl pb-6 font-semibold pt-1">Filter</h3>
                    <div className="flex flex-col">
                        <h4>Tipe Ruang</h4>
                        <div className="pt-4 pb-6">
                            <div className="grid grid-cols-2 pl-4">
                                <div className="flex flex-col justify-evenly">
                                    <label htmlFor="">Harga</label>
                                    <label htmlFor="">Lebar</label>
                                    <label htmlFor="">Panjang</label>
                                </div>
                                <div className="flex flex-col">
                                    <Form.Item name="price">
                                        <Slider
                                            min={100000}
                                            max={1000000}
                                        />
                                    </Form.Item>
                                    <Form.Item name={"wide"}>
                                        <Slider
                                            min={5}
                                            max={25}
                                        />
                                    </Form.Item>
                                    <Form.Item name={"long"}>
                                        <Slider
                                            min={5}
                                            max={25}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <button
                                onClick={handleSlider}
                                className="bg-sky-400 mx-2 rounded-md py-1 w-full my-3 text-white">Terapkan</button>
                        </div>
                        <h4>Status Ruang</h4>
                        <div className="grid grid-cols-2 pl-4 pt-4 pb-6">
                            <div className="flex flex-col justify-evenly">
                                {
                                    Object.keys(ROOM_STATUS).map((name) => (
                                        <label htmlFor="">{name.charAt(0) + name.split("").slice(1).join("").toLocaleLowerCase()}</label>
                                    ))
                                }
                            </div>
                            <Form.Item name="status_room">
                                <Checkbox.Group className="flex justify-evenly flex-col">
                                    {
                                        Object.values(ROOM_STATUS).map((status: number) => (
                                            <Checkbox name="status_room" value={status} />
                                        ))
                                    }
                                </Checkbox.Group>
                            </Form.Item>
                        </div>
                        <h4>Tipe Ruang</h4>
                        <div className="grid grid-cols-2 pl-4 pt-4 pb-6">
                            <div className="flex flex-col justify-evenly">
                                <label htmlFor="">Semua</label>
                                <label htmlFor="">Pria</label>
                                <label htmlFor="">Wanita</label>
                            </div>
                            <Form.Item name="type">
                                <Checkbox.Group className="flex justify-evenly flex-col">
                                    {
                                        typeRoom.map((type) => (
                                            <Checkbox name="type" value={type} />
                                        ))
                                    }
                                </Checkbox.Group>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
                <div className="w-[80%] grid grid-cols-3 gap-2 p-4">
                    {children}
                </div>
            </div>
            <div className="px-32 py-16">
                {
                    [Array(rooms.pagging.total_page)].map((_, i: number) => (
                        <div key={i}>
                            <button onClick={() => handleChange("page", (i + 1).toString())}>{i + 1}</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListRoom