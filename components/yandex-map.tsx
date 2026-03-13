"use client"

export function YandexMap() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <iframe
        src="https://yandex.ru/map-widget/v1/?apikey=b658001c-0f51-4686-a883-741cf3c7b16f&ll=60.8950%2C56.8801&z=16&pt=60.8950%2C56.8801%2Cpm2rdm&text=%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C+%D1%83%D0%BB.+%D0%A8%D0%B5%D1%84%D1%81%D0%BA%D0%B0%D1%8F%2C+3%D0%90%D0%92"
        width="100%"
        height="380"
        frameBorder="0"
        allowFullScreen
        title="EkbMotor на карте — г. Екатеринбург, ул. Шефская, 3АВ"
        className="block"
      />
    </div>
  )
}
