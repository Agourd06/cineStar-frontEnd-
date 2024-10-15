import React, { useContext } from 'react';
import SideBar from '../../components/admin/SideBar/SideBar';
import SideBarContext from '../../context/SideBarContext';
import Statistiques from '../../components/admin/dashBoard/Statistiques';

export default function DashBoard() {
    const { isSideBarVisible } = useContext(SideBarContext);

    return (
        <div className='bg-dark min-h-screen flex'>
            <SideBar />
            <div
                className={`transition-all duration-300 text-white lg:ml-auto w-[89%] ml-auto sm:w-[94%] md:[95%] py-4  pr-4
                    ${isSideBarVisible ? 'xl:w-[84%] xl:opacity-100 xl:translate-x-0' : 'xl:w-[95%] xl:opacity-100 xl:-translate-x-1/5'}`}
            >
                <Statistiques />
            </div>
        </div>
    );
}
