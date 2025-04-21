import { useCallback } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const useStudentService = () => {
    const axiosPrivate = useAxiosPrivate();

    const createStudent = useCallback(async (studentData: any) => {
        const response = await axiosPrivate.post('/students', studentData);
        return response.data;
    }, [axiosPrivate]);

    const getStudent = useCallback(async (studentId: string) => {
        const response = await axiosPrivate.get(`/students/${studentId}`);
        return response.data;
    }, [axiosPrivate]);

    const getAllStudents = useCallback(async () => {
        const response = await axiosPrivate.get('/students');
   
        return response.data;
    }, [axiosPrivate]);

    const updateStudent = useCallback(async (studentId: string, studentData: any) => {
        const response = await axiosPrivate.put(`/students/${studentId}`, studentData);
        return response.data;
    }, [axiosPrivate]);

    const deleteStudent = useCallback(async (studentId: string) => {
        const response = await axiosPrivate.delete(`/students/${studentId}`);
        return response.data;
    }, [axiosPrivate]);

    return {
        createStudent,
        getStudent,
        getAllStudents,
        updateStudent,
        deleteStudent
    };
};

export default useStudentService;
