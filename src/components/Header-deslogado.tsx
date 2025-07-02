"use client"

import Link from "next/link"

export default function HeaderDeslogado() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img src="/logopokemon.png" alt="Logo" className="h-14 w-auto drop-shadow-lg" />
        </Link>

        {/* BOTÃO LOGIN */}
        <div className="flex items-center">
          <Link href="/login">
            <button className="w-[150px] h-[45px] bg-gradient-to-r from-[#ffa45d] to-amber-500 text-white font-semibold rounded-full hover:from-[#ff9a47] hover:to-amber-600 transition-all duration-300 shadow-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
