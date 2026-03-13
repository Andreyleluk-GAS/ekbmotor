"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, Send } from "lucide-react"
import { YandexMap } from "@/components/yandex-map"

// Координаты: г. Екатеринбург, ул. Шефская, 3АВ
const ADDRESS_LAT = 56.86872
const ADDRESS_LON = 60.67340

function getAddressUrl(): string {
  if (typeof window === "undefined") return "#"
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  if (isMobile) {
    // Яндекс Навигатор с маршрутом до адреса
    return `yandexnavi://build_route_on_map?lat_to=${ADDRESS_LAT}&lon_to=${ADDRESS_LON}`
  }
  // Яндекс Карты в браузере с маршрутом
  return `https://yandex.ru/maps/?rtext=~${ADDRESS_LAT},${ADDRESS_LON}&rtt=auto`
}

const contactInfo = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (922) 022-64-99",
    href: "tel:+79220226499",
    isAddress: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@ekbmotor.ru",
    href: "mailto:info@ekbmotor.ru",
    isAddress: false,
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Екатеринбург, ул. Шефская, 3АВ",
    href: "#",
    isAddress: true,
  },
  {
    icon: Clock,
    label: "Режим работы",
    value: "Пн-Пт: 8:00 - 20:00, Сб: 10:00-17:00",
    href: "#",
    isAddress: false,
  },
]

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (digits.length === 0) return ""
  if (digits.length <= 1) return `+7 (${digits}`
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`
  if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
  if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState("")
  const [errors, setErrors] = useState<{name?: string; phone?: string}>({})
  const formRef = useRef<HTMLFormElement>(null)

  const validateForm = () => {
    const newErrors: {name?: string; phone?: string} = {}
    if (formData.name.trim().length < 2) {
      newErrors.name = "Введите ваше имя"
    }
    const phoneDigits = formData.phone.replace(/\D/g, "")
    if (phoneDigits.length < 11) {
      newErrors.phone = "Введите корректный номер телефона"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData({ ...formData, phone: formatted })
    if (errors.phone) setErrors({ ...errors, phone: undefined })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value })
    if (errors.name) setErrors({ ...errors, name: undefined })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmittedName(formData.name)
        setIsSubmitted(true)
        setFormData({ name: "", phone: "", message: "" })
      }
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }

    // Reset success state after 10 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setSubmittedName("")
    }, 10000)
  }

  return (
    <section id="contact" className="py-20 bg-card/50 pb-32 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оставьте заявку и мы перезвоним вам в течение 15 минут
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-10">
          <Card className="bg-card border-border">
            <CardContent className="p-6 md:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {submittedName}, спасибо за обращение!
                  </h3>
                  <p className="text-lg font-medium text-foreground mb-1">
                    Ваша заявка отправлена!
                  </p>
                  <p className="text-muted-foreground">
                    Мы перезвоним вам в ближайшее время!
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Записаться на ремонт
                  </h3>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Ваше имя <span className="text-secondary">*</span>
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Иван"
                        value={formData.name}
                        onChange={handleNameChange}
                        className={`bg-muted border-border focus:border-primary focus:ring-primary ${errors.name ? 'border-secondary' : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-secondary text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Телефон <span className="text-secondary">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`bg-muted border-border focus:border-primary focus:ring-primary ${errors.phone ? 'border-secondary' : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.phone && (
                        <p className="text-secondary text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Опишите проблему
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Расскажите, что случилось с вашим автомобилем..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="bg-muted border-border focus:border-primary focus:ring-primary resize-none"
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        "Отправить заявку"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Контактная информация
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                item.isAddress ? (
                  <a
                    key={item.label}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(getAddressUrl(), "_blank", "noopener,noreferrer")
                    }}
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </a>
                )
              ))}
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Бесплатная консультация
              </h4>
              <p className="text-muted-foreground mb-4">
                Не знаете, что случилось с машиной? Позвоните нам — проконсультируем бесплатно!
              </p>
              <a
                href="tel:+79220226499"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <Phone className="w-4 h-4" />
                +7 (922) 022-64-99
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Как нас найти
          </h3>
          <YandexMap />
        </div>
      </div>
    </section>
  )
}
