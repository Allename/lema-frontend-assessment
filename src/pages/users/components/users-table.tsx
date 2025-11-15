/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/loader/loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelectedUser } from "@/context/SelectedUserContext";
import { fetchUsers } from "@/services/users/userService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react"

const UsersTable = () => {
  const navigate = useNavigate();
  const { setSelectedUser } = useSelectedUser();
  const [pageNumber, setPageNumber] = useState<number>(1);

  console.log(pageNumber, setPageNumber);

  const users = useQuery({
    queryKey: ['users', { pageNumber, pageSize: 10 }],
    queryFn: fetchUsers,
  });
  console.log(users?.data);
  const userData = users?.data;

  const formatAddress = (addr: any) =>
    `${addr.street}, ${addr.city}, ${addr.state}. ${addr.zipcode}`;

  const handleUserClick = (user: any) => {
    setSelectedUser(user)
    navigate({
      to: "/users/$userId/posts",
      params: { userId: user?.id },
    });
  }

  return (
    <div className="w-full h-full">
      <div className="border border-[#E2E8F0] rounded-md">
        {users.isFetching ? (
          <Loader />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#62748E]">Full Name</TableHead>
                <TableHead className="text-[#62748E]">Email</TableHead>
                <TableHead className="text-[#62748E]">Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData?.map((user: any) => (
                <TableRow
                  key={user?.id}
                  onClick={() => handleUserClick(user)}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell className="font-medium">{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell className="max-w-[392px] truncate">
                    {formatAddress(user.address)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        )}
      </div>
    </div>
  );
}

export default UsersTable