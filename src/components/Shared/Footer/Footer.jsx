import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 via-blue-600 to-blue-700 text-gray-200 px-6 pt-10">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About eTuitionBd</h3>
          <p className="text-sm text-gray-300">
            eTuitionBd is a modern tuition management platform connecting students and verified tutors. Find, apply, and manage tuitions seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-lime-300">Home</Link></li>
            <li><Link to="/tuitions" className="hover:text-lime-300">Tuitions</Link></li>
            <li><Link to="/tutors" className="hover:text-lime-300">Tutors</Link></li>
            <li><Link to="/about" className="hover:text-lime-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-lime-300">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-300">Email: support@etuitionbd.com</p>
          <p className="text-sm text-gray-300">Phone: +880 1234 567890</p>
          <p className="text-sm text-gray-300">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-lime-300"><FaXTwitter size={20} /></a>
            <a href="#" className="hover:text-lime-300"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-lime-300"><FaLinkedinIn size={20} /></a>
            <a href="#" className="hover:text-lime-300"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 py-4 text-center text-sm text-gray-400">
        © 2025-2026 eTuitionBd Inc. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
