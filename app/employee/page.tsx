import Link from "next/link";
import { getEmployeelist } from "@/lib/action";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/components/delete";


const Employee = async ({
    query
}: {
    query: string;
}) => {
    const employees = await getEmployeelist(query);
    return (
        <div className="w-screen py-20 flex justify-center flex-col items-center">
            <div className="flex items-center justify-between gap-1 mb-5">
                <h1 className="text-4xl font-bold">Next.js 14 CRUD Create, Read, Update and Delete <br />Prisma PostgreSQL | TailwindCSS DaisyUI</h1>
            </div>
            <div className="overflow-x-auto">
                <div className="mb-2 w-full text-right">
                    <Link
                        href="/employee/create"
                        className="btn btn-primary">
                        Create
                    </Link>
                </div>
                <table className="table table-zebra">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="py-3 px-6">#</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Phone Number</th>
                            <th className="py-3 px-6">Created At</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={emp.id} className="bg-white border-b">
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">{emp.name}</td>
                                <td className="py-3 px-6">{emp.email}</td>
                                <td className="py-3 px-6">{emp.phone}</td>
                                <td className="py-3 px-6">
                                    {formatDate(emp.createdAt.toString())}
                                </td>
                                <td className="flex justify-center gap-1 py-3">

                                    <Link
                                        href={`/employee/edit/${emp.id}`}
                                        className="btn btn-info"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton id={emp.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Employee;