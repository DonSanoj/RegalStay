import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import React from 'react'
import { FaHotel, FaStar } from 'react-icons/fa6';
import { IoIosPin } from "react-icons/io";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-black text-white">

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
                <div className="text-center px-4 max-w-4xl animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
                        Welcome to <span className="text-green-500 animate-pulse">RegalStay</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-600 animate-slide-up animation-delay-200">
                        Experience Regalury and comfort in our premium Apartments
                    </p>
                    <div className="space-x-4 animate-slide-up animation-delay-400">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            Book Now
                        </button>
                        <button className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            View Apartments
                        </button>
                    </div>
                </div>
                {/* Floating animation elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-float"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-300 rounded-full opacity-40 animate-float animation-delay-1000"></div>
                <div className="absolute top-1/2 left-20 w-12 h-12 bg-green-100 rounded-full opacity-60 animate-float animation-delay-500"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-white animate-fade-in-up">
                        Why Choose <span className="text-green-500">RegalStay</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-green-700 rounded-lg border border-green-500/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 animate-fade-in-up animation-delay-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                                <span className="text-2xl text-purple-500"><FaHotel /></span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">Premium Apartments</h3>
                            <p className="text-gray-300">Premium accommodations with modern amenities and stunning views</p>
                        </div>
                        <div className="text-center p-6 bg-green-700 rounded-lg border border-green-500/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 animate-fade-in-up animation-delay-400">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                                <span className="text-3xl text-yellow-500 "><FaStar /></span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">5-Star Service</h3>
                            <p className="text-gray-300">Exceptional hospitality and personalized service for every guest</p>
                        </div>
                        <div className="text-center p-6 bg-green-700 rounded-lg border border-green-500/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 animate-fade-in-up animation-delay-600">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                                <span className="text-3xl text-red-400"> <IoIosPin /> </span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">Prime Location</h3>
                            <p className="text-gray-300">Located in the heart of the city with easy access to attractions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6 text-white animate-fade-in-up">Ready for Your Perfect Stay?</h2>
                    <p className="text-xl mb-8 text-white/90 animate-fade-in-up animation-delay-200">Book your room today and experience Regalury like never before</p>
                    <Button className="h-14 bg-black text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-400">
                        Start Booking Now
                    </Button>
                </div>
                {/* Background animation elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/5 rounded-full animate-pulse animation-delay-1000"></div>
            </section>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slide-up {
                    from { 
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fade-in-up {
                    from { 
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                .animate-fade-in { 
                    animation: fade-in 1s ease-out;
                }
                
                .animate-slide-up { 
                    animation: slide-up 0.8s ease-out;
                }
                
                .animate-fade-in-up { 
                    animation: fade-in-up 0.8s ease-out;
                }
                
                .animate-float { 
                    animation: float 3s ease-in-out infinite;
                }
                
                .animation-delay-200 { 
                    animation-delay: 0.2s;
                    animation-fill-mode: both;
                }
                
                .animation-delay-400 { 
                    animation-delay: 0.4s;
                    animation-fill-mode: both;
                }
                
                .animation-delay-500 { 
                    animation-delay: 0.5s;
                    animation-fill-mode: both;
                }
                
                .animation-delay-600 { 
                    animation-delay: 0.6s;
                    animation-fill-mode: both;
                }
                
                .animation-delay-1000 { 
                    animation-delay: 1s;
                    animation-fill-mode: both;
                }
            `}</style>
        </div>
    )
}

export default HomePage