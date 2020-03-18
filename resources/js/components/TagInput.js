import React, {useState, useEffect} from 'react'
import {LoadingOutlined} from "@ant-design/icons"

const TagInput = ({onBlur, onSave, afterSave, ...rest}) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        return () => {
            setIsLoading(false)
        }
    }, [])

    const handleKeyUp = async e => {
        const value = e.target.value

        if (e.keyCode === 13) {
            setIsLoading(true)
            await onSave(value)
            if (isLoading) {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className='relative block'>
            <input
                className='outline-none border border-purple-700 px-4 py-2 rounded-sm w-64'
                onKeyUp={handleKeyUp}
                onBlur={onBlur}
                autoFocus
                {...rest}
            />

            {isLoading && (
                <div
                    className='absolute'
                    style={{
                        right: 8,
                        top: 4,
                    }}
                >
                    <LoadingOutlined/>
                </div>
            )}
        </div>
    )
}

export default TagInput
