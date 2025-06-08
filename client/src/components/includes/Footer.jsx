import React from 'react'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="text-green-500">Regal</span><span className="text-white">Stay</span>
                        </h3>
                        <p className="text-gray-400 mb-4">Experience Regally and comfort in our premium hotel accommodations.</p>
                        <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                                <span className="text-black text-2xl font-bold"><FaFacebookSquare /></span>
                            </div>
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                                <span className="text-black text-2xl font-bold"><FaSquareXTwitter /></span>
                            </div>
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                                <span className="text-black text-2xl font-bold"><FaInstagramSquare /></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-green-500">Services</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Apartments</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Spa & Wellness</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Restaurant</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Event Planning</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-green-500">Contact Info</h4>
                        <div className="space-y-2 text-gray-400">
                            <p>📍 123 Regalury Street, City Center</p>
                            <p>📞 +1 (555) 123-4567</p>
                            <p>✉️ info@Regalstay.com</p>
                            <p>🕒 24/7 Customer Service</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-green-500/20 mt-8 pt-8 text-center">
                    <p className="text-gray-400">&copy; {currentYear} RegalStay Hotel. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer