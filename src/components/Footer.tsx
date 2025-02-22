import type React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div className="col-span-2">
          <Link href="/" className="text-2xl font-bold mb-4 block">
            AuditAI
          </Link>
          <p className="text-gray-400 text-sm">
            AI-powered compliance automation platform for modern enterprises.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Security
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Enterprise
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                API Reference
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Status
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Security
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/10">
        <p className="text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} AuditAI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer

