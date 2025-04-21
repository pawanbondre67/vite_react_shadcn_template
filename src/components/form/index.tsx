
// import React, { useState, ChangeEvent, FormEvent } from 'react';

// interface FormData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: string;
//     id?: string; // Optional id property
// }

// interface FormErrors {
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     age?: string;
// }

// interface FormPageProps {
//     onSubmit: (updatedUser: any) => void;
//     onCancel?: () => void;
//     user?: FormData; 
// }

// const FormPage: React.FC<FormPageProps> = ({ onSubmit, onCancel, user }) => {

//     console.log('FormPage user:', user); // Log the user prop
//     const [formData, setFormData] = useState<FormData>(user || { firstName: '', lastName: '', email: '', age: '' });
//     const [errors, setErrors] = useState<FormErrors>({});
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setErrors({ ...errors, [name]: '' });
//     };

//     const validateForm = (): FormErrors => {
//         const newErrors: FormErrors = {};
//         if (!formData.firstName) newErrors.firstName = 'First Name is required';
//         if (!formData.lastName) newErrors.lastName = 'Last Name is required';
//         if (!formData.email) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }
//         if (!formData.age) {
//             newErrors.age = 'Age is required';
//         } else if (isNaN(Number(formData.age))) {
//             newErrors.age = 'Age must be a number';
//         }
//         return newErrors;
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         const validationErrors = validateForm();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }
    
//         onSubmit({ ...formData, id: user?.id });

//         setIsSubmitting(true);
//         try {
//             // Simulate form submission
//             console.log('Form submitted:', formData);
         
//             setFormData({ firstName: '', lastName: '', email: '', age: '' });
//         } catch (error) {
//             console.error('Submission error:', error);
//         } finally {
//             setIsSubmitting(false);
//             onCancel && onCancel(); // Call the onCancel prop function
//         }
//     };

//     const handleCancel = () => {
//         setFormData({ firstName: '', lastName: '', email: '', age: '' });
//         setErrors({});
//         onCancel && onCancel(); // Call the onCancel prop function
//     };

//     return (

//             <div className="bg-white px-10 py-3 rounded-lg shadow-lg w-full ">
//                 <h1 className="text-3xl font-bold mb-6 text-center">User Details</h1>

//                 <form onSubmit={handleSubmit} className="space-y-2">
//                     {/* Profile Picture */}
//                     <div className="flex flex-col gap-2 items-center">
//                         <label htmlFor="profilePic" className="text-sm font-medium">Profile Picture</label>
//                         <div
//                             className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
//                             onClick={() => document.getElementById('profilePic')?.click()}
//                         >
//                             <img
//                                 id="profilePicPreview"
//                                 alt="Profile Preview"
//                                 className="w-full h-full object-cover"
//                                 style={{ display: 'none' }}
//                             />
//                         </div>
//                         <input
//                             type="file"
//                             name="profilePic"
//                             id="profilePic"
//                             accept="image/*"
//                             onChange={(e) => {
//                                 const file = e.target.files?.[0];
//                                 if (file) {
//                                     if (!file.type.startsWith('image/')) {
//                                         alert('Please upload a valid image file');
//                                         return;
//                                     }
//                                     const reader = new FileReader();
//                                     reader.onload = () => {
//                                         const imgElement = document.getElementById('profilePicPreview') as HTMLImageElement;
//                                         if (imgElement) {
//                                             imgElement.src = reader.result as string;
//                                             imgElement.style.display = 'block';
//                                         }
//                                     };
//                                     reader.readAsDataURL(file);
//                                 }
//                             }}
//                             className="border rounded-lg p-2 border-gray-300 mt-2"
//                             aria-label="Upload Profile Picture"
//                             style={{ display: 'none' }}
//                         />
//                     </div>

//                     {/* First Name */}
//                     <div className="flex flex-col gap-2">
//                         <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
//                         <input
//                             type="text"
//                             name="firstName"
//                             id="firstName"
//                             placeholder="Enter your first name"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             className={`border rounded-lg p-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
//                         />
//                         {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
//                     </div>

//                     {/* Last Name */}
//                     <div className="flex flex-col gap-2">
//                         <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
//                         <input
//                             type="text"
//                             name="lastName"
//                             id="lastName"
//                             placeholder="Enter your last name"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             className={`border rounded-lg p-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
//                         />
//                         {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
//                     </div>

