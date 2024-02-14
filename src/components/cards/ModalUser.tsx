import { Flex, Image, Modal, message } from "antd"
import axiosPrivate from "../../libs/axios/index"
import { SettingOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import useLoading from "../../hooks/useLoading"
import { useUser } from "../../hooks/useUser"
import { userRole } from "../../utils"

const UserModal = ({
    open,
    handlerOpen
}: {
    open: boolean,
    handlerOpen: () => void
}) => {

    const navigate = useNavigate()
    const { isLoading, setLoading } = useLoading()
    const { status, user } = useUser()
    const role = userRole(user?.role!)


    const handlerLogout = async () => {
        setLoading("loading")
        try {
            const reqLogout = await axiosPrivate.delete("/auth/logout")
            if (reqLogout.status === 200) {
                message.success("you have been logout")
                window.localStorage.removeItem(process.env.REACT_APP_LOCAL_KEY!)
                window.localStorage.removeItem("_user")
                navigate("/")
                setLoading("success")
            }
        } catch (e) {
            setLoading("error")
            message.warning("error")
        }
    }

    return (
        <Modal
            onCancel={handlerOpen}
            open={open}
            style={
                {
                    top: "70px",
                    right: "-30%",
                    maxWidth: "280px",
                }
            }
            footer={false}
            mask={false}
        >
            <div
                className='w-[230px]  rounded-md flex flex-col justify-around items-center'
            >
                <Image
                    width={150}
                    height={150}
                    src={user?.profile || "/profile.jpg"}
                    alt=""
                    className="rounded-full object-cover mb-6" />
                <div className='flex flex-col gap-1 pt-6 justify-center items-center'>
                    <span className="text-slate-600">@{user?.username}</span>
                    <span>{user?.first_name} {user?.last_name}</span>
                    <span className={role?.class+"py-1 px-4"}>{role?.label}</span>
                    <div className="flex gap-2 w-full mt-6">
                        <button
                            onClick={() => handlerLogout()}
                            className="bg-sky-400 rounded-full w-[200px] px-6 py-2"
                            disabled={isLoading === "loading"}
                        >
                            {isLoading === "loading" ? "Loading" : "Sign Out"}
                        </button>
                        <Link
                            to={"/dashbord/setelan/user"}
                            className="bg-sky-400 rounded-full flex justify-center hover:text-slate-700 w-full"
                        >
                            <SettingOutlined />
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default UserModal
