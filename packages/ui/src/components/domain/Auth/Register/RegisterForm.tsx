"use client"

import { cn } from "@repo/ui/lib/utils"
import * as React from "react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Button } from "../../../ui/button"
import { Loader } from 'lucide-react';
import { useRouter } from "next/navigation"
interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void
}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    console.log('onSubmit')
    props.onClick()

    router.push('/')
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={onSubmit}
            disabled={isLoading}>
            {isLoading && (
              <Loader />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader />
        ) : (
          null
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}