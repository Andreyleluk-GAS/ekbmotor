"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileCallButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 p-4 bg-gradient-to-t from-background via-background to-transparent">
      <Button
        asChild
        size="lg"
        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg"
      >
        <a href="tel:+79220226499" className="flex items-center justify-center gap-2">
          <Phone className="w-5 h-5" />
          Позвонить сейчас
        </a>
      </Button>
    </div>
  )
}
