import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

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
    const safeName = escapeHtml(clientName)
    const safeEmail = escapeHtml(clientEmail)
    const safePhone = clientPhone ? escapeHtml(clientPhone) : ''
    const safeType = escapeHtml(inquiryType)
    const safeMessage = escapeHtml(message)

    const fromEmail = process.env.EMAIL_FROM || '<onboarding@resend.dev>'

    const { error: emailError } = await resend.emails.send({
      from: `Powder Georgia ${fromEmail}`,
      html: `
        <h2>New Inquiry from ${safeName}</h2>
        <p><strong>Type:</strong> ${safeType}</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
        <p><strong>Language:</strong> ${language}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
      subject: `New ${safeType} inquiry from ${safeName}`,
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
