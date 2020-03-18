import React from 'react'
import useSWR from "swr"
import {LoadingOutlined} from '@ant-design/icons'

import TagNew from "./TagNew"
import TagItem from "./TagItem"
import {fetcher} from "../utils"

const TagList = () => {
    const {data: tags} = useSWR('/api/tags', fetcher)

    if (!tags) {
        return <div className='p-5'><LoadingOutlined/></div>
    }

    return (
        <div>
            <div className='flex flex-wrap px-2'>
                {tags.data.map(tag => (
                    <TagItem
                        key={`tags_${tag.id}`}
                        tag={tag}
                    />
                ))}
            </div>

            <TagNew/>
        </div>
    )
}

export default TagList
