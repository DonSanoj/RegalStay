import React from 'react'

const NotFound = () => {
    return (
        <>
            <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
                <div className="text-center px-4 max-w-4xl animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
                        <span className="text-green-500 animate-pulse">404 Not Found</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-600 animate-slide-up animation-delay-200">
                        The page you are looking for does not exist.
                    </p>
                </div>
                {/* Floating animation elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-float"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-300 rounded-full opacity-40 animate-float animation-delay-1000"></div>
                <div className="absolute top-1/2 left-20 w-12 h-12 bg-green-100 rounded-full opacity-60 animate-float animation-delay-500"></div>
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
        </>
    )
}

export default NotFound