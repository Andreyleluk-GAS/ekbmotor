import { CheckCircle } from "lucide-react"
import Image from "next/image"

const problems = [
  "Потеря мощности двигателя",
  "Большой расход топлива",
  "Обильный сизый дым из выхлопной трубы",
  "Расход масла или охлаждающей жидкости",
  "Троение и падение оборотов",
  "Стук и шум в двигателе",
  "Перегрев двигателя",
  "Обрыв ремня или цепи ГРМ",
  "Гидроудар, загнутые клапана",
  "Заклинивание коленчатого вала",
  "Задиры в цилиндрах",
  "Прогар поршня или клапана",
]

export function About() {
  return (
    <section id="about" className="py-18 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Неисправности которые мы{" "}
              <span className="text-secondary">устраняем</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-lg text-pretty">
              Наша команда профессионалов с 10-летним опытом готова решить любую проблему с двигателем вашего автомобиля.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-2">
              {problems.map((problem) => (
                <div key={problem} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative pb-8 sm:pb-10">
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <Image 
                src="/images/service-bay.jpg" 
                alt="Автосервис EkbMotor" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary">10+</p>
                <p className="text-base sm:text-lg text-foreground mt-1">лет опыта работы</p>
              </div>
            </div>
            <div className="absolute bottom-0 -right-2 sm:-right-6 bg-secondary rounded-xl p-2.5 sm:p-4 shadow-lg">
              <p className="text-xl sm:text-3xl font-bold text-secondary-foreground">600</p>
              <p className="text-xs sm:text-sm text-secondary-foreground/80">м2 ремонтной зоны</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
