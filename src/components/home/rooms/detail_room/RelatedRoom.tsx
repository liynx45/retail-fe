import React from 'react'
import { useFetch } from '../../../../hooks'
import { SearchResult } from '../../../../types/FetchResult'
import { IRoom } from '../../../../types/schema'
import CardRoom from '../../../cards/CardRoom'
import { Skeleton } from 'antd'

interface RelatedRoomProps {
    type: string;
}
const RelatedRoom: React.FC<RelatedRoomProps> = ({ type }) => {

    const { data, status } = useFetch<SearchResult<IRoom[]>>({
        type: 'public',
        method: "GET",
        url: "/api/rooms",
        params: {
            "type": type,
            "take": "6"
        }
    })

    return (
        <div>
            <h3 className='font-semibold my-6 mb-8'>Related Ruang</h3>
            <div className='grid grid-cols-3 gap-12'>
                {
                    status === "loading" ?
                        <Skeleton/> :
                        data?.result.result.map(data => (
                            <CardRoom key={data.id} data={data} />
                        ))
                }
            </div>
        </div>
    )
}

export default RelatedRoom
