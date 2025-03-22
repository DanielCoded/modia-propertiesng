"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <h2 className="mb-2 text-3xl font-bold">Something went wrong!</h2>
        <p className="mb-6 text-muted-foreground">We apologize for the inconvenience. Please try again later.</p>
        <Button onClick={reset} variant="default" className="bg-modia-red hover:bg-modia-red/90">
          Try again
        </Button>
      </div>
    </div>
  )
}

