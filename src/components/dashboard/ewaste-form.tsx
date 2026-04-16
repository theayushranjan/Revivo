'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Smartphone, 
  Monitor, 
  AirVent, 
  Refrigerator,
  Zap,
  Laptop,
  Tablet,
  HelpCircle
} from 'lucide-react'

interface EwasteFormProps {
  onSuccess: () => void
  onCancel: () => void
}

const categoryIcons = {
  'Phone': Smartphone,
  'TV': Monitor,
  'AC': AirVent,
  'Fridge': Refrigerator,
  'Charger': Zap,
  'Laptop': Laptop,
  'Tablet': Tablet,
  'Other': HelpCircle
}

const categories = [
  'Phone',
  'TV', 
  'AC',
  'Fridge',
  'Charger',
  'Laptop',
  'Tablet',
  'Other'
]

const conditions = [
  'Working',
  'Not Working',
  'Damaged'
]

export function EwasteForm({ onSuccess, onCancel }: EwasteFormProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    model: '',
    age: '',
    condition: '',
    description: ''
  })
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setUploadedImages(prev => [...prev, result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/ewaste/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          ...formData,
          age: formData.age ? parseInt(formData.age) : null,
          images: uploadedImages
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Item listed successfully!",
          description: `Your ${formData.name} has been listed for ${data.item.estimatedPoints} estimated E-Points.`,
        })
        onSuccess()
      } else {
        toast({
          title: "Failed to list item",
          description: data.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const CategoryIcon = categoryIcons[formData.category as keyof typeof categoryIcons] || HelpCircle

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">List E-Waste Item</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              Tell us about the electronic device you want to recycle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., iPhone 12, Samsung 43-inch TV"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => {
                          const Icon = categoryIcons[category as keyof typeof categoryIcons]
                          return (
                            <SelectItem key={category} value={category}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {category}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="e.g., Apple, Samsung"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g., iPhone 12, UN43N5000"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 2"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional details about the item's condition, any damage, or accessories included..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Label>Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload photos</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Points Estimate */}
              {formData.category && formData.condition && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Estimated E-Points</p>
                        <p className="text-sm text-green-600">
                          Based on your {formData.category} in {formData.condition.toLowerCase()} condition
                        </p>
                      </div>
                      <div className="ml-auto">
                        <p className="text-2xl font-bold text-green-600">
                          {Math.round(
                            (formData.category === 'Phone' ? 50 :
                             formData.category === 'TV' ? 100 :
                             formData.category === 'AC' ? 150 :
                             formData.category === 'Fridge' ? 120 :
                             formData.category === 'Charger' ? 10 :
                             formData.category === 'Laptop' ? 80 :
                             formData.category === 'Tablet' ? 60 : 30) *
                            (formData.condition === 'Working' ? 1.0 :
                             formData.condition === 'Not Working' ? 0.6 : 0.3)
                          )} points
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-green-600 hover:bg-green-700" 
                  disabled={isLoading || !formData.name || !formData.category || !formData.condition}
                >
                  {isLoading ? "Listing Item..." : "List Item"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}