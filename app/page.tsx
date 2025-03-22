"use client"

import { Navbar } from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneCall, Mail, MapPin, ArrowRight, Search, Home, Shield, Zap } from "lucide-react"
import PropertyCard from "@/components/property-card"
import { supabase } from "@/lib/supabase"
import type { PropertyType } from "@/lib/types"
import YouTubeEmbed from "@/components/youtube-embed"
import { useState, useEffect } from "react"

// Sample fallback data in case Supabase is not available
const fallbackProperties: PropertyType[] = [
  {
    id: "1",
    title: "5 Bedroom Detached Duplex with BQ",
    description: "Spacious 5 bedroom detached duplex with BQ in Kuje Home City",
    price: "2,000,000 Naira",
    location: { name: "Kuje Home City, Abuja" },
    size: "500Sqm",
    property_type: { name: "Detached Duplex" },
  },
  {
    id: "2",
    title: "4 Bedroom Detached Duplex",
    description: "Beautiful 4 bedroom detached duplex in a serene environment",
    price: "1,500,000 Naira",
    location: { name: "Kuje Home City, Abuja" },
    size: "400Sqm",
    property_type: { name: "Detached Duplex" },
  },
  {
    id: "3",
    title: "3 Bedroom Detached Bungalow",
    description: "Elegant 3 bedroom detached bungalow with modern finishes",
    price: "1,500,000 Naira",
    location: { name: "Kuje Home City, Abuja" },
    size: "400Sqm",
    property_type: { name: "Detached Bungalow" },
  },
  {
    id: "4",
    title: "3 Bedroom Detached Bungalow",
    description: "Premium 3 bedroom detached bungalow in Modia Estate",
    price: "5,000,000 Naira",
    location: { name: "Modia Estate Phase 4, Kurudu By Army Estate, Abuja" },
    size: "400Sqm",
    property_type: { name: "Detached Bungalow" },
  },
]

