export interface PropertyType {
  id: string
  title: string
  description: string
  price: string | number
  location: { name: string } | string
  size: string
  property_type: { name: string } | string
  bedrooms?: number
  bathrooms?: number
  features?: string[]
  is_featured?: boolean
  status?: string
  location_id?: string
  property_type_id?: string
  media?: any[]
}

