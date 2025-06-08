import Header from '@/components/includes/Header'
import { Button } from '@/components/ui/button'
import React from 'react'

const Dashboard = () => {
    return (
        <div>
            <Header />
            <h1 className=' text-3xl'>Dashboard</h1>

            <Button>
                Click me
            </Button>
        </div>
    )
}

export default Dashboard