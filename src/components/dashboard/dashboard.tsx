'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { 
  Leaf, 
  Plus, 
  Gift, 
  Truck, 
  Star, 
  History, 
  LogOut,
  User,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  Award,
  Clock,
  Recycle
} from 'lucide-react'
import { EwasteForm } from './ewaste-form'
import { VoucherRedemption } from './voucher-redemption'

interface EwasteItem {
  id: string
  name: string
  category: string
  brand?: string
  condition: string
  status: string
  estimatedPoints?: number
  finalPoints?: number
  createdAt: string
}

interface Voucher {
  id: string
  name: string
  provider: string
  description: string
  points: number
  value: number
}

export function Dashboard() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [ewasteItems, setEwasteItems] = useState<EwasteItem[]>([])
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [showEwasteForm, setShowEwasteForm] = useState(false)
  const [showVoucherRedemption, setShowVoucherRedemption] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      // Fetch e-waste items
      const itemsResponse = await fetch(`/api/ewaste/items?userId=${user?.id}`)
      if (itemsResponse.ok) {
        const itemsData = await itemsResponse.json()
        setEwasteItems(itemsData.items || [])
      }

      // Fetch vouchers
      const vouchersResponse = await fetch('/api/vouchers/available')
      if (vouchersResponse.ok) {
        const vouchersData = await vouchersResponse.json()
        setVouchers(vouchersData.vouchers || [])
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "Come back soon to recycle more e-waste!",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'quoted': return 'bg-blue-100 text-blue-800'
      case 'scheduled': return 'bg-purple-100 text-purple-800'
      case 'picked_up': return 'bg-orange-100 text-orange-800'
      case 'assessed': return 'bg-green-100 text-green-800'
      case 'recycled': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (showEwasteForm) {
    return <EwasteForm onSuccess={() => { setShowEwasteForm(false); fetchUserData() }} onCancel={() => setShowEwasteForm(false)} />
  }

  if (showVoucherRedemption) {
    return <VoucherRedemption onSuccess={() => { setShowVoucherRedemption(false); fetchUserData() }} onCancel={() => setShowVoucherRedemption(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Revivio</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name || user?.email}!</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">E-Points Balance</p>
                  <p className="text-3xl font-bold">{user?.ePoints || 0}</p>
                </div>
                <Star className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Items Listed</p>
                  <p className="text-3xl font-bold text-gray-900">{ewasteItems.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Pickups</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {ewasteItems.filter(item => item.status === 'scheduled').length}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Available Vouchers</p>
                  <p className="text-3xl font-bold text-gray-900">{vouchers.length}</p>
                </div>
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="my-items">My Items</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    What would you like to do today?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={() => setShowEwasteForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    List New E-Waste Item
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => setShowVoucherRedemption(true)}
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Redeem E-Points
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ewasteItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No recent activity</p>
                  ) : (
                    <div className="space-y-3">
                      {ewasteItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="my-items" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My E-Waste Items</h2>
              <Button onClick={() => setShowEwasteForm(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </div>

            {ewasteItems.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Recycle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No items listed yet</h3>
                  <p className="text-gray-600 mb-4">Start recycling your e-waste and earn E-Points!</p>
                  <Button onClick={() => setShowEwasteForm(true)} className="bg-green-600 hover:bg-green-700">
                    List Your First Item
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {ewasteItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-600">{item.category} • {item.brand}</p>
                          <p className="text-sm text-gray-500">Condition: {item.condition}</p>
                          <div className="flex items-center gap-4 mt-2">
                            {item.estimatedPoints && (
                              <span className="text-sm text-blue-600">
                                Estimated: {item.estimatedPoints} points
                              </span>
                            )}
                            {item.finalPoints && (
                              <span className="text-sm text-green-600">
                                Final: {item.finalPoints} points
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Available Rewards</h2>
              <Button onClick={() => setShowVoucherRedemption(true)} className="bg-green-600 hover:bg-green-700">
                <Gift className="h-4 w-4 mr-2" />
                Redeem Points
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers.map((voucher) => (
                <Card key={voucher.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{voucher.name}</CardTitle>
                      <Award className="h-6 w-6 text-yellow-500" />
                    </div>
                    <CardDescription>{voucher.provider}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{voucher.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{voucher.points} pts</p>
                        <p className="text-sm text-gray-500">Value: ₹{voucher.value}</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        disabled={(user?.ePoints || 0) < voucher.points}
                      >
                        Redeem
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{user?.name || 'Not provided'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{user?.phone || 'Not provided'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{user?.address || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}