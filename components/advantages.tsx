import { Clock, Search, Package, Armchair, Ruler, ShoppingCart } from "lucide-react"

const advantages = [
  {
    icon: Clock,
    title: "10 лет",
    subtitle: "Опыт работы",
    color: "primary",
  },
  {
    icon: Search,
    title: "Диагностика",
    subtitle: "Делаем все виды диагностики",
    color: "secondary",
  },
  {
    icon: Package,
    title: "Материалы",
    subtitle: "Личный склад с качественными расходными материалами",
    color: "primary",
  },
  {
    icon: Armchair,
    title: "Клиентская зона",
    subtitle: "Комфортное пространство для ожидания вашего авто",
    color: "secondary",
  },
  {
    icon: Ruler,
    title: "600 м2",
    subtitle: "Квадратных метров ремонтной зоны",
    color: "primary",
  },
  {
    icon: ShoppingCart,
    title: "Подбор запчастей",
    subtitle: "Только у проверенных поставщиков по низким ценам",
    color: "secondary",
  },
]

export function Advantages() {
  return (
    <section id="advantages" className="py-18 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Наши преимущества
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы делаем всё, чтобы ваш визит был комфортным и результативным
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages.map((advantage) => (
            <div
              key={advantage.title}
              className={`rounded-xl p-6 transition-all hover:scale-105 ${
                advantage.color === "primary" 
                  ? "bg-primary/10 border border-primary/30 hover:bg-primary/20" 
                  : "bg-secondary/10 border border-secondary/30 hover:bg-secondary/20"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${
                advantage.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
              }`}>
                <advantage.icon className={`w-7 h-7 ${
                  advantage.color === "primary" ? "text-primary" : "text-secondary"
                }`} />
              </div>
              <h3 className={`text-2xl font-bold mb-1.5 ${
                advantage.color === "primary" ? "text-primary" : "text-secondary"
              }`}>
                {advantage.title}
              </h3>
              <p className="text-muted-foreground text-sm">{advantage.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
