import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json()

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      )
    }

    // Email content
    const emailSubject = "Ekbmotor заявка с сайта"
    const emailBody = `
Новая заявка с сайта EkbMotor

Имя клиента: ${name}
Телефон: ${phone}
${message ? `Сообщение: ${message}` : ""}

---
Отправлено с сайта ekbmotor.ru
    `.trim()

    // Send email using Resend or other email service
    // For now, we'll use a simple fetch to a mail service
    // You can replace this with your preferred email provider
    
    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (RESEND_API_KEY) {
      // If Resend API key is available, use it
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "EkbMotor <noreply@ekbmotor.ru>",
          to: ["info@elitegas.ru"],
          subject: emailSubject,
          text: emailBody,
        }),
      })

      if (!response.ok) {
        console.error("Email send failed:", await response.text())
        // Still return success to user - email failure shouldn't block the form
      }
    } else {
      // Log the submission for debugging when no email service is configured
      console.log("=== New Contact Form Submission ===")
      console.log("To: info@elitegas.ru")
      console.log("Subject:", emailSubject)
      console.log("Body:", emailBody)
      console.log("===================================")
    }

    return NextResponse.json({
      success: true,
      message: "Заявка успешно отправлена",
      clientName: name,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Произошла ошибка при отправке" },
      { status: 500 }
    )
  }
}
