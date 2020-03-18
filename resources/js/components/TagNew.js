import React, {useState} from 'react'
import {mutate} from "swr"
import {PlusOutlined} from "@ant-design/icons"
import classNames from 'classnames'

import TagInput from "./TagInput"

const TagNew = () => {
    const [isEditing, setIsEditing] = useState(false)

    const handleSave = async value => {
        // 保存...
        if (!!value) {
            await axios.post('/api/tags', {
                name: value,
            })

            mutate('/api/tags')
        }

        setIsEditing(false)
    }

    return (
        <div className='border-0 border-t border-solid border-gray-200 p-2'>
            {!isEditing && (
                <div
                    className='inline-block px-4 py-2 border border-dashed border-gray-300 text-gray-600 cursor-pointer'
                    onClick={() => setIsEditing(true)}
                >
                    <PlusOutlined className='align-text-bottom mr-2'/>
                    New Tag
                </div>
            )}

            {isEditing && (
                <div className='relative inline-block'>
                    <TagInput
                        onSave={handleSave}
                        onBlur={() => setIsEditing(false)}
                    />
                </div>
            )}
        </div>
    )
}

export default TagNew
