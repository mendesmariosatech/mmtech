import Link from 'next/link'
import { Button } from '../../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'

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
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">{texts.EN.welcome}</CardTitle>
          <CardDescription className="text-xl mt-2">
            {texts.EN.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-muted-foreground max-w-md">

          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              {/* <Link href="/login"> */}
              {texts.EN.login}
              {/* </Link> */}
            </Button>
            <Button variant="outline" size="lg">
              {/* <Link href="/register"> */}
              {texts.EN.register}
              {/* </Link> */}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}