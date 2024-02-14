import React from "react"
import { IFacility, IRoom } from "../types/schema"
import { status_room, user_role } from "./code._status"

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
        case user_role.ADMIN:
            return {
                class: "text-orange-500 py-1 px-2 bg-orange-200 rounded-md border border-orange-400",
                label: "Admin"
            }
        case user_role.KASIR:
            return {
                class: "text-cyan-500 py-1 px-2 bg-cyan-200 rounded-md border border-cyan-400",
                label: "Kasir"
            }
        case user_role.MEMBER:
            return {
                class: "text-sky-500 py-1 px-2 bg-sky-200 rounded-md border border-sky-400",
                label: "Member"
            }

    }
}

const statusRoom = (code: number) => {
    switch (code) {
        case status_room.AVAILABLE:
            return {
                class: "text-green-500 py-1 px-2 bg-green-200 rounded-md border border-green-400",
                label: "Tersedia"
            }
        case status_room.MAINTANCE:
            return {
                class: "text-orange-500 py-1 px-2 bg-orange-200 rounded-md border border-orange-400",
                label: "Perawatan"
            }
        case status_room.PENDING:
            return {
                class: "text-sky-500 py-1 px-2 bg-sky-200 rounded-md border border-sky-400",
                label: "Pending"
            }
        case status_room.RENT:
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