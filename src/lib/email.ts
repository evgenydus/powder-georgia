import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type InquiryEmailData = {
  clientEmail: string
  clientName: string
  clientPhone?: string
  inquiryType: string
  language: string
  message: string
}

export const sendInquiryNotification = async (data: InquiryEmailData) => {
  const { clientEmail, clientName, clientPhone, inquiryType, language, message } = data

  const adminEmail = process.env.ADMIN_EMAIL

  if (!adminEmail) {
    console.error('ADMIN_EMAIL not configured')

    return { error: 'Email not configured', success: false }
  }

  try {
    const { error: emailError } = await resend.emails.send({
      from: 'Powder Georgia <onboarding@resend.dev>',
      html: `
        <h2>New Inquiry from ${clientName}</h2>
        <p><strong>Type:</strong> ${inquiryType}</p>
        <p><strong>Name:</strong> ${clientName}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        ${clientPhone ? `<p><strong>Phone:</strong> ${clientPhone}</p>` : ''}
        <p><strong>Language:</strong> ${language}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      subject: `New ${inquiryType} inquiry from ${clientName}`,
      to: adminEmail,
    })

    if (emailError) {
      console.error('Resend error:', emailError)

      return { error: emailError.message, success: false }
    }

    return { error: null, success: true }
  } catch (error) {
    console.error('Failed to send email:', error)

    return { error: 'Failed to send email', success: false }
  }
}
