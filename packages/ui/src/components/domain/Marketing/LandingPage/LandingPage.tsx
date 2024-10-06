import Link from 'next/link'
import { Button } from '../../../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card'
import { Header } from './Header'
import { CoreServices } from './CoreServices'
import { Section } from './Section'

const texts = {
  EN: {
    welcome: "Welcome to Our Platform",
    title: "Discover amazing features and boost your productivity",
    subtitle: `Join thousands of users who are already enjoying our services.
            Start your journey today!`,
    login: "Login",
    register: "Register"
  }
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CoreServices />
      <Section />
    </div>
  )
}