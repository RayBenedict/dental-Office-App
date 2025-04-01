import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const { token, backendUrl, userData, setUserData, } = useContext(AppContext)


    


    return userData && (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <img className='w-36 rounded' src={assets.profile_pic} alt="" />

            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none' />
            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                   
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default MyProfile