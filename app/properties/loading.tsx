import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-modia-red" />
        <p className="text-lg font-medium">Loading properties...</p>
      </div>
    </div>
  )
}

