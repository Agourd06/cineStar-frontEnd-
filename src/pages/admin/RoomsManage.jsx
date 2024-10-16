import React from 'react'
import SideBar from '../../components/admin/SideBar/SideBar'
import Table from '../../components/admin/users/UserTable'

export default function RoomsManage() {
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
                <Table />


            </div>
        </div>)
}
