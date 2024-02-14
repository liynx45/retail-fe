import { MenuFoldOutlined } from "@ant-design/icons"

const PaginationRoom = () => {
    return (
        <div className="flex justify-between py-4 px-16 items-center shadow-md">
            <div className="flex justify-between gap-6">
                <div>
                    <span className="mr-6">Kategori</span>
                    <button><MenuFoldOutlined /></button>
                </div>
                <div>
                    showing od 1 - 8 of 12 result
                </div>
            </div>
            <div className="flex justify-between items-center gap-6">
                <div className="flex gap-4">
                    <span>result</span>
                    <input type="number" />
                </div>
                <div className="flex gap-2">
                    <span>Sort by</span>
                    <div>
                        <span>Select</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginationRoom