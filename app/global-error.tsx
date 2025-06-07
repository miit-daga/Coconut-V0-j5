"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/20 backdrop-blur-xl border border-red-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative p-4 rounded-full bg-red-900/20 border border-red-500/30">
                  <AlertTriangle className="h-12 w-12 text-red-400" />
                  <div className="absolute inset-0 bg-red-400 blur-xl opacity-20 rounded-full" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-red-400 font-mono">CRITICAL SYSTEM ERROR</CardTitle>
              <CardDescription className="text-gray-300 font-mono">
                A neural matrix disruption has occurred in the neural matrix.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-gray-400 font-mono text-sm">
                <p>[ ERROR: NEURAL_NETWORK_FAILURE ]</p>
                <p>[ STATUS: NEURAL_MATRIX_UNSTABLE ]</p>
                <p>[ ACTION: SYSTEM_RESTART_REQUIRED ]</p>
              </div>

              <Button
                onClick={reset}
                className="w-full bg-green-600 hover:bg-green-500 border border-green-500/50 font-mono"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                RESTART CORE SYSTEMS
              </Button>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
