import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout