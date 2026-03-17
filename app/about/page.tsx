import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Utah Home Pro is an independent resource for Utah homeowners looking for honest, researched contractor recommendations across Utah Valley and Salt Lake County.',
}

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-14">
      <h1 className="font-lora text-4xl font-bold text-charcoal mb-8 leading-tight">
        About Utah Home Pro
      </h1>

      <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
        <p>
          Utah Home Pro is an independent resource for Utah homeowners looking
          for honest, researched contractor recommendations across Utah Valley
          and Salt Lake County. We research local companies so you don&rsquo;t
          have to.
        </p>
        <p>
          We cover roofing, plumbing, HVAC, and other home services along the
          Wasatch Front — from Salt Lake City south through Provo, Orem, and
          Spanish Fork. Our recommendations are based on licensing verification,
          local tenure, manufacturer certifications, and what Utah homeowners
          consistently report about their experiences.
        </p>
        <p>
          We don&rsquo;t accept paid placements or sponsored content. If a
          company appears at the top of one of our lists, it&rsquo;s because we
          believe they&rsquo;re the best option for most homeowners in that
          category &mdash; not because they paid to be there.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h2 className="font-lora text-xl font-semibold text-charcoal mb-4">
          Browse by category
        </h2>
        <nav className="flex flex-wrap gap-3">
          {['Roofing', 'Plumbing', 'HVAC', 'General'].map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:border-accent hover:text-accent transition-colors"
            >
              {cat}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
