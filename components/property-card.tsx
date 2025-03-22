import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Maximize2 } from "lucide-react"
import type { PropertyType } from "@/lib/types"

interface PropertyCardProps {
  property: PropertyType
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Function to determine which image to use based on property type
  const getPropertyImage = () => {
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
  const getPropertyTypeLabel = () => {
    const type = property.property_type?.name || "Property"
    return `Landed Property for ${type}`
  }

  // Handle potential missing data
  const locationName = property.location?.name || (typeof property.location === "string" ? property.location : "Abuja")

  return (
    <Card className="overflow-hidden group border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
      <div className="aspect-[4/3] w-full bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-modia-red text-white border-0 px-3 py-1">{getPropertyTypeLabel()}</Badge>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-xl font-bold text-white line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-sm text-white/90 mt-1">
            <MapPin className="mr-1 h-4 w-4" />
            {locationName}
          </div>
        </div>
        <Image
          src={getPropertyImage() || "/placeholder.svg"}
          alt={property.title || "Property"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
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
        <p className="text-gray-600 line-clamp-2">
          {property.description ||
            `Premium landed property for ${property.property_type?.name} in ${locationName}. Perfect for building your dream home.`}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link href={`/properties/${property.id}`} className="w-full">
          <Button className="w-full bg-white hover:bg-gray-100 text-modia-red border border-modia-red hover:border-modia-red group-hover:bg-modia-red group-hover:text-white transition-all duration-300">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

