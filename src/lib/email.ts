import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type InquiryType = 'general' | 'tour' | 'transfer' | 'instructor' | 'apartment'

type InquiryEmailData = {
  clientEmail: string
  clientName: string
  clientPhone?: string
  groupSize?: number
  inquiryType: InquiryType
  language: string
  lessonType?: string
  message?: string
  preferredDate?: string
  preferredDateEnd?: string
  route?: string
  skillLevel?: string
}

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

const TYPE_LABELS: Record<InquiryType, string> = {
  apartment: 'Apartment Booking',
  general: 'General Inquiry',
  instructor: 'Instructor Request',
  tour: 'Tour Booking',
  transfer: 'Transfer Request',
}

const TYPE_COLORS: Record<InquiryType, string> = {
  apartment: '#8b5cf6',
  general: '#6b7280',
  instructor: '#f59e0b',
  tour: '#10b981',
  transfer: '#3b82f6',
}

const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f3f4f6; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
  .header { padding: 24px; color: #ffffff; }
  .content { padding: 24px; }
  .field { margin-bottom: 16px; }
  .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .value { font-size: 16px; color: #111827; }
  .section { background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
  .message-box { background: #f9fafb; border-left: 4px solid #d1d5db; padding: 16px; margin-top: 16px; }
  .footer { padding: 16px 24px; background: #f9fafb; font-size: 12px; color: #6b7280; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; color: #ffffff; }
`

const getTypeSpecificFields = (data: InquiryEmailData): string => {
  const { groupSize, inquiryType, lessonType, preferredDate, preferredDateEnd, route, skillLevel } =
    data
  const fields: string[] = []

  if (inquiryType === 'transfer') {
    if (route) {
      fields.push(`
        <div class="field">
          <div class="label">Route</div>
          <div class="value">${escapeHtml(route)}</div>
        </div>
      `)
    }

    if (groupSize) {
      fields.push(`
        <div class="field">
          <div class="label">Passengers</div>
          <div class="value">${groupSize}</div>
        </div>
      `)
    }

    if (preferredDate) {
      fields.push(`
        <div class="field">
          <div class="label">Preferred Date</div>
          <div class="value">${formatDate(preferredDate)}</div>
        </div>
      `)
    }
  }

  if (inquiryType === 'tour') {
    if (groupSize) {
      fields.push(`
        <div class="field">
          <div class="label">Group Size</div>
          <div class="value">${groupSize} people</div>
        </div>
      `)
    }

    if (preferredDate) {
      fields.push(`
        <div class="field">
          <div class="label">Preferred Date</div>
          <div class="value">${formatDate(preferredDate)}</div>
        </div>
      `)
    }
  }

  if (inquiryType === 'apartment') {
    if (preferredDate) {
      fields.push(`
        <div class="field">
          <div class="label">Check-in</div>
          <div class="value">${formatDate(preferredDate)}</div>
        </div>
      `)
    }

    if (preferredDateEnd) {
      fields.push(`
        <div class="field">
          <div class="label">Check-out</div>
          <div class="value">${formatDate(preferredDateEnd)}</div>
        </div>
      `)
    }

    if (groupSize) {
      fields.push(`
        <div class="field">
          <div class="label">Guests</div>
          <div class="value">${groupSize}</div>
        </div>
      `)
    }
  }

  if (inquiryType === 'instructor') {
    if (lessonType) {
      fields.push(`
        <div class="field">
          <div class="label">Lesson Type</div>
          <div class="value">${escapeHtml(lessonType)}</div>
        </div>
      `)
    }

    if (skillLevel) {
      fields.push(`
        <div class="field">
          <div class="label">Skill Level</div>
          <div class="value">${escapeHtml(skillLevel)}</div>
        </div>
      `)
    }

    if (preferredDate) {
      fields.push(`
        <div class="field">
          <div class="label">Preferred Date</div>
          <div class="value">${formatDate(preferredDate)}</div>
        </div>
      `)
    }
  }

  return fields.length > 0 ? `<div class="section">${fields.join('')}</div>` : ''
}

const getEmailHtml = (data: InquiryEmailData): string => {
  const { clientEmail, clientName, clientPhone, inquiryType, language, message } = data
  const color = TYPE_COLORS[inquiryType]
  const typeLabel = TYPE_LABELS[inquiryType]
  const typeSpecificFields = getTypeSpecificFields(data)
  const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : ''

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header" style="background: ${color};">
          <h1 style="margin: 0; font-size: 20px; font-weight: 600;">New ${typeLabel}</h1>
          <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">from ${escapeHtml(clientName)}</p>
        </div>

        <div class="content">
          <div class="section">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${escapeHtml(clientName)}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${escapeHtml(clientEmail)}" style="color: ${color};">${escapeHtml(clientEmail)}</a></div>
            </div>
            ${
              clientPhone
                ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value"><a href="tel:${escapeHtml(clientPhone)}" style="color: ${color};">${escapeHtml(clientPhone)}</a></div>
            </div>
            `
                : ''
            }
            <div class="field" style="margin-bottom: 0;">
              <div class="label">Language</div>
              <div class="value">${language.toUpperCase()}</div>
            </div>
          </div>

          ${typeSpecificFields}

          ${
            safeMessage
              ? `
          <div>
            <div class="label">Message</div>
            <div class="message-box">
              <div class="value">${safeMessage}</div>
            </div>
          </div>
          `
              : ''
          }
        </div>

        <div class="footer">
          <span class="badge" style="background: ${color};">${typeLabel}</span>
          <span style="margin-left: 8px;">Powder Georgia</span>
        </div>
      </div>
    </body>
    </html>
  `
}

export const sendInquiryNotification = async (data: InquiryEmailData) => {
  const adminEmail = process.env.ADMIN_EMAIL

  if (!adminEmail) {
    console.error('ADMIN_EMAIL not configured')

    return { error: 'Email not configured', success: false }
  }

  try {
    const fromEmail = process.env.EMAIL_FROM || '<onboarding@resend.dev>'
    const typeLabel = TYPE_LABELS[data.inquiryType]

    const { error: emailError } = await resend.emails.send({
      from: `Powder Georgia ${fromEmail}`,
      html: getEmailHtml(data),
      subject: `${typeLabel} from ${data.clientName}`,
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
