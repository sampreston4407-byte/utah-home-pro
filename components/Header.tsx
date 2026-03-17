import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Roofing', href: '/category/roofing' },
  { label: 'Plumbing', href: '/category/plumbing' },
  { label: 'HVAC', href: '/category/hvac' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-lora text-xl font-bold text-charcoal hover:text-accent transition-colors shrink-0"
        >
          Utah Home Pro
        </Link>
        <nav className="flex items-center gap-5 flex-wrap justify-end">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-accent transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
