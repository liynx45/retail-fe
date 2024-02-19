import React from "react"
import { ROOM_STATUS, USER_ROLE } from "../constants/status_code"
import { IFacility, IRoom } from "../types/schema"

const columnRooms = (req: IRoom) => {
    const result = {
        id: req.id,
        name: req.room_info?.name,
        wide: req.room_info?.wide,
        long: req.room_info?.long,
        no_room: req.no_room,
        desc: req.room_info?.desc === "undefined" ? "Kosong" : req.room_info?.desc,
        price: req.price,
        facility: req.facility.map((data: IFacility) => ({
            value: data.id,
            name: data.name
        })),
        status: req.status,
        type: req.room_info?.type
    }
    return result
}

const userRole = (code: number) => {
    switch (code) {
        case USER_ROLE.ADMIN:
            return {
                class: "text-orange-500 py-1 px-2 bg-orange-200 rounded-md border border-orange-400",
                label: "Admin"
            }
        case USER_ROLE.KASIR:
            return {
                class: "text-cyan-500 py-1 px-2 bg-cyan-200 rounded-md border border-cyan-400",
                label: "Kasir"
            }
        case USER_ROLE.MEMBER:
            return {
                class: "text-sky-500 py-1 px-2 bg-sky-200 rounded-md border border-sky-400",
                label: "Member"
            }
    }
}

const statusRoom = (code: number) => {
    switch (code) {
        case ROOM_STATUS.AVAILABLE:
            return {
                class: "text-green-500 py-1 px-2 bg-green-200 rounded-md border border-green-400",
                label: "Tersedia"
            }
        case ROOM_STATUS.MAINTANCE:
            return {
                class: "text-orange-500 py-1 px-2 bg-orange-200 rounded-md border border-orange-400",
                label: "Perawatan"
            }
        case ROOM_STATUS.PENDING:
            return {
                class: "text-sky-500 py-1 px-2 bg-sky-200 rounded-md border border-sky-400",
                label: "Pending"
            }
        case ROOM_STATUS.RENT:
            return {
                class: "text-red-500 py-1 px-2 bg-red-200 rounded-md border border-red-400",
                label: "Disewa"
            }
    }
}

export {
    columnRooms,
    statusRoom,
    userRole
}