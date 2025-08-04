import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useStaffAuthStore } from '@/store/staffAuthStore';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const StaffSignup = () => {
    const { staffSignup, isStaffLoading, staffError, clearStaffError } = useStaffAuthStore();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const [passwordsMatch, setPasswordsMatch] = useState(true);

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

        // Check password match
        if (id === 'password' || id === 'confirmPassword') {
            const newFormData = { ...formData, [id]: value };
            setPasswordsMatch(newFormData.password === newFormData.confirmPassword);
        }
    };

    const handleRoleChange = (value) => {
        setFormData(prev => ({
            ...prev,
            role: value
        }));
        
        if (staffError) {
            clearStaffError();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword || !formData.role) {
            return;
        }

        if (!passwordsMatch) {
            return;
        }

        try {
            await staffSignup(formData.email, formData.username, formData.password, formData.role);
        } catch (error) {
            // Error is handled by the store
            console.error('Signup failed:', error);
        }
    }

    useEffect(() => {
        document.title = "Staff Signup | RegalStay";
        
        // Clear any errors when component mounts
        return () => {
            clearStaffError();
        };
    }, [clearStaffError]);

    return (
        <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black'>
            <div className='w-full max-w-sm mt-10'>
                <div className={cn("flex flex-col gap-6")}>
                    <Card className="bg-transparent border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-green-500 text-2xl">Staff Registration</CardTitle>
                            <CardDescription className="text-gray-400">
                                Create a new staff account to access the system.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-6'>
                                    {staffError && (
                                        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
                                            {staffError}
                                        </div>
                                    )}
                                    
                                    <div className='grid gap-3'>
                                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="staff@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isStaffLoading}
                                            className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                                        />
                                    </div>

                                    <div className='grid gap-3'>
                                        <Label htmlFor="username" className="text-gray-300">Username</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="Enter username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isStaffLoading}
                                            className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="role" className="text-gray-300">Role</Label>
                                        <Select value={formData.role} onValueChange={handleRoleChange} disabled={isStaffLoading}>
                                            <SelectTrigger className="bg-transparent border-gray-700 text-white">
                                                <SelectValue placeholder="Select staff role" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="RECEPTIONIST" className="text-white hover:bg-gray-700">Receptionist</SelectItem>
                                                <SelectItem value="HOUSEKEEPER" className="text-white hover:bg-gray-700">Housekeeper</SelectItem>
                                                <SelectItem value="MANAGER" className="text-white hover:bg-gray-700">Manager</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="password" className="text-gray-300">Password</Label>
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

                                    <div className="grid gap-3">
                                        <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isStaffLoading}
                                            className={cn(
                                                "bg-transparent border-gray-700 text-white",
                                                !passwordsMatch && formData.confirmPassword && "border-red-500"
                                            )}
                                        />
                                        {!passwordsMatch && formData.confirmPassword && (
                                            <p className="text-sm text-red-500">Passwords do not match</p>
                                        )}
                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        <Button
                                            type="submit"
                                            disabled={
                                                isStaffLoading || 
                                                !formData.email || 
                                                !formData.username || 
                                                !formData.password || 
                                                !formData.confirmPassword || 
                                                !formData.role ||
                                                !passwordsMatch
                                            }
                                            className="w-full bg-green-500 text-black hover:bg-green-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isStaffLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Creating Account...
                                                </>
                                            ) : (
                                                'Create Account'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 text-center text-sm text-gray-400">
                                    Already have a staff account?{" "}
                                    <a href="/secure-auth/staff-login" className="underline underline-offset-4 text-white hover:text-green-500">
                                        Login here
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

export default StaffSignup
