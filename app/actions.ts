"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

// Types
export type PropertyFormData = {
  title: string
  description: string
  price: number
  size: string
  location_id: string
  property_type_id: string
  bedrooms: number
  bathrooms: number
  features: string[]
  is_featured: boolean
  status: string
}

export type LocationFormData = {
  name: string
  city: string
  state: string
}

export type PropertyTypeFormData = {
  name: string
  description: string
}

// Property CRUD operations
export async function getProperties() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("properties")
    .select(`
      *,
      location:locations(*),
      property_type:property_types(*),
      media(*)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching properties:", error)
    return { error: error.message }
  }

  return { properties: data }
}

export async function getProperty(id: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("properties")
    .select(`
      *,
      location:locations(*),
      property_type:property_types(*),
      media(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching property:", error)
    return { error: error.message }
  }

  return { property: data }
}

export async function createProperty(formData: PropertyFormData) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("properties").insert([formData]).select()

  if (error) {
    console.error("Error creating property:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dashboard")
  revalidatePath("/")

  return { property: data[0] }
}

export async function updateProperty(id: string, formData: PropertyFormData) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("properties").update(formData).eq("id", id).select()

  if (error) {
    console.error("Error updating property:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dashboard")
  revalidatePath("/")
  revalidatePath(`/properties/${id}`)

  return { property: data[0] }
}

export async function deleteProperty(id: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("properties").delete().eq("id", id)

  if (error) {
    console.error("Error deleting property:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dashboard")
  revalidatePath("/")

  return { success: true }
}

// Location CRUD operations
export async function getLocations() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("locations").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching locations:", error)
    return { error: error.message }
  }

  return { locations: data }
}

export async function createLocation(formData: LocationFormData) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("locations").insert([formData]).select()

  if (error) {
    console.error("Error creating location:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dashboard")

  return { location: data[0] }
}

// Property Type CRUD operations
export async function getPropertyTypes() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("property_types").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching property types:", error)
    return { error: error.message }
  }

  return { propertyTypes: data }
}

export async function createPropertyType(formData: PropertyTypeFormData) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("property_types").insert([formData]).select()

  if (error) {
    console.error("Error creating property type:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dashboard")

  return { propertyType: data[0] }
}

// Media upload
export async function uploadPropertyMedia(propertyId: string, file: File, type: "image" | "video", isFeatured = false) {
  const supabase = createServerSupabaseClient()

  // Upload file to Supabase Storage
  const fileName = `${Date.now()}-${file.name}`
  const { data: fileData, error: fileError } = await supabase.storage.from("property-media").upload(fileName, file)

  if (fileError) {
    console.error("Error uploading file:", fileError)
    return { error: fileError.message }
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from("property-media").getPublicUrl(fileName)

  // Save media record in database
  const { data, error } = await supabase
    .from("media")
    .insert([
      {
        property_id: propertyId,
        url: urlData.publicUrl,
        type,
        is_featured: isFeatured,
      },
    ])
    .select()

  if (error) {
    console.error("Error saving media record:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dashboard")
  revalidatePath(`/properties/${propertyId}`)

  return { media: data[0] }
}

export async function deleteMedia(id: string) {
  const supabase = createServerSupabaseClient()

  // First get the media record to get the file path
  const { data: mediaData, error: fetchError } = await supabase.from("media").select("*").eq("id", id).single()

  if (fetchError) {
    console.error("Error fetching media:", fetchError)
    return { error: fetchError.message }
  }

  // Extract filename from URL
  const url = new URL(mediaData.url)
  const filePath = url.pathname.split("/").pop()

  if (filePath) {
    // Delete from storage
    const { error: storageError } = await supabase.storage.from("property-media").remove([filePath])

    if (storageError) {
      console.error("Error deleting file from storage:", storageError)
      // Continue anyway to delete the database record
    }
  }

  // Delete from database
  const { error } = await supabase.from("media").delete().eq("id", id)

  if (error) {
    console.error("Error deleting media record:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dashboard")

  return { success: true }
}

// Contact form submission
import { supabase } from "@/lib/supabase"

export async function submitInquiry(formData: FormData) {
  const first_name = formData.get("first_name") as string
  const last_name = formData.get("last_name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string

  const { data, error } = await supabase.from("inquiries").insert([
    {
      first_name,
      last_name,
      email,
      phone,
      message,
    },
  ])

  if (error) {
    console.error("Error submitting inquiry:", error)
    return { success: false, message: "Failed to submit inquiry" }
  }

  return { success: true, message: "Inquiry submitted successfully" }
}

