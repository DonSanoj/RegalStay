import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);
        // Add your login logic here
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black">
            <div className="w-full max-w-sm mt-10">
                
                <div className={cn("flex flex-col gap-6")}>
                    <Card className="bg-transparent border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-green-500 text-2xl">Login to your account</CardTitle>
                            <CardDescription className="text-gray-400">
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-gray-400 hover:text-green-500"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input 
                                            id="password" 
                                            type="password" 
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required 
                                            className="bg-transparent border-gray-700 text-white" 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" className="w-full bg-green-500 text-black hover:bg-green-600 font-semibold">
                                            Login
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 text-center text-sm text-gray-400">
                                    Don&apos;t have an account?{" "}
                                    <a href="/auth/signup" className="underline underline-offset-4 text-white hover:text-green-500">
                                        Sign up
                                    </a>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default Login