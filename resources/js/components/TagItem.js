import React, {useState} from 'react'
import {mutate} from "swr"
import {EditOutlined} from '@ant-design/icons'
import classNames from 'classnames'

import TagRemove from "./TagRemove"
import TagInput from "./TagInput"

const TagItem = ({tag}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    const handleSave = async value => {
        if (!!value) {
            await axios.put(`/api/tags/${tag.id}`, {name: value})

            mutate('/api/tags')
        }

        handleAfterSave()

    }

    const handleAfterSave = () => {
        setIsEditing(false)
        setIsFocus(false)
    }

    return (
        <div className={classNames('mr-2 mb-2', {'shadow-lg': isFocus})}>
            {!isEditing && (
                <div
                    className='z-10 flex items-center justify-between border border-purple-700 text-purple-700 px-4 py-2 rounded-sm'
                >
                    <div
                        onClick={() => setIsFocus(true)}
                    >
                        {tag.name}
                    </div>

                    {isFocus && (
                        <div className='ml-4'>
                            <div
                                className='fixed inset-0 w-full h-full z-0'
                                onClick={() => setIsFocus(false)}
                            />
                            <div className='flex items-center text-sm relative'>
                                <EditOutlined
                                    className='text-purple-400 hover:text-purple-700 cursor-pointer outline-none'
                                    onClick={() => setIsEditing(true)}
                                />
                                <TagRemove
                                    className='ml-2 inline-flex'
                                    tag={tag}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isEditing && (
                <TagInput
                    defaultValue={tag.name}
                    onSave={handleSave}
                    onBlur={handleAfterSave}
                />
            )}
        </div>
    )
}

export default TagItem
