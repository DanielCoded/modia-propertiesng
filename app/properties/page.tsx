import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Home, ArrowRight, Mail, PhoneCall, Shield } from "lucide-react"
import PropertyCard from "@/components/property-card"
import { supabase } from "@/lib/supabase"
import type { PropertyType } from "@/lib/types"

async function getProperties(): Promise<PropertyType[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, location:locations(name), property_type:property_types(name)")

  if (error) {
    console.error("Error fetching properties:", error)
    return []
  }

  return data || []
}

async function getLocations() {
  const { data, error } = await supabase.from("locations").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching locations:", error)
    return []
  }

  return data || []
}

async function getPropertyTypes() {
  const { data, error } = await supabase.from("property_types").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching property types:", error)
    return []
  }

  return data || []
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const properties = await getProperties()
  const locations = await getLocations()
  const propertyTypes = await getPropertyTypes()

  // Get location filter from URL
  const locationFilter = searchParams.location as string | undefined

  // Filter properties if location is specified
  const filteredProperties = locationFilter
    ? properties.filter((property) => property.location?.name?.toLowerCase().includes(locationFilter.toLowerCase()))
    : properties

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 lg:pt-32 border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
        <div className="container relative z-20 px-4 md:px-6 py-12 md:py-20 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Discover Your Perfect Landed Property
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Browse our exclusive selection of premium plots across Abuja's most sought-after locations
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-6 items-end">
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <select className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-modia-red focus:border-modia-red">
                    <option value="">Any Location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name.toLowerCase()}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <div className="relative">
                  <select className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-modia-red focus:border-modia-red">
                    <option value="">Any Type</option>
                    {propertyTypes.map((type) => (
                      <option key={type.id} value={type.name.toLowerCase()}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
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
              <div className="w-full md:w-1/4">
                <Button className="w-full bg-modia-red hover:bg-modia-red/90 text-white h-12">
                  <Search className="mr-2 h-5 w-5" /> Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {locationFilter
                  ? `Landed Properties in ${locationFilter.charAt(0).toUpperCase() + locationFilter.slice(1)}`
                  : "All Available Landed Properties"}
              </h2>
              <p className="text-gray-600 mt-1">Showing {filteredProperties.length} plots of land</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="rounded-md border border-gray-300 py-1 px-3 text-sm focus:ring-modia-red focus:border-modia-red">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Home className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No properties found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We couldn't find any landed properties matching your search criteria. Try adjusting your filters or
                browse all properties.
              </p>
              <Button variant="outline" className="border-modia-red text-modia-red hover:bg-modia-red hover:text-white">
                View All Properties
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Estate View Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
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

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Plots</h3>
              <p className="text-gray-600">
                Carefully selected plots with proper documentation and approvals, ready for immediate development.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Strategic Location</h3>
              <p className="text-gray-600">
                Located in prime areas of Abuja with easy access to major roads, schools, hospitals, and shopping
                centers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-modia-red/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-modia-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Environment</h3>
              <p className="text-gray-600">
                Gated community with 24/7 security, perimeter fencing, and modern surveillance systems for your peace of
                mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
                  PERSONALIZED ASSISTANCE
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
                <p className="text-gray-600 mb-6">
                  Our team of real estate experts is ready to help you find your perfect landed property. Contact us
                  today for personalized assistance.
                </p>
                <div>
                  <Link
                    href={`https://wa.me/2348039743274?text=${encodeURIComponent(
                      "Hello Modia Properties, I'm interested in learning more about your available landed properties. Can you help me?",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-modia-red hover:bg-modia-red/90 text-white">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <Image src="/images/estate-view.png" alt="Estate View" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
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
                Your trusted real estate consultant in Abuja, providing premium property solutions.
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

