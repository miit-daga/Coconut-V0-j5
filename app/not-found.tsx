import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, Leaf } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/20 backdrop-blur-xl border border-red-500/30">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative p-4 rounded-full bg-red-900/20 border border-red-500/30">
              <AlertTriangle className="h-12 w-12 text-red-400" />
              <div className="absolute inset-0 bg-red-400 blur-xl opacity-20 rounded-full" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-red-400 font-mono">404 - NEURAL ANOMALY DETECTED</CardTitle>
          <CardDescription className="text-gray-300 font-mono">
            The requested neural pathway could not be located in our neural database.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-gray-400 font-mono text-sm">
            <p>[ ERROR CODE: NEURAL_PATH_NOT_FOUND ]</p>
            <p>[ STATUS: NEURAL MATRIX DISRUPTION ]</p>
            <p>[ RECOMMENDATION: RETURN TO BASE ]</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 bg-green-600 hover:bg-green-500 border border-green-500/50 font-mono">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                RETURN TO BASE
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-blue-500/50 text-blue-400 hover:bg-blue-900/20 font-mono"
            >
              <Link href="/" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                NEURAL DETECTOR
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
