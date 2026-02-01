'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/years', label: 'Capsules' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/search', label: 'Search' },
  { href: '/all-time', label: 'All-Time' },
  { href: '/my-capsule', label: 'MyCapsule' },
  { href: '/compare', label: 'Compare' },
];

const socialLinks = [
  { icon: '𝕏', label: 'Twitter', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '💼', label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-black/50">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-4"
            >
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="text-3xl">📼</span>
                <span className="font-bold text-xl text-white">Rewind</span>
              </Link>
            </motion.div>
            <p className="text-gray-400 text-sm mb-4">
              Relive the memes, music, and moments that defined each year of internet culture.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-retro-teal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* About */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-white mb-4">About</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your Spotify Wrapped for the entire internet 🎵
            </p>
            <p className="text-gray-500 text-sm">
              A nostalgic journey through internet culture
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Made with ❤️ for XHacks 2026
          </p>
          <p className="text-gray-600 text-sm">
            © 2026 Rewind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
