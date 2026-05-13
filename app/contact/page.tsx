import type { Metadata } from 'next'
import { SmartIntakeForm } from '@/components/ai/SmartIntakeForm'
import { getSiteSettings } from '@/lib/site-settings'

export const metadata: Metadata = {
  title: 'Contact | Ray',
  description: 'Get in touch for consultations, project inquiries, or technical help.',
}

export default async function Contact() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="bg-light">
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-dark mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            Whether you need help with something specific or just want to chat about what's possible, 
            I'm here. No high-pressure sales—I just want to help if I can.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Try the "AI Assist" button after writing your message. It will help 
              classify your request and suggest the best next step.
            </p>
          </div>
          <SmartIntakeForm />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-6 text-center">
            Other ways to reach me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-medium text-dark mb-2">Email</h3>
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="text-primary hover:underline text-sm"
              >
                {siteSettings.contactEmail}
              </a>
            </div>
            <div>
              <h3 className="font-medium text-dark mb-2">Location</h3>
              <p className="text-gray-600 text-sm">
                {siteSettings.locationLabel || 'Available remotely & local area'}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-dark mb-2">Phone</h3>
              {siteSettings.contactPhone ? (
                <a href={`tel:${siteSettings.contactPhone}`} className="text-primary hover:underline text-sm">
                  {siteSettings.contactPhone}
                </a>
              ) : (
                <p className="text-gray-600 text-sm">Provided on request</p>
              )}
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium text-dark mb-2">Response time</h3>
              <p className="text-gray-600 text-sm">Usually within 24-48 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
