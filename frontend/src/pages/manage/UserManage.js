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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Get existing token
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:5003/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        // Process data based on whatever format your API returns
        setUsers(Array.isArray(data) ? data : data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // Fixed closing bracket position for useEffect

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    { key: "_id", label: "ID" },
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

  // Show error message if access is denied
  if (error) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-5xl font-bold text-center text-primary">
          {"User management"}
        </h1>
        <div className="p-4 text-center">
          <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
            <p>{error}</p>
            {error.includes("Access denied") && (
              <p className="mt-2">
                You need admin permissions to access this page.
              </p>
            )}
          </div>
          <Button
            className="mt-4"
            onClick={() => (window.location.href = "/dashboard")} // Navigate to dashboard or home page
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-5xl font-bold text-center text-primary">
          {"User management"}
        </h1>
        <div className="flex justify-center p-4">
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

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
                <strong>ID:</strong> {selectedUser._id || selectedUser.id}
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
