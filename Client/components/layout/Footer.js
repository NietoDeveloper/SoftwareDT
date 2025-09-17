// frontend/components/layout/Footer.js
import Link from 'next/link';
import Logo from '@/components/common/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-dark text-neutral-light mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
             {/* Logo & About */}
             <div>
                  <Logo />
                  <p className="text-sm text-gray-400">
                      Your modern e-commerce solution.
                  </p>
             </div>

             {/* Quick Links */}
             <div>
                 <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Quick Links</h3>
                 <ul className="space-y-2">
                 <li><Link href="/#products" scroll={true} className="text-gray-400 hover:text-white text-sm">Products</Link></li>
                     <li><Link href="/cart" className="text-gray-400 hover:text-white text-sm">Cart</Link></li>
                     <li><Link href="/profile" className="text-gray-400 hover:text-white text-sm">My Account</Link></li>
                     {/* Add Terms, Privacy Policy links etc. */}
                 </ul>
             </div>

             {/* Contact / Socials */}
             <div>
                 <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Contact Us</h3>
                 <p className="text-sm text-gray-400 mb-2">support@yourecommerce.com</p>
                 {/* Add Social Media Icons Here */}
             </div>
         </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">© {currentYear} Your E-commerce App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;