import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdminAuthStore } from '@/store/adminAuthStore'
import { toast } from 'sonner'
import React, { useEffect, useState } from 'react'

const AdminAccount = () => {

    const { admin, isAdminLoading, updateAdminProfile, updateAdminProfileImage, addSecondaryEmail } = useAdminAuthStore();

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
        email: admin?.admin_email || '',
        name: admin?.admin_username || '',
        password: '',
        secondaryEmail: '',
        profileImage: null
    });

    const [profileImagePreview, setProfileImagePreview] = useState(null);

    useEffect(() => {
        document.title = `${admin?.admin_username || 'Admin'} Information`
    }, [admin?.admin_username]);

    useEffect(() => {
        if (admin) {
            setFormData(prev => ({
                ...prev,
                email: admin.admin_email || '',
                name: admin.admin_username || ''
            }));
        }
    }, [admin]);

    const handleInputChange = (e) => {
        const { id, value, files } = e.target;
        
        if (id === 'profileImage' && files && files[0]) {
            const file = files[0];
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please select a valid image file");
                return;
            }
            
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
        
        if (!formData.name.trim()) {
            toast.error("Name is required");
            return;
        }

        try {
            const updateData = {
                adminUsername: formData.name,
                ...(formData.password && { adminPassword: formData.password })
            };

            const response = await updateAdminProfile(updateData);
            
            if (response.success) {
                toast.success("Profile updated successfully!");
                setFormData(prev => ({ ...prev, password: '' })); // Clear password field
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(error.message || "Failed to update profile");
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.profileImage) {
            toast.error("Please select an image first");
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('profileImage', formData.profileImage);

            const response = await updateAdminProfileImage(formDataToSend);
            
            if (response.success) {
                toast.success("Profile image updated successfully!");
                setProfileImagePreview(null);
                setFormData(prev => ({ ...prev, profileImage: null }));
                
                // Reset file input
                const fileInput = document.getElementById('profileImage');
                if (fileInput) fileInput.value = '';
            }
        } catch (error) {
            console.error("Profile image update error:", error);
            toast.error(error.message || "Failed to update profile image");
        }
    };

    const handleSecondaryEmailSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.secondaryEmail.trim()) {
            toast.error("Please enter a secondary email");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.secondaryEmail)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            const response = await addSecondaryEmail({
                secondaryEmail: formData.secondaryEmail
            });
            
            if (response.success) {
                toast.success("Secondary email added successfully!");
                setFormData(prev => ({ ...prev, secondaryEmail: '' }));
            }
        } catch (error) {
            console.error("Secondary email error:", error);
            toast.error(error.message || "Failed to add secondary email");
        }
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
                                    Created at: {formatDate(admin?.createdAt)}</p>
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
                                            placeholder={`${admin?.admin_email || ''}`}
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
                                            placeholder={`${admin?.admin_username || ''}`}
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className=" border-gray-700 text-white placeholder:text-gray-400"
                                            required
                                        />
                                    </div>

                                    <div className=' grid gap-3'>
                                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter new password (leave blank to keep current)"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className=" border-gray-700 text-white placeholder:text-gray-400"
                                        />
                                        <p className="text-xs text-gray-500">Leave blank if you don't want to change password</p>
                                    </div>

                                    <div className=' grid gap-3'>
                                        <Button 
                                            type="submit" 
                                            className="w-full bg-green-500 hover:bg-green-600 hover:text-white"
                                            disabled={isAdminLoading}
                                        >
                                            {isAdminLoading ? "Updating..." : "Update Account"}
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
                                                ) : admin?.profileImage ? (
                                                    <img 
                                                        src={`${import.meta.env.VITE_API_URL || "http://localhost:8080"}${admin.profileImage}`} 
                                                        alt="Current Profile" 
                                                        className='w-full h-full object-cover'
                                                    />
                                                ) : (
                                                    <span className='text-4xl font-bold text-gray-300'>
                                                        {admin?.admin_username ? admin.admin_username.charAt(0).toUpperCase() : 'A'}
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
                                        <Button 
                                            type="submit" 
                                            className="w-full bg-green-500 hover:bg-green-600 hover:text-white"
                                            disabled={isAdminLoading}
                                        >
                                            {isAdminLoading ? "Updating..." : "Update Profile Image"}
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
                    <form onSubmit={handleSecondaryEmailSubmit}>
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
                                    required
                                />
                            </div>

                            <div className=' grid gap-3'>
                                <Button 
                                    type="submit" 
                                    className=" w-1/3 ml-auto bg-green-500 hover:bg-green-600 hover:text-white"
                                    disabled={isAdminLoading}
                                >
                                    {isAdminLoading ? "Adding..." : "Add Secondary Email"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminAccount