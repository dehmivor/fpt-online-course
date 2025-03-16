import { useEffect, useState } from "react";
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
    fetch("http://localhost:5003/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      renderCell: (_, user) => (
        <button
          onClick={() => handleOpenModal(user)}
          className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
        >
          Xem
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-5xl font-bold text-center text-primary">
        {"User management"}
      </h1>
      <Table columns={columns} data={users} />

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
              {selectedUser.profile && (
                <>
                  <p>
                    <strong>University:</strong>{" "}
                    {selectedUser.profile.university}
                  </p>
                  <p>
                    <strong>Major:</strong> {selectedUser.profile.major}
                  </p>
                  <p>
                    <strong>GPA:</strong> {selectedUser.profile.gpa}
                  </p>
                </>
              )}
              <div className="mt-4 text-right">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
                >
                  Trở lại
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
