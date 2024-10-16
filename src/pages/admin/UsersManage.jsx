import React, { useContext } from 'react'
import UserTable from '../../components/admin/users/UserTable'
import SideBar from '../../components/admin/SideBar/SideBar'
import SideBarContext from '../../context/SideBarContext';
import AuthContext from '../../context/AuthContext';

export default function UsersManage() {
    const { isSideBarVisible } = useContext(SideBarContext);
    const { client } = useContext(AuthContext)
    
    return (

        <div className='bg-dark min-h-screen flex'>
            <SideBar />
            <div
                className={`transition-all duration-300 text-white lg:ml-auto w-[89%] ml-auto sm:w-[94%] md:[95%] py-4  pr-4
                    ${isSideBarVisible ? 'xl:w-[84%] xl:opacity-100 xl:translate-x-0' : 'xl:w-[95%] xl:opacity-100 xl:-translate-x-1/5'}`}
            >
                  <div className=" flex justify-between pr-2">
                    <h1 className=' text-text md:text-5xl text-2xl font-extrabold py-1  pb-4'>User Manage</h1>
                    <h1 className=' text-text md:text-4xl text-xl font-extrabold py-1'> {client.name}</h1>
                </div>
                <UserTable />

            </div>
        </div>
    )
}
