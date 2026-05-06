import type { Metadata } from 'next'
import Link from 'next/link'
import { skills } from '@/data/skills'
import { SkillGroupCard } from '@/components/SkillGroupCard'

export const metadata: Metadata = {
  title: 'Skills | Ray',
  description: 'A practical multidisciplinary skill set across software development, IT support, systems design, automation, cybersecurity awareness, data, and operations.',
}

export default function Skills() {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
            Capability built through execution, not theory.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A multidisciplinary skill set shaped by computer repair, software development, systems administration, property operations, automation, and real-world problem solving.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/services"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              View services
            </Link>
            <Link 
              href="/contact"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              Contact me
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((group) => (
              <SkillGroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof/Execution Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-8 text-center">
            What these skills mean in practice
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong className="text-dark">Systems that connect:</strong> I don't just build tools in isolation—I design how they fit together and with your team.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong className="text-dark">Proven under pressure:</strong> My skills come from real faults, real users, and real constraints—not tutorials.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong className="text-dark">Broad but deep:</strong> I span multiple domains, which means I can see solutions others miss.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong className="text-dark">Human-centered:</strong> I design for people, not just for code. Usability matters.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong className="text-dark">No hype:</strong> I give honest assessments. If something won't work, I'll tell you.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">
            See what I can do for you
          </h2>
          <p className="text-gray-600 mb-8">
            Browse my services or get in touch to discuss your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/services"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              View services
            </Link>
            <Link 
              href="/contact"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}