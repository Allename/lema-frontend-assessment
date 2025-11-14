import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react"

const users = [
  {
    id: '1',
    fullName: 'Allename Anthony',
    email: 'allename.dev@gmail.com',
    address: 'Grace Court Estate, Makoko, Yaba, Lagos. 10001.'
  },
  {
    id: '2',
    fullName: 'Allename Anthony',
    email: 'allename.dev@gmail.com',
    address: 'Grace Court Estate, Makoko, Yaba, Lagos. 10001.'
  },
  {
    id: '3',
    fullName: 'Allename Anthony',
    email: 'allename.dev@gmail.com',
    address: 'Grace Court Estate, Makoko, Yaba, Lagos. 10001.'
  },
  {
    id: '4',
    fullName: 'Allename Anthony',
    email: 'allename.dev@gmail.com',
    address: 'Grace Court Estate, Makoko, Yaba, Lagos. 10001.'
  },
]

const UsersTable = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(1);
  console.log(pageNumber, setPageNumber);

  const handleUserClick = (userId: string) => {
    navigate({
      to: '/users/$userId',
      params: { userId },
    })
  }

  return (
    <div className="w-full h-full">
      <div className="border border-[#E2E8F0] rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#62748E]">Full Name</TableHead>
              <TableHead className="text-[#62748E]">Email</TableHead>
              <TableHead className="text-[#62748E]">Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className="cursor-pointer hover:bg-muted"
              >
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {/* <div className="w-96 truncate" title={formatAddress(user)}> */}
                  <div className="w-96 truncate">
                    {/* {formatAddress(user)} */}
                    {user.address}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default UsersTable