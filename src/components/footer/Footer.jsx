import React from 'react'
import FooterMenu from './FooterMenu'

export default function Footer() {
    return (
        <footer class="bg-gradient-to-r from-darker via-dark to-darker font-sans tracking-wide border-t border-border">
            <div class="py-12 px-12">
                <FooterMenu />

                <hr class="my-6 border-border" />

                <p class='text-center text-gray-300 text-base'>© CineStar. All rights reserved.</p>
            </div>
        </footer>
    )
}
