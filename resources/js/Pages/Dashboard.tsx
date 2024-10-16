import React from 'react'
import TopBar from './TopBar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'

// Mock data for analytics
const analyticsData = {
  totalRevenue: 1250000,
  newCustomers: 120,
  totalOrders: 1890,
  growthRate: 15.5,
  monthlySales: [
    { month: 'Jan', sales: 65000 },
    { month: 'Feb', sales: 80000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 105000 },
    { month: 'May', sales: 120000 },
    { month: 'Jun', sales: 135000 },
  ],
  topProducts: [
    { name: 'Product A', sales: 450 },
    { name: 'Product B', sales: 380 },
    { name: 'Product C', sales: 600 },
    { name: 'Product D', sales: 250 },
    { name: 'Product E', sales: 200 },
  ],
  customerRetention: 92,
}

export default function AnalyticsPage() {
  const currentUser = {
    name: 'John Doe',
    role: 'admin' as const,
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentUser={currentUser} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.newCustomers}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.growthRate}%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.monthlySales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.topProducts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span>Retention Rate</span>
              <span className="font-bold">{analyticsData.customerRetention}%</span>
            </div>
            <Progress value={analyticsData.customerRetention} className="h-2" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}