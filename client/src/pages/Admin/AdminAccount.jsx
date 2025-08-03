import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdminAuthStore } from '@/store/adminAuthStore'
import React, { useEffect, useState } from 'react'

const AdminAccount = () => {

    const { admin } = useAdminAuthStore();

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid date';
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    const [formData, setFormData] = useState({
        email: admin.admin_email,
        name: admin.admin_username || '',
        password: '',
        secondaryEmail: ''
    });

    const [profileImagePreview, setProfileImagePreview] = useState(null);

    useEffect(() => {
        document.title = `${admin.admin_username} Information`
    }, [admin.admin_username]);

    const handleInputChange = (e) => {
        const { id, value, files } = e.target;
        
        if (id === 'profileImage' && files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
            
            setFormData(prev => ({
                ...prev,
                [id]: file
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-8">

            <Card>
                <CardHeader>
                    <CardTitle className="">
                        <div className=' flex justify-between'>
                            <div>
                                <h2 className="text-green-500 text-2xl">Personal Information</h2>
                                <p className="text-gray-400 text-sm">Manage your account details</p>
                            </div>
                            <div>
                                <p className=' text-gray-500 text-sm'>
                                    Created at: {formatDate(admin.createdAt)}</p>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className=' flex flex-row gap-20 w-full'>
                        <div className=' w-1/2'>
                            <form onSubmit={handleSubmit}>
                                <div className=' flex flex-col gap-6'>

                                    <div className=' grid gap-3'>
                                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={`${admin.admin_email}`}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className=" border-gray-700 text-white placeholder:text-white"
                                            disabled
                                        />
                                        <Label className="text-red-500 text-sm">
                                            *You can not change the primary email
                                        </Label>
                                    </div>

                                    <div className=' grid gap-3'>
                                        <Label htmlFor="name" className="text-gray-300">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder={`${admin.admin_username}`}
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className=" border-gray-700 text-white placeholder:text-gray-400"
                                        />
                                    </div>

                                    <div className=' grid gap-3'>
                                        <div className=' grid gap-3'>

                                        </div>
                                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter new password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className=" border-gray-700 text-white placeholder:text-gray-400"
                                        />
                                    </div>

                                    <div className=' grid gap-3'>
                                        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 hover:text-white">
                                            Update Account
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className=' w-1/2'>
                            <form onSubmit={handleProfileSubmit}>
                                <div className=' flex flex-col gap-6'>
                                    
                                    {/* Profile Image Preview */}
                                    <div className='flex justify-center mb-4'>
                                        <div className='relative'>
                                            <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-600 bg-gray-700 flex items-center justify-center'>
                                                {profileImagePreview ? (
                                                    <img 
                                                        src={profileImagePreview} 
                                                        alt="Profile Preview" 
                                                        className='w-full h-full object-cover'
                                                    />
                                                ) : (
                                                    <span className='text-4xl font-bold text-gray-300'>
                                                        {admin.admin_username ? admin.admin_username.charAt(0).toUpperCase() : 'A'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=' grid gap-3'>
                                        <Label htmlFor="profileImage" className="text-gray-300">Profile Image</Label>
                                        <Input
                                            id="profileImage"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleInputChange}
                                            className=" border-gray-700 text-white placeholder:text-gray-400 file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                                        />
                                        <p className="text-xs text-gray-500">Accepted formats: JPG, PNG, GIF (Max: 5MB)</p>
                                    </div>

                                    <div className=' grid gap-3'>
                                        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 hover:text-white">
                                            Update Profile Image
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-green-500 text-base">Add secondary email</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className=' flex flex-col gap-4'>
                        <div className=' grid gap-3'>
                            <Label htmlFor="secondaryEmail" className="text-gray-300">Secondary Email</Label>
                            <Input
                                id="secondaryEmail"
                                type="email"
                                placeholder="Enter secondary email"
                                value={formData.secondaryEmail}
                                onChange={handleInputChange}
                                className=" border-gray-700 text-white placeholder:text-gray-400"
                            />
                        </div>

                        <div className=' grid gap-3'>
                            <Button type="submit" className=" w-1/3 ml-auto bg-green-500 hover:bg-green-600 hover:text-white">
                                Add Secondary Email
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminAccount