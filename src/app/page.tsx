'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Recycle, Gift, Truck, Shield, Star, Users, Leaf } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { AuthForm } from "@/components/auth/auth-form"
import { Dashboard } from "@/components/dashboard/dashboard"

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Revivio</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">How It Works</Link>
              <Link href="#impact" className="text-gray-700 hover:text-green-600 transition-colors">Impact</Link>
              <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
                🌱 Eco-Friendly Solution
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Turn Your E-Waste into
                <span className="text-green-600 block">Rewards</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join Revivio in the fight against electronic waste. Recycle your old devices, earn E-Points, 
                and redeem them for exciting rewards while protecting our planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Start Recycling Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm opacity-90">Your E-Points Balance</span>
                    <Star className="h-5 w-5 text-yellow-300" />
                  </div>
                  <div className="text-3xl font-bold mb-2">2,450</div>
                  <div className="text-sm opacity-75">Ready to redeem!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Revivio?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make e-waste recycling simple, rewarding, and environmentally responsible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Instant Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get real-time valuations for your old electronics. TVs, phones, ACs, and more - we take it all!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">E-Points Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn points for every recycled item. Redeem them for Amazon, Flipkart, and other popular vouchers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Free Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Schedule convenient pickups from your home or office. No hassle, no cost to you.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Expert Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Professional engineers evaluate your items, extract reusable parts, and ensure safe recycling.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Revivio Works
            </h2>
            <p className="text-xl text-gray-600">
              Recycling your e-waste is as easy as 1-2-3
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and details of your old electronics. Get an instant quote and E-Points estimate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Schedule Pickup</h3>
              <p className="text-gray-600">
                Choose a convenient time for our team to collect your items from your location.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn & Redeem</h3>
              <p className="text-gray-600">
                Receive E-Points after assessment. Redeem them for exciting rewards and vouchers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Impact Together
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands making a difference, one device at a time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600">Devices Recycled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">25,000+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100 tons</div>
              <div className="text-gray-600">E-Waste Prevented</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join Revivio today and turn your e-waste into rewards while protecting our planet.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">Revivio</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 Revivio. Making e-waste recycling rewarding.</p>
              <p className="text-sm mt-1">Contact: +91 70326 94890 | ka4987@srmist.edu.in</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  const { user, isLoading, login } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading Revivio...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm onAuthSuccess={login} />
  }

  return <Dashboard />
}