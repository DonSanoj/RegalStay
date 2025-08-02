import React from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();

    return (
        <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className=" flex items-center">

                    <Link to="/">
                        <span className="text-green-500 text-2xl font-bold">Regal</span><span className="text-white text-2xl font-bold">Stay</span>
                    </Link>

                    <div className='ml-10 hidden md:flex space-x-6'>
                        <Link
                            to="/view-apartment"
                            className="text-white hover:text-green-500 transition-colors duration-300"
                        >
                            Apartment
                        </Link>
                        <Link
                            to="/about"
                            className="text-white hover:text-green-500 transition-colors duration-300"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-white hover:text-green-500 transition-colors duration-300"
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Button
                        className="text-green-500 bg-transparent hover:bg-green-500 hover:text-black transition-colors duration-300 border border-gray-600"
                        onClick={() => navigate("/auth/login")}
                    >
                        Login
                    </Button>
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded transition-all duration-300"
                        onClick={() => navigate("/auth/signup")}
                    >
                        Signup
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header