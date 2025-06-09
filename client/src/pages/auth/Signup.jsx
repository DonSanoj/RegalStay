import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { signup, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            await signup(formData.email, formData.username, formData.password);
            toast.success("Account created successfully!");
            navigate('/customer');
        } catch (error) {
            console.error("Registration error:", error);
            
            // Handle different types of errors
            let errorMessage = "Registration failed. Please try again.";
            
            if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
                errorMessage = "Cannot connect to server. Please check if the backend server is running on port 8080.";
            } else if (error.code === 'ERR_CONNECTION_REFUSED') {
                errorMessage = "Server connection refused. Please ensure the backend server is running.";
            } else if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error?.message) {
                errorMessage = error.message;
            }
            
            toast.error(errorMessage);
        }
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
                                        <Button 
                                            type="submit" 
                                            disabled={isLoading}
                                            className="w-full bg-green-500 text-black hover:bg-green-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? "Creating Account..." : "Signup"}
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