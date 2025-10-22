"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Thanks for joining! We'll be in touch soon.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-lg bg-slate-900/30 border-white/30 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white drop-shadow-lg">Join the Pluto Waitlist</CardTitle>
        <CardDescription className="text-white/90 font-normal italic drop-shadow-md">
          Be the first to transform your playlists into courses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              className="border-white/40 bg-white/10 text-slate-300 placeholder:text-slate-400 backdrop-blur-sm"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>

        {status === "success" && (
          <Alert className="mt-4 border-teal-400/50 bg-teal-900/30 backdrop-blur-sm">
            <CheckCircle className="h-4 w-4 text-teal-400" />
            <AlertDescription className="text-teal-100">{message}</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="mt-4 border-blue-400/50 bg-blue-900/30 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-100">{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
