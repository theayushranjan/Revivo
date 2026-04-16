'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { 
  ArrowLeft, 
  Gift, 
  Star, 
  CheckCircle, 
  Copy,
  ExternalLink,
  Award,
  AlertCircle
} from 'lucide-react'

interface Voucher {
  id: string
  name: string
  provider: string
  description: string
  points: number
  value: number
}

interface VoucherRedemptionProps {
  onSuccess: () => void
  onCancel: () => void
}

export function VoucherRedemption({ onSuccess, onCancel }: VoucherRedemptionProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null)
  const [redemptionCode, setRedemptionCode] = useState<string>('')
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVouchers()
  }, [])

  const fetchVouchers = async () => {
    try {
      const response = await fetch('/api/vouchers/available')
      if (response.ok) {
        const data = await response.json()
        setVouchers(data.vouchers || [])
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRedeem = async () => {
    if (!selectedVoucher) return

    setIsRedeeming(true)
    try {
      const response = await fetch('/api/vouchers/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          voucherId: selectedVoucher.id
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setRedemptionCode(data.redemptionCode)
        toast({
          title: "Voucher redeemed successfully!",
          description: `Your ${selectedVoucher.name} voucher code has been generated.`,
        })
      } else {
        toast({
          title: "Redemption failed",
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
      setIsRedeeming(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(redemptionCode)
    toast({
      title: "Code copied!",
      description: "Voucher code copied to clipboard.",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <Gift className="h-12 w-12 text-green-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading available rewards...</p>
        </div>
      </div>
    )
  }

  if (redemptionCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={onSuccess}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Voucher Redeemed!</h1>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Congratulations!</CardTitle>
              <CardDescription>
                You have successfully redeemed your E-Points for a voucher
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{selectedVoucher?.name}</h3>
                <p className="text-green-100 mb-4">{selectedVoucher?.provider}</p>
                <div className="text-3xl font-bold mb-2">₹{selectedVoucher?.value}</div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Your Voucher Code</Label>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-xl tracking-wider">
                  {redemptionCode}
                </div>
                <Button onClick={copyToClipboard} className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium text-blue-900">How to use your voucher</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Visit {selectedVoucher?.provider}'s website and apply this code during checkout. 
                      The voucher is valid for 30 days from today.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={onSuccess} className="w-full bg-green-600 hover:bg-green-700">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Redeem E-Points</h1>
        </div>

        {/* Points Balance */}
        <Card className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Your E-Points Balance</p>
                <p className="text-4xl font-bold">{user?.ePoints || 0}</p>
              </div>
              <Star className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        {/* Available Vouchers */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Available Vouchers</h2>
          
          {vouchers.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No vouchers available</h3>
                <p className="text-gray-600">Check back later for new reward options!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {vouchers.map((voucher) => {
                const canAfford = (user?.ePoints || 0) >= voucher.points
                const isSelected = selectedVoucher?.id === voucher.id

                return (
                  <Card 
                    key={voucher.id} 
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-lg'
                    } ${!canAfford ? 'opacity-50' : ''}`}
                    onClick={() => canAfford && setSelectedVoucher(voucher)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="h-6 w-6 text-yellow-500" />
                          <CardTitle className="text-lg">{voucher.name}</CardTitle>
                        </div>
                        {isSelected && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
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
                        {!canAfford && (
                          <Badge variant="destructive">
                            Insufficient Points
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Redeem Button */}
        {selectedVoucher && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Selected Voucher</h3>
                <p className="text-gray-600">{selectedVoucher.name} - {selectedVoucher.provider}</p>
                <p className="text-sm text-gray-500">
                  You will use {selectedVoucher.points} points and receive ₹{selectedVoucher.value} value
                </p>
              </div>
              <Button 
                onClick={handleRedeem} 
                className="bg-green-600 hover:bg-green-700"
                disabled={isRedeeming}
              >
                {isRedeeming ? "Redeeming..." : "Redeem Now"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <label className={`text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
}