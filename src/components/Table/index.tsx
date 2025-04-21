


import React, { useState, useCallback, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import FormPage from '../form';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useAuth } from '@/context/AuthContext';
import useStudentService from '@/api/services';
import { toast } from 'react-toastify';

interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    profilePic?: string;
}

// const initialUsers: User[] = [
//     { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', age: 30 },
//     { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', age: 28 },
//     { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', age: 25 },
//     { id: 4, firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', age: 32 },
//     { id: 5, firstName: 'Charlie', lastName: 'Davis', email: 'charlie.davis@example.com', age: 29 },
//     { id: 10, firstName: 'David', lastName: 'Wilson', email: 'david.wilson@example.com', age: 27 },
// ];

const TableDemo = () => {
    const [users, setUsers] = useState<User[]>([]);
    const {logout} = useAuth();

    const {getAllStudents , deleteStudent} = useStudentService(); 
    
    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await getAllStudents();
                 console.log('Fetched students:', response);
                setUsers(response);
            
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
        getStudents();
    }
    , []);
   
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        editingUser: null as User | null,
    });

    const handleEdit = useCallback((user: User) => {
        setDialogState({ isOpen: true, editingUser: user });
    }, []);

    const handleDelete = useCallback(async (id: number) => {
        try {
            await deleteStudent(id.toString());
            
        await getAllStudents().then(setUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }, [deleteStudent]);

    const handleFormSubmit = useCallback(async (updatedUser: User) => {
        setUsers(prev => 
            prev.map(user => user.id === updatedUser.id ? updatedUser : user)
        );
        setDialogState({ isOpen: false, editingUser: null });
        await getAllStudents().then(setUsers);
    }, []);

    const openAddUserDialog = useCallback(() => {
        setDialogState({ isOpen: true, editingUser: null });
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100">
            <div className="text-center text-2xl font-bold mb-4">User Management</div>
            <div className="text-center mb-4">
                <button 
                    onClick={logout} 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
            <Dialog open={dialogState.isOpen} onOpenChange={(open) => setDialogState(prev => ({ ...prev, isOpen: open }))}>
                <DialogTrigger onClick={openAddUserDialog} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Add User
                </DialogTrigger>
                
                <DialogContent className="w-[90%]  bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 sm:max-w-[600px] rounded-lg animate-fade-in max-h-[90vh] md:max-h-[95vh] overflow-y-auto scrollbar-hide">
                   
                   <DialogTitle className="text-2xl font-bold  text-center">
                    {dialogState.editingUser ? 'Edit User' : 'Add New User'}
                </DialogTitle>
                
                 <FormPage
                        user={dialogState.editingUser}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setDialogState({ isOpen: false, editingUser: null })}
                 />

                </DialogContent>
            </Dialog>

            <div className="w-full max-w-6xl mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <Table>
                        <TableCaption>A list of users</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <UserRow 
                                    key={user.id} 
                                    user={user} 
                                    onEdit={handleEdit} 
                                    onDelete={handleDelete} 
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

const UserRow = React.memo(({ user, onEdit, onDelete }: { 
    user: User; 
    onEdit: (user: User) => void; 
    onDelete: (id: number) => void 
}) => (
    <TableRow>
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.age}</TableCell>
        <TableCell>
            <button 
                onClick={() => onEdit(user)} 
                className="text-blue-500 hover:text-blue-700 mr-2"
            >
                Edit
            </button>
            <button 
                onClick={() => onDelete(user.id)} 
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </TableCell>
    </TableRow>
));

export default TableDemo;
