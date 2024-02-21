import { ResultFetch } from "."
import { axiosPublic } from "../../libs/axios"

const getRoom = async <T>(query: string): Promise<ResultFetch<T>> => {
    try {
        const get = await axiosPublic.get(`/api/rooms${query}`)
        if (get.status === 200) {
            return {
                status: true,
                result: get.data.result as T
            }
        } else {
            return {
                status: false
            }
        }
    } catch {
        return {
            status: false
        }
    }
}

const getRoomById = async <T>(id: string): Promise<ResultFetch<T>> => {
    try {
        const get = await axiosPublic.get(`/api/rooms/${id}`)
        if (get.status === 200) {
            return {
                status: true,
                result: get.data.result as T
            }
        } else {
            return {
                status: true,
            }
        }
    } catch {
        return {
            status: false
        }
    }
}

export {
    getRoom,
    getRoomById
}