import React, {useState} from 'react'
import {DeleteOutlined, LoadingOutlined} from "@ant-design/icons"
import classNames from 'classnames'
import {mutate} from "swr"

const TagRemove = ({tag, ...rest}) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)
        await axios.delete(`/api/tags/${tag.id}`)
        setIsLoading(false)

        mutate('/api/tags', tags => ({
            ...tags,
            data: tags.data.filter(t => t.id !== tag.id)
        }))
    }

    return (
        <div {...rest}>
            {!isLoading && (
                <DeleteOutlined
                    className='text-purple-400 hover:text-purple-700 cursor-pointer outline-none'
                    onClick={handleClick}
                />
            )}

            {isLoading && <LoadingOutlined/>}
        </div>
    )
}

export default TagRemove