//                     {/* Email */}
//                     <div className="flex flex-col gap-2">
//                         <label htmlFor="email" className="text-sm font-medium">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             placeholder="Enter your email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className={`border rounded-lg p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                         />
//                         {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
//                     </div>

//                     {/* Age */}
//                     <div className="flex flex-col gap-2">
//                         <label htmlFor="age" className="text-sm font-medium">Age</label>
//                         <input
//                             type="text"
//                             name="age"
//                             id="age"
//                             placeholder="Enter your age"
//                             value={formData.age}
//                             onChange={handleChange}
//                             className={`border rounded-lg p-2 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
//                         />
//                         {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
//                     </div>

//                     {/* Buttons */}
//                     <div className="sm:flex sm:flex-row-reverse flex gap-4">
//                         <button
//                             className="w-fit rounded-lg text-sm px-5 focus:outline-none h-[40px] border bg-violet-500 hover:bg-violet-600 focus:bg-violet-700 border-violet-500 text-white focus:ring-4 focus:ring-violet-200 hover:ring-4 hover:ring-violet-100 transition-all duration-300"
//                             type="submit"
//                         >
//                             {isSubmitting ? (
//                                 <div className="flex gap-2 justify-center items-center">
//                                     Submitting
//                                 </div>
//                             ) : (
//                                 'Submit'
//                             )}
//                         </button>
//                         <button
//                             className="w-fit rounded-lg text-sm px-5 focus:outline-none h-[40px] border bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
//                             type="button"
//                             onClick={handleCancel}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             </div>
     
//     );
// };

// export default FormPage;



import useStudentService from '@/api/services';
import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
interface FormData {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    profilePic?: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
}

interface FormPageProps {
    onSubmit: (formData: FormData) => void;
    onCancel?: () => void;
    user?: FormData | null;
}

const FormPage: React.FC<FormPageProps> = React.memo(({ onSubmit, onCancel, user }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { createStudent,updateStudent } = useStudentService(); // Assuming studentService is imported correctly
    // Log the user prop to see its value
    console.log('FormPage user:', user); // Log the user prop
    // Initialize form with user data when user prop changes
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                id: user.id,
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                age: 0,
            });
        }
        setErrors({});
    }, [user]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    }, []);

    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.age) {
            newErrors.age = 'Age is required';
            isValid = false;
        } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
            newErrors.age = 'Age must be a positive number';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }, [formData]);

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            const userData = {
                ...formData,
                age: formData.age,
            };
            if (user?.id) {
                const res = await updateStudent(String(user.id), userData);
                console.log('Student updated:', res);
            } else {
                const res = await createStudent(userData);
                console.log('Student created:', res);
            }
            onSubmit(userData);
        } catch (error) {
            console.error('Submission error:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    }, [formData, onSubmit, validateForm]);

    const handleCancel = useCallback(() => {
        onCancel?.();
    }, [onCancel]);

    const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            // In a real app, you would upload the image to a server
            // and get back a URL to store in your database
            setFormData(prev => ({ 
                ...prev, 
                profilePic: reader.result as string 
            }));
        };
        reader.readAsDataURL(file);
    }, []);

    return (
        <div className="bg-white px-6 py-4   rounded-lg shadow-lg w-full">
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                    <label htmlFor="profilePic" className="cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
                            {formData.profilePic ? (
                                <img 
                                    src={formData.profilePic} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500 text-center">Upload Photo</span>
                            )}
                        </div>
                        <input
                            type="file"
                            id="profilePic"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>

                <FormField
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    placeholder="Enter first name"
                />

                <FormField
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    placeholder="Enter last name"
                />

                <FormField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Enter email"
                />

                <FormField
                    label="Age"
                    id="age"
                    name="age"
                    type="number"
                    value={String(formData.age)}
                    onChange={handleChange}
                    error={errors.age}
                    placeholder="Enter age"
                />

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
});

const FormField = React.memo(({
    label,
    id,
    name,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
}: {
    label: string;
    id: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder: string;
}) => (
    <div className="space-y-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`block w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
));

export default FormPage;