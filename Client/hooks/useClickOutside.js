// frontend/hooks/useClickOutside.js
import { useEffect, useRef } from 'react';

/**
 * Custom hook to detect clicks outside a specified element.
 *
 * @param {function} handler - Function to call when a click outside is detected.
 * @param {boolean} listenCapturing - Whether to listen on the capturing phase (default true).
 * @returns {React.RefObject} - Ref to attach to the element to monitor.
 */
function useClickOutside(handler, listenCapturing = true) {
    const ref = useRef();

    useEffect(() => {
        function handleClick(e) {
            // Check if the clicked element is contained within the ref'd element
            if (ref.current && !ref.current.contains(e.target)) {
                handler(); // Call the handler function if click is outside
            }
        }

        // Add event listener
        document.addEventListener('click', handleClick, listenCapturing);

        // Cleanup function to remove event listener
        return () => document.removeEventListener('click', handleClick, listenCapturing);

    }, [handler, listenCapturing]); // Re-run effect if handler or capture phase changes

    return ref; // Return the ref for the component to use
}

// Example Usage in a component:
// import useClickOutside from '@/hooks/useClickOutside';
//
// function MyDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useClickOutside(() => setIsOpen(false)); // Close dropdown on outside click
//
//   return (
//     <div ref={dropdownRef} className="relative">
//       <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
//       {isOpen && (
//         <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded p-4">
//           Dropdown content...
//         </div>
//       )}
//     </div>
//   );
// }

export default useClickOutside;