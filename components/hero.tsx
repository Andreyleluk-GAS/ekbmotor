import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Shield, Star, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-background overflow-hidden">
      <div className="absolute inset-0">
        <Image 
          src="/images/hero-engine.jpg" 
          alt="Капитальный ремонт двигателя EkbMotor" 
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm text-foreground">Екатеринбург и Свердловская область</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 text-balance lg:whitespace-nowrap">
            Капитальный ремонт{" "}
            <span className="text-primary">двигателя</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl text-pretty">
            Устранение стука, расхода масла, восстановление компрессии до заводской. 10 лет опыта и гарантия на все работы.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button size="lg" asChild className="text-base bg-secondary hover:bg-secondary/90">
              <Link href="#contact">
                Записаться на диагностику
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="#services">Услуги ремонта</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">10+</p>
                <p className="text-sm text-muted-foreground">Лет опыта</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">600+</p>
                <p className="text-sm text-muted-foreground">м2 площадь</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5000+</p>
                <p className="text-sm text-muted-foreground">Клиентов</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2 года</p>
                <p className="text-sm text-muted-foreground">Гарантия</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
