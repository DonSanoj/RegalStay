import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        console.log('User Information:', formData);
        // Add your signup logic here
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black">
            <div className="w-full max-w-sm mt-14">

                <div className={cn("flex flex-col gap-6")}>
                    <Card className="bg-transparent border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-green-500 text-2xl">Create your account</CardTitle>
                            <CardDescription className="text-gray-400">
                                Enter information to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="username" className="text-gray-300">User Name</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                                        />
                                    </div>
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
                                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-transparent border-gray-700 text-white"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-transparent border-gray-700 text-white"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" className="w-full bg-green-500 text-black hover:bg-green-600 font-semibold">
                                            Signup
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 text-center text-sm text-gray-400">
                                    Already have an account?{" "}
                                    <a href="/auth/login" className="underline underline-offset-4 text-white hover:text-green-500">
                                        Login
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

export default Signup