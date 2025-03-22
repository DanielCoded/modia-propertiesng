"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, Home, LogOut, Plus, Loader2, ImageIcon } from "lucide-react"
import Link from "next/link"
import {
  getProperties,
  getLocations,
  getPropertyTypes,
  createProperty,
  updateProperty,
  deleteProperty,
  createLocation,
  createPropertyType,
  uploadPropertyMedia,
  deleteMedia,
  type PropertyFormData,
} from "@/app/actions"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("properties")
  const [properties, setProperties] = useState<any[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const [propertyTypes, setPropertyTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [editingProperty, setEditingProperty] = useState<any>(null)
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  const [showPropertyTypeDialog, setShowPropertyTypeDialog] = useState(false)
  const { toast } = useToast()

  // Form states
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    price: 0,
    size: "",
    location_id: "",
    property_type_id: "",
    bedrooms: 0,
    bathrooms: 0,
    features: [],
    is_featured: false,
    status: "available",
  })

  const [locationForm, setLocationForm] = useState({
    name: "",
    city: "",
    state: "",
  })

  const [propertyTypeForm, setPropertyTypeForm] = useState({
    name: "",
    description: "",
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const [propertiesRes, locationsRes, propertyTypesRes] = await Promise.all([
      getProperties(),
      getLocations(),
      getPropertyTypes(),
    ])

    if (propertiesRes.properties) setProperties(propertiesRes.properties)
    if (locationsRes.locations) setLocations(locationsRes.locations)
    if (propertyTypesRes.propertyTypes) setPropertyTypes(propertyTypesRes.propertyTypes)

    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "number") {
      setFormData({
        ...formData,
        [name]: Number.parseFloat(value),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      is_featured: checked,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles(filesArray)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      size: "",
      location_id: "",
      property_type_id: "",
      bedrooms: 0,
      bathrooms: 0,
      features: [],
      is_featured: false,
      status: "available",
    })
    setSelectedFiles([])
    setEditingProperty(null)
  }

  const handleEditProperty = (property: any) => {
    setEditingProperty(property)
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      size: property.size,
      location_id: property.location_id,
      property_type_id: property.property_type_id,
      bedrooms: property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      features: property.features || [],
      is_featured: property.is_featured || false,
      status: property.status || "available",
    })
    setActiveTab("add-property")
  }

  const handleDeleteProperty = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      const result = await deleteProperty(id)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Property deleted successfully",
        })
        fetchData()
      }
    }
  }

  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      let result

      if (editingProperty) {
        result = await updateProperty(editingProperty.id, formData)
      } else {
        result = await createProperty(formData)
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        // Upload images if any
        if (selectedFiles.length > 0 && result.property) {
          for (const file of selectedFiles) {
            const fileType = file.type.startsWith("image/") ? "image" : "video"
            await uploadPropertyMedia(result.property.id, file, fileType, selectedFiles.indexOf(file) === 0)
          }
        }

        toast({
          title: "Success",
          description: editingProperty ? "Property updated successfully" : "Property created successfully",
        })

        resetForm()
        setActiveTab("properties")
        fetchData()
      }
    } catch (error) {
      console.error("Error submitting property:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleSubmitLocation = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await createLocation(locationForm)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Location created successfully",
        })

        setLocationForm({
          name: "",
          city: "",
          state: "",
        })

        setShowLocationDialog(false)
        fetchData()
      }
    } catch (error) {
      console.error("Error submitting location:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleSubmitPropertyType = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await createPropertyType(propertyTypeForm)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Property type created successfully",
        })

        setPropertyTypeForm({
          name: "",
          description: "",
        })

        setShowPropertyTypeDialog(false)
        fetchData()
      }
    } catch (error) {
      console.error("Error submitting property type:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDeleteMedia = async (mediaId: string) => {
    if (confirm("Are you sure you want to delete this media?")) {
      const result = await deleteMedia(mediaId)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Media deleted successfully",
        })
        fetchData()
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <Building className="h-6 w-6" />
              <span className="inline-block font-bold">Modia Admin</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container">
          <Tabs defaultValue="properties" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
            <TabsList>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="add-property">{editingProperty ? "Edit Property" : "Add Property"}</TabsTrigger>
            </TabsList>
            <TabsContent value="properties" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Properties</h2>
                <Button
                  onClick={() => {
                    resetForm()
                    setActiveTab("add-property")
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="flex justify-center items-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : properties.length === 0 ? (
                    <div className="text-center p-8">
                      <p>No properties found. Add your first property!</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Media</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {properties.map((property) => (
                          <TableRow key={property.id}>
                            <TableCell className="font-medium">{property.title}</TableCell>
                            <TableCell>{property.location?.name || "N/A"}</TableCell>
                            <TableCell>{property.price.toLocaleString()} Naira</TableCell>
                            <TableCell>{property.size}</TableCell>
                            <TableCell>
                              {property.media && property.media.length > 0 ? (
                                <div className="flex items-center gap-1">
                                  <ImageIcon className="h-4 w-4" />
                                  <span>{property.media.length}</span>
                                </div>
                              ) : (
                                "No media"
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleEditProperty(property)}>
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                                onClick={() => handleDeleteProperty(property.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="add-property" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                {editingProperty ? "Edit Property" : "Add New Property"}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4" onSubmit={handleSubmitProperty}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Property Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="5 Bedroom Detached Duplex"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (Naira)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="2000000"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="location_id">Location</Label>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setShowLocationDialog(true)}>
                            <Plus className="h-4 w-4 mr-1" /> Add New
                          </Button>
                        </div>
                        <Select
                          value={formData.location_id}
                          onValueChange={(value) => handleSelectChange("location_id", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.name}, {location.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size">Size</Label>
                        <Input
                          id="size"
                          name="size"
                          value={formData.size}
                          onChange={handleInputChange}
                          placeholder="500Sqm"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="property_type_id">Property Type</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPropertyTypeDialog(true)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add New
                          </Button>
                        </div>
                        <Select
                          value={formData.property_type_id}
                          onValueChange={(value) => handleSelectChange("property_type_id", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Input
                          id="bedrooms"
                          name="bedrooms"
                          type="number"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          placeholder="3"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Input
                          id="bathrooms"
                          name="bathrooms"
                          type="number"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          placeholder="2"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description || ""}
                        onChange={handleInputChange}
                        placeholder="Enter property description"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="is_featured" checked={formData.is_featured} onCheckedChange={handleSwitchChange} />
                      <Label htmlFor="is_featured">Featured Property</Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="images">Property Images</Label>
                      <Input id="images" type="file" multiple accept="image/*,video/*" onChange={handleFileChange} />
                      <p className="text-sm text-muted-foreground">
                        You can select multiple images. The first image will be used as the featured image.
                      </p>
                    </div>

                    {editingProperty && editingProperty.media && editingProperty.media.length > 0 && (
                      <div className="space-y-2">
                        <Label>Current Media</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {editingProperty.media.map((media: any) => (
                            <div key={media.id} className="relative group">
                              {media.type === "image" ? (
                                <div className="aspect-video relative overflow-hidden rounded-md">
                                  <Image
                                    src={media.url || "/placeholder.svg"}
                                    alt="Property"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="aspect-video bg-muted flex items-center justify-center rounded-md">
                                  <video src={media.url} controls className="w-full h-full" />
                                </div>
                              )}
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDeleteMedia(media.id)}
                              >
                                Delete
                              </Button>
                              {media.is_featured && <Badge className="absolute bottom-2 left-2">Featured</Badge>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          resetForm()
                          setActiveTab("properties")
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={formLoading}>
                        {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {editingProperty ? "Update" : "Add"} Property
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Add Location Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>Add a new location for properties</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitLocation}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="location-name">Location Name</Label>
                <Input
                  id="location-name"
                  value={locationForm.name}
                  onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                  placeholder="Kuje Home City"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-city">City</Label>
                <Input
                  id="location-city"
                  value={locationForm.city}
                  onChange={(e) => setLocationForm({ ...locationForm, city: e.target.value })}
                  placeholder="Abuja"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-state">State</Label>
                <Input
                  id="location-state"
                  value={locationForm.state}
                  onChange={(e) => setLocationForm({ ...locationForm, state: e.target.value })}
                  placeholder="FCT"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Location</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Property Type Dialog */}
      <Dialog open={showPropertyTypeDialog} onOpenChange={setShowPropertyTypeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Property Type</DialogTitle>
            <DialogDescription>Add a new property type category</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitPropertyType}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="type-name">Type Name</Label>
                <Input
                  id="type-name"
                  value={propertyTypeForm.name}
                  onChange={(e) => setPropertyTypeForm({ ...propertyTypeForm, name: e.target.value })}
                  placeholder="Detached Duplex"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type-description">Description</Label>
                <Textarea
                  id="type-description"
                  value={propertyTypeForm.description || ""}
                  onChange={(e) => setPropertyTypeForm({ ...propertyTypeForm, description: e.target.value })}
                  placeholder="Description of this property type"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Property Type</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

