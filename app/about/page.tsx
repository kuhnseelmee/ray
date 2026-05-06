import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'About | Ray',
  description: 'Learn about Ray\'s background, experience, and approach to solving real-world technology problems.',
}

const values = [
  {
    title: 'Practical over theoretical',
    description: 'I focus on solutions that actually work for your situation, not the most complex or impressive approach.',
  },
  {
    title: 'Clear communication',
    description: 'No unnecessary jargon. I explain things at your pace and make sure you understand what we\'re doing.',
  },
  {
    title: 'Long-term thinking',
    description: 'I build solutions that last and relationships that grow, not quick fixes that fall apart.',
  },
  {
    title: 'Your success is my success',
    description: 'When your systems work and your business runs smoother, we\'ve both succeeded.',
  },
]

export default function About() {
  return (
    <div className="bg-light">
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-dark mb-8">About Me</h1>
          
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              I'm a practical technologist with hands-on experience across multiple domains. 
              I help businesses and individuals solve technical problems, improve systems, 
              and build practical digital solutions.
            </p>
            
            <p className="mb-6">
              My background spans IT support, systems administration, web development, business 
              process improvement, and digital operations. I understand both the 
              technical and practical sides of getting things done—what works in the 
              real world versus what only looks good on paper.
            </p>
            
            <p className="mb-6">
              I've worked with small businesses, service organisations, property managers, and 
              individuals who need someone who can diagnose problems, fix what's broken, 
              improve what isn't working well, and build practical solutions 
              without overcomplicating things.
            </p>
            
            <p>
              What I'm not: I'm not a "passionate developer" who builds things 
              that are technically impressive but practically useless. I'm 
              not interested in using the latest framework just because 
              it's new. I care about results that help your business run 
              better.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-8">How I work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent>
                  <h3 className="text-lg font-semibold text-dark mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-8">Why I'm different</h2>
          
          <Card>
            <CardContent>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span><strong className="text-dark">Broad experience:</strong> I don't just do one thing. I can help with computer issues, websites, business systems, and workflow improvements.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span><strong className="text-dark">Practical focus:</strong> My goal is solving your problem, not showcasing my technical skills.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span><strong className="text-dark">No gatekeeping:</strong> I explain things clearly and never make you feel silly for asking questions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span><strong className="text-dark">Reliable:</strong> I show up, do the work, and follow through.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}