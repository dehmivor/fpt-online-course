import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/Dialog";
import Button from "../../components/Button";

export default function UserManage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3005/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">User Management</h1>
      <Table>
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <Button onClick={() => handleOpenModal(user)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div>
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>University:</strong> {selectedUser.profile.university}
              </p>
              <p>
                <strong>Major:</strong> {selectedUser.profile.major}
              </p>
              <p>
                <strong>GPA:</strong> {selectedUser.profile.gpa}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