export default function HomePage() {
  const [properties, setProperties] = useState<PropertyType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*, location:locations(name), property_type:property_types(name)")
          .limit(8)

        if (error) {
          console.error("Error fetching properties:", error)
          setProperties(fallbackProperties)
        } else if (data && data.length > 0) {
          setProperties(data)
        } else {
          setProperties(fallbackProperties)
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error)
        setProperties(fallbackProperties)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
        <div className="container relative z-20 px-4 md:px-6 py-24 md:py-32 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your Dream Landed Property in Abuja
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Modia Properties offers premium landed property solutions across Abuja with a focus on quality and
              customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#properties">
                <Button className="bg-modia-red hover:bg-modia-red/90 text-white px-8 py-6 text-lg w-full sm:w-auto font-medium transition-all duration-300">
                  View Properties
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="bg-white text-black border-white hover:bg-white/90 hover:text-black px-8 py-6 text-lg w-full sm:w-auto font-medium transition-all duration-300"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Property Search Card */}
        <div className="absolute bottom-0 left-0 right-0 z-20 transform translate-y-1/2 px-4 hidden lg:block">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-6 max-w-4xl mx-auto border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <select className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-modia-red focus:border-modia-red">
                      <option>Any Location</option>
                      <option>Kuje Home City</option>
                      <option>Modia Estate Phase 4</option>
                      <option>KOKO Court Galadimawa</option>
                    </select>
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Property Type</label>
                  <div className="relative">
                    <select className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-modia-red focus:border-modia-red">
                      <option>Any Type</option>
                      <option>Detached Duplex</option>
                      <option>Semi Detached Duplex</option>
                      <option>Detached Bungalow</option>
                      <option>Semi Detached Bungalow</option>
                    </select>
                    <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price Range</label>
                  <div className="relative">
                    <select className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-modia-red focus:border-modia-red">
                      <option>Any Price</option>
                      <option>Under ₦5 Million</option>
                      <option>₦5M - ₦20M</option>
                      <option>₦20M - ₦50M</option>
                      <option>Above ₦50M</option>
                    </select>
                    <span className="absolute left-3 top-3 text-gray-400 font-medium">₦</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-modia-red hover:bg-modia-red/90 text-white h-12 transition-all duration-300">
                  <Search className="mr-2 h-5 w-5" /> Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="properties" className="w-full py-24 md:py-32 mt-16 lg:mt-0">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-2">
              EXCLUSIVE LISTINGS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Featured Landed Properties</h2>
            <p className="max-w-2xl text-gray-600 md:text-lg">
              Explore our handpicked selection of premium landed properties across Abuja's most sought-after locations
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-modia-red"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {properties.slice(0, 8).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/properties">
              <Button variant="outline" className="border-modia-red text-modia-red hover:bg-modia-red hover:text-white">
                View All Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full py-24 md:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
              PROPERTY VIDEOS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Properties</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Take a virtual tour of our premium estates and see what makes our properties special
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <YouTubeEmbed videoId="vi9Mz5Dqc1c" title="Modia Properties Video 1" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Kuje Home City Estate</h3>
                <p className="text-gray-600 mb-4">
                  Explore our beautiful estate development with premium plots ready for your dream home.
                </p>
                <Link href="/properties?location=kuje">
                  <Button
                    variant="outline"
                    className="w-full border-modia-red text-modia-red hover:bg-modia-red hover:text-white"
                  >
                    View Properties
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <YouTubeEmbed videoId="Y-kI7NXVhfA" title="Modia Properties Video 2" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Modia Estate Phase 4</h3>
                <p className="text-gray-600 mb-4">
                  Discover our newest development with modern infrastructure and premium plots.
                </p>
                <Link href="/properties?location=modia">
                  <Button
                    variant="outline"
                    className="w-full border-modia-red text-modia-red hover:bg-modia-red hover:text-white"
                  >
                    View Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estate View Section */}
      <section className="w-full py-24 md:py-32 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
              ESTATE OVERVIEW
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Estate Development</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explore our meticulously planned estate with modern infrastructure and amenities for comfortable living.
            </p>
          </div>

          <div className="aspect-[16/9] relative rounded-xl overflow-hidden shadow-xl mb-8">
            <Image src="/images/estate-view.png" alt="Estate View" fill className="object-cover" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Plots</h3>
              <p className="text-gray-600">
                Carefully selected plots with proper documentation and approvals, ready for immediate development.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Strategic Location</h3>
              <p className="text-gray-600">
                Located in prime areas of Abuja with easy access to major roads, schools, hospitals, and shopping
                centers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Environment</h3>
              <p className="text-gray-600">
                Gated community with 24/7 security, perimeter fencing, and modern surveillance systems for your peace of
                mind.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Modern Infrastructure</h3>
              <p className="text-gray-600">
                Enjoy modern amenities including electricity, water supply, drainage systems, and well-paved roads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-24 md:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
                ABOUT US
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Trusted Real Estate Consultant in Abuja</h2>
              <p className="text-gray-600 mb-6">
                At Modia Properties, we understand that buying a landed property is one of the most significant
                decisions you'll make. Our mission is to make your real estate journey smooth, transparent, and
                rewarding.
              </p>
              <p className="text-gray-600 mb-8">
                With years of experience in the Abuja real estate market, our team of dedicated professionals is
                committed to providing personalized service tailored to your unique needs and preferences.
              </p>
              <Link href="/about">
                <Button className="bg-modia-red hover:bg-modia-red/90 text-white">Learn More About Us</Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-modia-red rounded-tl-xl z-0" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-modia-red rounded-br-xl z-0" />
              <div className="relative z-10 bg-white p-4 shadow-xl rounded-xl">
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/estate-view.png"
                    alt="Modia Properties Estate"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-24 md:py-32 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-2">
              TESTIMONIALS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
            <p className="max-w-2xl text-gray-600 md:text-lg">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience with
              Modia Properties.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-bold">C{i}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Client {i}</h4>
                    <p className="text-sm text-gray-500">Property Buyer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Working with Modia Properties was a fantastic experience. Their team was professional, knowledgeable,
                  and made the entire process stress-free. I found my dream landed property thanks to their dedication."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-24 md:py-32 bg-gray-900 text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="inline-block bg-modia-red/20 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
                GET IN TOUCH
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-300 mb-8">
                Get in touch with our team to learn more about our landed properties or schedule a site visit. We're
                here to help you find your perfect property.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-modia-red/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-modia-red" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Our Office</h4>
                    <p className="text-gray-300">
                      Area 11, Suit A06, Al-maliha Commercial Complex, No2 Michila Street, Off Ahmadu Bello Way, Garki,
                      Abuja
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-modia-red/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-modia-red" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email Us</h4>
                    <a
                      href="mailto:modiapropertiesnigeria@gmail.com"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      modiapropertiesnigeria@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-modia-red/20 p-3 rounded-full">
                    <PhoneCall className="h-6 w-6 text-modia-red" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Call Us</h4>
                    <a href="tel:+2348039743274" className="text-gray-300 hover:text-white transition-colors">
                      +234 803 974 3274
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const firstName = formData.get("first_name")
                    const lastName = formData.get("last_name")
                    const email = formData.get("email")
                    const phone = formData.get("phone")
                    const message = formData.get("message")

                    const whatsappMessage = `
Hello Modia Properties,

I'd like to inquire about your landed properties.

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}

Thank you!
                    `

                    window.open(`https://wa.me/2348039743274?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="first_name" className="text-sm font-medium">
                        First name
                      </label>
                      <input
                        id="first_name"
                        name="first_name"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-modia-red"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last_name" className="text-sm font-medium">
                        Last name
                      </label>
                      <input
                        id="last_name"
                        name="last_name"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-modia-red"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-modia-red"
                      placeholder="johndoe@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-modia-red"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-modia-red min-h-[120px]"
                      placeholder="I'm interested in..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-modia-red hover:bg-modia-red/90 text-white py-3">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-950 text-white py-12">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/116428749_150444476706619_5091404093001730072_n-removebg-preview-ByRF9g5S06sxPDyGyps3yHxXdVaZCb.png"
                  alt="Modia Properties Logo"
                  width={150}
                  height={60}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-400">
                Your trusted real estate consultant in Abuja, providing premium landed property solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="text-gray-400 hover:text-white transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Properties</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/properties?location=kuje" className="text-gray-400 hover:text-white transition-colors">
                    Kuje Home City
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=modia" className="text-gray-400 hover:text-white transition-colors">
                    Modia Estate Phase 4
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=koko" className="text-gray-400 hover:text-white transition-colors">
                    KOKO Court Galadimawa
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-modia-red shrink-0 mt-0.5" />
                  <span className="text-gray-400">Area 11, Suit A06, Al-maliha Commercial Complex, Abuja</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-modia-red" />
                  <a
                    href="mailto:modiapropertiesnigeria@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    modiapropertiesnigeria@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneCall className="h-5 w-5 text-modia-red" />
                  <a href="tel:+2348039743274" className="text-gray-400 hover:text-white transition-colors">
                    +234 803 974 3274
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Modia Properties. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

