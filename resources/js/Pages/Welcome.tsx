import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, BarChart2, Users, Calendar, Briefcase } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Segel</h1>
        <nav>
          <Button variant="ghost" className="mr-2" asChild>
            <a href="/login">Login</a>
          </Button>
          <Button asChild>
            <a href="/register">Register</a>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Revolutionize Your Customer Relationships</h2>
          <p className="text-xl text-muted-foreground mb-8">Streamline your business processes and boost customer satisfaction with our powerful CRM solution.</p>
          <Button size="lg" asChild>
            <a href="/register">Get Started <ChevronRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<BarChart2 className="h-10 w-10 text-primary" />}
            title="Advanced Analytics"
            description="Gain valuable insights with our comprehensive analytics tools."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="User Management"
            description="Efficiently manage your team and customer base with ease."
          />
          <FeatureCard
            icon={<Calendar className="h-10 w-10 text-primary" />}
            title="Task Scheduling"
            description="Stay organized with our intuitive task management system."
          />
          <FeatureCard
            icon={<Briefcase className="h-10 w-10 text-primary" />}
            title="Deal Tracking"
            description="Monitor and optimize your sales pipeline for better results."
          />
        </section>

        <section className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of satisfied customers who have already improved their customer relationships with Segel.</p>
          <Button size="lg" variant="outline" asChild>
            <a href="/register">Start Your Free Trial</a>
          </Button>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Segel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-4">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}