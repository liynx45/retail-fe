import { MenuFoldOutlined } from "@ant-design/icons"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { RootState } from "../../../libs/redux/store"
import { ModalSearchRoom } from "./components"
import { Checkbox, Input, Select, Slider } from "antd"

interface PaginationProps {
    children: React.ReactNode
}

const ListRoom: React.FC<PaginationProps> = ({ children }) => {

    const { rooms } = useSelector((state: RootState) => state)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1
    const take = searchParams.get("take") || 5
    const form = useRef(null)

    const handlerSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(form.current!).forEach((val: any, i: string) => {
            if (val) {
                searchParams.set(i, val)
            }
            setSearchParams(searchParams)
        })
    }

    const handleChange = (name: string, value: string) => {
        searchParams.set(name, value)
        setSearchParams(searchParams)
    }

    useEffect(() => {
        setSearchParams(searchParams)
    }, [searchParams])

    const SelectSearch = <Select
        defaultValue={'name'}
        options={[
            { value: "name", label: "Nama" },
            { value: "no_room", label: "No Ruang" },
        ]}
        className="w-26"
    />

    return (
        <div>
            <div className="flex justify-between py-4 px-24 items-center shadow-md bg-slate-200 sticky top-0 z-40">
                <div className="flex justify-between gap-6 items-center">
                    <div>
                        <Input addonBefore={SelectSearch} />
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
                <div className="w-[20%] p-6">
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
                                    <Slider />
                                    <Slider />
                                    <Slider />
                                </div>
                            </div>
                            <button className="bg-sky-400 mx-2 rounded-md py-1 w-full my-3 text-white">Terapkan</button>
                        </div>
                        <h4>Status Ruang</h4>
                        <div className="grid grid-cols-2 pl-4 pt-4 pb-6">
                            <div className="flex flex-col justify-evenly">
                                <label htmlFor="">Tersedia</label>
                                <label htmlFor="">Pending</label>
                                <label htmlFor="">Disewa</label>
                            </div>
                            <div className="flex justify-evenly flex-col">
                                <Checkbox />
                                <Checkbox />
                                <Checkbox />
                            </div>
                        </div>
                        <h4>Tipe Ruang</h4>
                        <div className="grid grid-cols-2 pl-4 pt-4 pb-6">
                            <div className="flex flex-col justify-evenly">
                                <label htmlFor="">Semua</label>
                                <label htmlFor="">Pria</label>
                                <label htmlFor="">Wanita</label>
                            </div>
                            <div className="flex justify-evenly flex-col">
                                <Checkbox />
                                <Checkbox />
                                <Checkbox />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[80%] grid grid-cols-3 gap-2 p-4">
                    {children}
                </div>
            </div>
            <div>
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