import React, { useContext, useEffect, useState } from 'react'
import UserTable from '../../components/admin/users/UserTable'
import SideBar from '../../components/admin/SideBar/SideBar'
import SideBarContext from '../../context/SideBarContext';
import AuthContext from '../../context/AuthContext';
import UserForm from '../../components/admin/users/UserForm';
import { AlertContext } from '../../App';
import { fetchData } from '../../components/fetchers/Fetch';
import RoomsTable from '../../components/admin/rooms/RoomsTable';

export default function UsersManage() {
    const { isSideBarVisible } = useContext(SideBarContext);
    const { client } = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)
    const [rooms, setRooms] = useState([])
    const Alert = useContext(AlertContext)
    const { token } = useContext(AuthContext)
    const [page, setPage] = useState(1);
    const [hasMoreRooms, setHasMoreRooms] = useState(true);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetchData(`admin/users/all?page=${page}`, 'GET', token);

                if (response.data.length === 0) {
                    setHasMoreRooms(false);
                } else {
                    setUsers((prevUsers) => [...prevUsers, ...response.data]);
                }

            } catch (error) {
                Alert('error', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUsers();
        }
    }, [token, page]);

    const handleShowMore = () => {
        if (hasMoreRooms) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    return (

        <div className='bg-dark min-h-screen flex'>
            <SideBar />
            <div
                className={`transition-all duration-300 text-white lg:ml-auto w-[89%] ml-auto sm:w-[94%] md:[95%] py-4  pr-4
                    ${isSideBarVisible ? 'xl:w-[84%] xl:opacity-100 xl:translate-x-0' : 'xl:w-[95%] xl:opacity-100 xl:-translate-x-1/5'}`}
            >
                <div className=" flex justify-between  pr-2">
                    <div className='flex items-center gap-8'>
                        <h1 className=' text-text md:text-5xl text-2xl font-extrabold py-1  pb-4'>Room Manage</h1>
                        <button onClick={() => { setToggle(true) }} className='px-5 py-3 rounded-lg border border-border bg-darker hover:bg-[#EEBB07] duration-700'>Add User</button>
                    </div>
                    <h1 className=' text-text md:text-4xl text-xl font-extrabold py-1'> {client.name}</h1>
                </div>
                <RoomsTable rooms={rooms} handleShowMore={handleShowMore} setRooms={setRooms} loading={loading} hasMoreUsers={hasMoreRooms}/>
                {/* {toggle && <UserForm setToggle={setToggle}  setUsers={setUsers}/>} */}

            </div>
        </div>
    )
}
