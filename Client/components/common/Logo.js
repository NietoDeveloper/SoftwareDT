// frontend/components/common/Logo.js
import Image from 'next/image';
import Link from 'next/link';

/**
 * Reusable Logo component that acts as a link to the homepage.
 * Uses modern Next.js <Link> and <Image> components.
 * @param {string} className - Optional Tailwind classes for sizing/styling the Link container.
 */
const Logo = ({ className = "h-8 w-auto" }) => {
  return (
    // The Link component itself is the clickable anchor element.
    // Apply layout and interaction styles directly to it.
    <Link
      href="/"
      // Apply dynamic classes for sizing etc.
      className={`flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded ${className}`}
      // Accessibility improvement
      aria-label="Go to homepage"
      legacyBehavior>
      {/* Render the Image directly inside the Link */}
      <Image
        src="/logo.png" // Path relative to the public folder - MAKE SURE logo.svg exists in /public
        alt="Your E-commerce Logo" // Descriptive alt text
        width={60} // Provide intrinsic width of your SVG/image file (adjust if needed)
        height={16} // Provide intrinsic height of your SVG/image file (adjust if needed)
        priority // Prioritize loading as it's likely in the LCP (Largest Contentful Paint) area (Navbar)
        // No className needed here usually, sizing is controlled by width/height or parent className
      />
      {/* Optional: Add text next to the logo if desired */}
      {/* <span className="ml-2 text-xl font-semibold text-gray-800 hidden sm:inline">MyApp</span> */}
    </Link>
  );
};

export default Logo;