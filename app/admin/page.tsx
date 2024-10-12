"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminLayout from "@/components/layout/AdminLayout";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "@/api/users";
import Link from "next/link";
import { User } from "@/types";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Loading from "@/components/Loading";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers(query);
      setUsers(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, [query, users]);

  return (
    <AdminLayout title="Users List">
      <div className="flex gap-5 mb-5">
        <Input
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />

        <Button className="capitalize text-white rounded-sm">
          <CiSearch className="text-2xl text-accent" />
        </Button>
      </div>

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <Loading />
              ) : (
                users.map((user, index) => (
                  <TableRow
                    key={user._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center gap-2">
                        <Link
                          href={{
                            pathname: `users/update`,
                            query: { data: JSON.stringify(user) },
                          }}
                        >
                          <Button
                            variant="secondary"
                            className="px-3 shadow rounded"
                          >
                            <FaEdit className="text-sm text-white" />
                          </Button>
                        </Link>

                        <form
                          action={`/users/delete/${user._id}`}
                          method="POST"
                        >
                          <Button
                            onClick={() => {
                              deleteUser(user._id);
                            }}
                            variant="destructive"
                            type="button"
                            className="px-3 shadow rounded"
                          >
                            <FaTrashCan className="text-sm text-white" />
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </AdminLayout>
  );
};

export default UsersPage;
