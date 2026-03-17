"use client"

import Link from "next/link"
import Image from "next/image"
import { Send } from "lucide-react"

// Координаты: г. Екатеринбург, ул. Шефская, 3АВ
// Чтобы изменить координаты, обновите значения ниже (широта и долгота)
const ADDRESS_LAT = 56.8725
const ADDRESS_LON = 60.6595

function handleAddressClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const url = isMobile
    ? `yandexnavi://build_route_on_map?lat_to=${ADDRESS_LAT}&lon_to=${ADDRESS_LON}`
    : `https://yandex.ru/maps/?rtext=~${ADDRESS_LAT},${ADDRESS_LON}&rtt=auto`
  window.open(url, "_blank", "noopener,noreferrer")
}

const footerLinks = {
  services: [
    { label: "Ремонт блока цилиндров", href: "#services" },
    { label: "Ремонт ГБЦ", href: "#services" },
    { label: "Ремонт коленвалов", href: "#services" },
    { label: "Капремонт двигателя", href: "#services" },
    { label: "Диагностика", href: "#services" },
  ],
  company: [
    { label: "О компании", href: "#about" },
    { label: "Наши преимущества", href: "#advantages" },
    { label: "Контакты", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/logo.png" 
                alt="EkbMotor" 
                width={240} 
                height={120}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm">
              Профессиональный автосервис в Екатеринбурге с гарантией качества. Работаем с 2014 года.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+79220226499" className="text-muted-foreground hover:text-primary transition-colors">
                  +7 (922) 022-64-99
                </a>
              </li>
              <li>
                <a href="mailto:info@ekbmotor.ru" className="text-muted-foreground hover:text-primary transition-colors">
                  info@ekbmotor.ru
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleAddressClick}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  г. Екатеринбург, ул. Шефская, 3АВ
                </a>
              </li>
              <li className="text-muted-foreground">
                Пн-Пт: 8:00 - 20:00, Сб: 10:00-17:00
              </li>
              <li className="pt-2">
                <a
                  href="https://t.me/Ekb_motor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2AABEE] hover:bg-[#229ED9] transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold text-sm">Telegram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} EkbMotor. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
