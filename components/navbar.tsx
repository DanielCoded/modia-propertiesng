"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("/")

  useEffect(() => {
    // Set active link based on current path
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname)
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const whatsappLink = `https://wa.me/2348039743274?text=${encodeURIComponent(
    "Hello Modia Properties, I'm interested in learning more about your properties. Can you help me?",
  )}`

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center relative z-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/116428749_150444476706619_5091404093001730072_n-removebg-preview-ByRF9g5S06sxPDyGyps3yHxXdVaZCb.png"
              alt="Modia Properties Logo"
              width={150}
              height={60}
              className={cn("w-auto transition-all duration-300", scrolled ? "h-10" : "h-12")}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-all duration-300 relative group",
                  scrolled ? "text-gray-800" : "text-white",
                  activeLink === link.href ? "opacity-100" : "opacity-80 hover:opacity-100",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-modia-red transition-all duration-300",
                    activeLink === link.href ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-5 py-2.5 rounded-md font-medium transition-all duration-300 border",
                scrolled
                  ? "bg-white text-black border-gray-200 hover:border-modia-red hover:text-modia-red"
                  : "bg-white text-black border-transparent hover:bg-white/90",
              )}
            >
              Contact Us
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className={cn("h-6 w-6 transition-all duration-300", scrolled ? "text-gray-800" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6 transition-all duration-300", scrolled ? "text-gray-800" : "text-white")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-0 bg-white/98 backdrop-blur-lg transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-2xl font-medium text-gray-800 transition-colors duration-300",
                activeLink === link.href ? "text-modia-red" : "hover:text-modia-red",
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-modia-red hover:bg-modia-red/90 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 inline-block"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  )
}

