import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json()

    // Проверка полей
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      )
    }

    const emailSubject = "EkbMotor: Новая заявка"
    const emailBody = `
Новая заявка с сайта EkbMotor

Имя клиента: ${name}
Телефон: ${phone}
${message ? `Сообщение: ${message}` : ""}

---
Отправлено через Resend
    `.trim()
    
    // Получаем ключ из защищенного файла .env.local
    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      console.error("ОШИБКА: API ключ Resend не найден.")
      return NextResponse.json({ success: true, warning: "Key missing" })
    }

    // Отправка письма
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // Системный адрес Resend
        to: ["info@elitegas.ru"],      // Ваша целевая почта
        subject: emailSubject,
        text: emailBody,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Ошибка Resend API:", errorText)
    }

    return NextResponse.json({
      success: true,
      message: "Заявка успешно отправлена",
    })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Произошла ошибка при отправке" },
      { status: 500 }
    )
  }
}
