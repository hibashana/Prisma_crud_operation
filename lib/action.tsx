"use server"
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"
// import { useRouter } from 'next/navigation';

const EmployeSchema = z.object({
    name: z.string().min(6),
    email: z.string().min(6),
    phone: z.string().min(10),

});

export const saveEmployee = async (prevSate: any, formData: FormData) => {

    const validatedFields = EmployeSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors,
        };
    }
    try {
        await prisma.employee.create({
            data: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                phone: validatedFields.data.phone,
            },
        });
    }
    catch (error) {
        return { message: "Failed to create new employee" };
    }

    revalidatePath("/employee");
    redirect("/employee");

};

export const getEmployeelist = async (query: string) => {
    try {
        const employees = await prisma.employee.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc"
            },
        });
        return employees;
    } catch (error) {
        throw new Error("Failed to fetch employee data");
    }
}

export const getEmployeeById = async (id: string) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: { id },
        });
        return employee;
    } catch (error) {
        throw new Error("Failed to fetch contact data");
    }
};


export const updateEmployee = async (
    id: string,
    prevSate: any,
    formData: FormData
) => {
    const validatedFields = EmployeSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors,
        };
    }
    try {
        await prisma.employee.update({
            data: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                phone: validatedFields.data.phone,
            },
            where: { id },
        });
    } catch (error) {
        return { message: "Failed to update employee" };
    }

    revalidatePath("/employee");
    redirect("/employee");
};

export const deleteEmployee = async (id: string) => {
    try {
        await prisma.employee.delete({
            where: { id },
        });
    } catch (error) {
        return { message: "Failed to delete employee" };
    }

    revalidatePath("/employee");
};
