"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Контакты", href: "#contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Determine active section
      const sections = navItems.map(item => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/98 backdrop-blur-md shadow-lg border-b border-border' : 'bg-background/95 backdrop-blur-sm border-b border-border'}`}>
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex items-center justify-between h-14 md:h-20">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="EkbMotor" 
              width={168} 
              height={84}
              className="h-14 md:h-20 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-medium relative ${
                  activeSection === item.href.replace("#", "") 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+79220226499" className="flex items-center gap-2 text-foreground font-semibold">
              <Phone className="w-4 h-4 text-primary" />
              +7 (922) 022-64-99
            </a>
            <a
              href="https://t.me/Ekb_motor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] transition-colors"
              aria-label="Написать в Telegram"
            >
              <Send className="w-4 h-4 text-white" />
            </a>
            <Button asChild>
              <Link href="#contact">Записаться</Link>
            </Button>
          </div>

          {/* Мобильная версия: Telegram-плашка между логотипом и гамбургером */}
          <a
            href="https://t.me/Ekb_motor"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#2AABEE] hover:bg-[#229ED9] active:bg-[#1a8bc4] transition-colors text-white font-semibold text-xs"
          >
            <Send className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Telegram</span>
          </a>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Убираем отдельную строку с плашкой */}

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 border-t border-border">
            {/* Telegram — по центру вверху мобильного меню */}
            <div className="flex justify-center mb-4">
              <a
                href="https://t.me/Ekb_motor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] transition-colors text-white font-semibold"
              >
                <Send className="w-4 h-4" />
                Написать в Telegram
              </a>
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium py-2 ${
                    activeSection === item.href.replace("#", "") 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                <a href="tel:+79220226499" className="flex items-center gap-2 text-foreground font-semibold">
                  <Phone className="w-4 h-4 text-primary" />
                  +7 (922) 022-64-99
                </a>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Записаться</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
