import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useStaffAuthStore } from '@/store/staffAuthStore';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const StaffLogin = () => {
    const { staffLogin, isStaffLoading, staffError, clearStaffError } = useStaffAuthStore();

    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        
        // Clear any existing errors when user starts typing
        if (staffError) {
            clearStaffError();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.usernameOrEmail || !formData.password) {
            return;
        }

        try {
            await staffLogin(formData.usernameOrEmail, formData.password);
        } catch (error) {
            // Error is handled by the store
            console.error('Login failed:', error);
        }
    }

    useEffect(() => {
        document.title = "Staff Login | RegalStay";
        
        // Clear any errors when component mounts
        return () => {
            clearStaffError();
        };
    }, [clearStaffError]);

    return (
        <div className=' flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black'>
            <div className=' w-full max-w-sm mt-10'>

                <div className={cn("flex flex-col gap-6")}>
                    <Card className="bg-transparent border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-green-500 text-2xl">Staff Login</CardTitle>
                            <CardDescription className="text-gray-400">
                                Enter your credentials to access the staff dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className=' flex flex-col gap-6'>
                                    {staffError && (
                                        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
                                            {staffError}
                                        </div>
                                    )}
                                    <div className=' grid gap-3'>
                                        <Label htmlFor="usernameOrEmail" className="text-gray-300">Username or Email</Label>
                                        <Input
                                            id="usernameOrEmail"
                                            type="text"
                                            placeholder="Enter username or email"
                                            value={formData.usernameOrEmail}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isStaffLoading}
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
                                            disabled={isStaffLoading}
                                            className="bg-transparent border-gray-700 text-white"
                                        />
                                    </div>
                                    <div className=' flex flex-col gap-3'>
                                        <Button
                                            type="submit"
                                            disabled={isStaffLoading || !formData.usernameOrEmail || !formData.password}
                                            className="w-full bg-green-500 text-black hover:bg-green-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isStaffLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Logging in...
                                                </>
                                            ) : (
                                                'Login'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className="mt-4 text-center text-sm text-gray-400">
                                    Don&apos;t have a staff account?{" "}
                                    <a href="/secure-auth/staff-signup" className="underline underline-offset-4 text-white hover:text-green-500">
                                        Register here
                                    </a>
                                </div> */}
                            </form>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default StaffLogin