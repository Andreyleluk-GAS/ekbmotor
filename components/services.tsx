"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

const services = [
  {
    image: "/images/engine-block.jpg",
    title: "Ремонт блока цилиндров",
    features: [
      "Расточка блока цилиндров",
      "Гильзовка блока цилиндров",
      "Замена вкладышей",
      "Шлифовка плоскости",
    ],
    price: "от 6 000 руб./цилиндр",
  },
  {
    image: "/images/cylinder-head.jpg",
    title: "Ремонт ГБЦ",
    features: [
      "Шлифовка плоскости ГБЦ",
      "Замена направляющих втулок",
      "Притирка и регулировка клапанов",
      "Замена маслосъемных колпачков",
    ],
    price: "от 300 руб./клапан",
  },
  {
    image: "/images/crankshaft.jpg",
    title: "Ремонт коленчатых валов",
    features: [
      "Шлифование коленвалов",
      "Полировка шеек коленвала",
      "Рихтовка коленвала",
      "Проверка, балансировка",
    ],
    price: "от 4 500 руб./вал",
  },
  {
    image: "/images/engine-rebuild.jpg",
    title: "Капитальный ремонт двигателей",
    features: [
      "Снятие / установка двигателя",
      "Разборка / дефектовка",
      "Замена ремней ГРМ / цепей",
      "Ремонт системы охлаждения",
    ],
    price: "12 000 руб./цилиндр",
  },
  {
    image: "/images/diagnostics.jpg",
    title: "Диагностика двигателя и ТО",
    features: [
      "Компьютерная диагностика",
      "Прошивка с увеличением мощности",
      "Отключение лямбда-зондов",
      "Отключение EGR",
    ],
    price: "от 600 руб.",
  },
]

export function Services() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="services" className="py-18 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Услуги ремонта
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Полный спектр услуг по капитальному ремонту и обслуживанию двигателей
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`bg-background border-border overflow-hidden hover:border-primary/50 transition-all group ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDuration: '500ms',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-secondary font-bold text-lg">{service.price}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 lg:whitespace-nowrap">
                  {service.title}
                </h3>
                <ul className="space-y-1.5 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="#contact">Оставить заявку</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
