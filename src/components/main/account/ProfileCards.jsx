import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function ProfileCards({ name, src, buttonLabel, onClick, profile }) {
    const { id } = profile
    const navigate = useNavigate()
    function startApp() {
        navigate('/browse')
    }
    return (
        <div onClick={() => {
            if (buttonLabel === 'Done') {
                onClick()
            } else {
                startApp()
                onClick(id)
            }
        }}
            className="relative h-[84px] w-[84px] md:h-[130px] md:w-[130px] text-center hover:text-white md:text-xl">
            <img
                className="rounded-md hover:outline mb-2 w-full h-full object-cover"
                src={src}
                alt={name}
            />
            {buttonLabel === 'Done' && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center opacity-100 hover:border-[3px] hover:border-[#888] rounded-md transition-opacity duration-300">
                    <FaEdit className="text-white text-2xl" />
                </div>
            )}
            <p>{name}</p>
        </div>
    )
}

export default ProfileCards