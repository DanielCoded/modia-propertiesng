import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { PhoneCall, Mail, MapPin, ArrowRight, Bed, Bath, Maximize2, Check, Share2, Users } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { PropertyType } from "@/lib/types"

async function getProperty(id: string): Promise<PropertyType | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, location:locations(name), property_type:property_types(name)")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching property:", error)
    return null
  }

  return data
}

async function getSimilarProperties(locationId: string, currentId: string): Promise<PropertyType[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, location:locations(name), property_type:property_types(name)")
    .eq("location_id", locationId)
    .neq("id", currentId)
    .limit(3)

  if (error) {
    console.error("Error fetching similar properties:", error)
    return []
  }

  return data || []
}

// Function to determine which image to use based on property type
function getPropertyImage(property: PropertyType) {
  if (property.property_type?.name?.toLowerCase().includes("bungalow")) {
    return "/images/bungalow.png"
  } else if (property.property_type?.name?.toLowerCase().includes("semi detached duplex")) {
    return "/images/semi-detached-duplex.png"
  } else if (property.property_type?.name?.toLowerCase().includes("duplex")) {
    // Alternate between the two duplex images
    return property.id.charCodeAt(0) % 2 === 0 ? "/images/duplex-1.png" : "/images/duplex-2.png"
  }
  // Default image if type doesn't match
  return "/images/duplex-1.png"
}

// Get property type label
function getPropertyTypeLabel(property: PropertyType) {
  const type = property.property_type?.name || "Property"
  return `Landed Property for ${type}`
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    notFound()
  }

  const similarProperties = await getSimilarProperties(property.location_id, property.id)

  // Format price for display
  const formattedPrice =
    typeof property.price === "number"
      ? new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 0,
        }).format(property.price)
      : property.price

  // WhatsApp message
  const whatsappMessage = `
Hello Modia Properties,

I'm interested in the landed property for ${property.property_type?.name}: ${property.title} (${formattedPrice}) in ${property.location?.name}.

Could you provide more information about this property?

Thank you!
  `

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Property Detail */}
      <main className="flex-1 pt-20">
        {/* Property Images */}
        <section className="relative">
          <div className="h-[40vh] md:h-[60vh] relative">
            <Image
              src={getPropertyImage(property) || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="container px-4 md:px-6 relative -mt-24 z-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-modia-red/10 text-modia-red text-sm font-medium rounded-full">
                      {getPropertyTypeLabel(property)}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {property.location?.name || "Abuja"}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{property.title}</h1>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-modia-red">{formattedPrice}</div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-modia-red/10 flex items-center justify-center">
                    <Bed className="h-5 w-5 text-modia-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Planned Bedrooms</p>
                    <p className="font-semibold">{property.bedrooms || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-modia-red/10 flex items-center justify-center">
                    <Bath className="h-5 w-5 text-modia-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Planned Bathrooms</p>
                    <p className="font-semibold">{property.bathrooms || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-modia-red/10 flex items-center justify-center">
                    <Maximize2 className="h-5 w-5 text-modia-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plot Size</p>
                    <p className="font-semibold">{property.size}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Description</h2>
                    <p className="text-gray-600">
                      {property.description ||
                        `
                        This premium landed property is perfect for building your dream ${property.property_type?.name} in ${property.location?.name}, Abuja. 
                        With a spacious layout of ${property.size}, this property offers an excellent opportunity to create your ideal home in one of 
                        Abuja's most sought-after locations. The plot is ready for development with all necessary approvals in place.
                      `}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Estate View</h2>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image src="/images/estate-view.png" alt="Estate View" fill className="object-cover" />
                    </div>
                    <p className="text-gray-600 mt-4">
                      This landed property is part of our premium estate development, featuring well-planned
                      infrastructure, security, and modern amenities.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Features</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Ready for Development",
                        "Secure Estate",
                        "Good Road Network",
                        "Perimeter Fencing",
                        "Electricity Infrastructure",
                        "Water Supply System",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-modia-red" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4">Location</h2>
                    <div className="h-64 bg-gray-200 rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-gray-400" />
                        <span className="ml-2 text-gray-500">{property.location?.name}, Abuja</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                    <h3 className="text-lg font-bold mb-4">Interested in this landed property?</h3>
                    <p className="text-gray-600 mb-6">
                      Contact us now to schedule a site visit or get more information about this property.
                    </p>
                    <div className="space-y-4">
                      <a
                        href={`https://wa.me/2348039743274?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-modia-red hover:bg-modia-red/90 text-white py-3 px-4 rounded-md font-medium transition-colors"
                      >
                        <PhoneCall className="h-5 w-5" />
                        Contact Agent
                      </a>
                      <Button variant="outline" className="w-full">
                        <Share2 className="h-5 w-5 mr-2" />
                        Share Property
                      </Button>
                    </div>
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold">Modia Properties</p>
                          <p className="text-sm text-gray-500">Real Estate Consultant</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Similar Properties</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={getPropertyImage(property) || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-modia-red text-white border-0 px-3 py-1">
                          {getPropertyTypeLabel(property)}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{property.title}</h3>
                        <div className="flex items-center text-sm text-white/90 mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          {property.location?.name || "Abuja"}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-modia-red">
                          {typeof property.price === "number"
                            ? new Intl.NumberFormat("en-NG", {
                                style: "currency",
                                currency: "NGN",
                                maximumFractionDigits: 0,
                              }).format(property.price)
                            : property.price}
                        </span>
                        <div className="flex items-center text-gray-500">
                          <Maximize2 className="h-4 w-4 mr-1" />
                          <span>{property.size}</span>
                        </div>
                      </div>
                      <Link href={`/properties/${property.id}`}>
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-modia-red/10 px-4 py-1.5 rounded-full text-modia-red font-medium text-sm mb-4">
                    EXPLORE MORE
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Find More Properties</h2>
                  <p className="text-gray-600 mb-6">
                    Discover our wide range of landed properties across Abuja. From luxury duplex plots to cozy bungalow
                    plots, we have something for everyone.
                  </p>
                  <div>
                    <Link href="/properties">
                      <Button className="bg-modia-red hover:bg-modia-red/90 text-white">
                        View All Properties <ArrowRight className="ml-2 h-4 w-4" />
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
      </main>

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

