import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 py-10 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <Link
              href="/"
              className="font-lora text-lg font-bold text-charcoal hover:text-accent transition-colors"
            >
              Utah Home Pro
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              Independent reviews for Utah homeowners
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
            <Link
              href="/category/roofing"
              className="hover:text-accent transition-colors"
            >
              Roofing
            </Link>
            <Link
              href="/category/plumbing"
              className="hover:text-accent transition-colors"
            >
              Plumbing
            </Link>
            <Link
              href="/category/hvac"
              className="hover:text-accent transition-colors"
            >
              HVAC
            </Link>
            <Link
              href="/category/general"
              className="hover:text-accent transition-colors"
            >
              General
            </Link>
            <Link
              href="/about"
              className="hover:text-accent transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
        <p className="text-xs text-gray-400 mt-8 text-center">
          &copy; 2026 Utah Home Pro &mdash; Independent contractor recommendations
          for Utah Valley and Salt Lake County homeowners.
        </p>
      </div>
    </footer>
  )
}
