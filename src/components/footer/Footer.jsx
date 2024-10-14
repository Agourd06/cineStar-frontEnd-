import React from 'react'
import FooterMenu from './FooterMenu'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-darker via-dark to-darker font-sans tracking-wide border-t border-border">
            <div className="py-12 px-12">
                <FooterMenu />

                <hr className="my-6 border-border" />

                <p className='text-center text-gray-300 text-base'>© CineStar. All rights reserved.</p>
            </div>
        </footer>
    )
}
