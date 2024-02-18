import { BellFilled } from "@ant-design/icons"
import { useNotif } from "../../context/NotifProvider"
import useLoading from "../../hooks/useLoading"
import axiosPrivate from "../../libs/axios"
import { Avatar, Badge, Drawer, List } from "antd"
import { INotification } from "../../types/schema"

const NotifModal = ({
    open,
    handlerOpen
}: {
    open: boolean,
    handlerOpen: () => void
}) => {

    const { isLoading, setLoading } = useLoading()
    const { notif, updateNotif, removeNotif } = useNotif()

    const handleRead = async (req: string) => {
        try {
            setLoading("error")
            const update = await axiosPrivate.patch(`/api/notif/${req}`, { read: true })
            if (update.status === 200) {
                updateNotif(update.data.result)
                setLoading('success')
            }
        } catch {
            setLoading("error")
        }
    }

    const handleRemove = async (req: string) => {
        try {
            setLoading("loading")
            const remove = await axiosPrivate.delete(`/api/notif/${req}`)
            if (remove.status === 200) {
                removeNotif(req)
                setLoading("success")
            }
        } catch {
            setLoading("error")
        }
    }

    const date = (dateString: Date) => {
        const date = new Date(dateString).getTime()
        const now = new Date().getTime()

        if (now - date > 1000 * 60 * 60 * 24) {
            return `${((now - date) / (1000 * 60 * 60 * 24)).toFixed(0)} Hari lalu`
        } else if (now - date > 1000 * 60 * 60) {
            return `${((now - date) / (1000 * 60 * 60)).toFixed(0)} Jam lalu`
        } else if (now - date > 1000 * 60) {
            return `${((now - date) / (1000 * 60)).toFixed(0)} Menit lalu`
        }
    }

    return (
        <Drawer
            title="Notifikasi"
            open={open}
            onClose={handlerOpen}
            footer={false}
            placement='right'
        >
            <div>
                <List
                    dataSource={notif}
                    renderItem={(item: INotification, index) => (
                        <List.Item
                            actions={[
                                <button disabled={isLoading === "loading"} onClick={() => handleRead(item.id)}>Tandai</button>,
                                <button disabled={isLoading === "loading"} onClick={() => handleRemove(item.id)}>Hapus</button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot={!item.read}>
                                        <Avatar icon={<BellFilled />} />
                                    </Badge>
                                }
                                title={
                                    <div className="flex flex-col">
                                        <span>Pemberitahuan</span>
                                        <span className="text-[10px] text-slate-400">{date(item?.send_at)}</span>
                                    </div>
                                }
                                description={item.message}
                                children={
                                    <div>
                                        <span>{date(item?.send_at)}</span>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </Drawer>
    )
}

export default NotifModal