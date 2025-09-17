// frontend/components/common/Modal.js
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import useClickOutside from '@/hooks/useClickOutside'; // Assuming you have this hook

const Modal = ({ isOpen, onClose, title, children }) => {
    const modalRef = useClickOutside(onClose); // Close modal on click outside

    if (!isOpen) return null;

    return (
        // Backdrop
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4 transition-opacity duration-300"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Modal Content */}
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
            >
                 {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 id="modal-title" className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full p-1"
                        aria-label="Close modal"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;