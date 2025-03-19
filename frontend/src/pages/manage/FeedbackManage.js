import { useEffect, useState } from "react";
import Table from "../../components/Table";

export default function FeedbackManage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");

    fetch("http://localhost:5003/api/feedbacks", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch feedbacks");
        }
        return res.json();
      })
      .then((data) => {
        setFeedbacks(Array.isArray(data) ? data : data.feedbacks || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "deactive" : "active";

      // Update the feedback status immediately to reflect the change in UI
      setFeedbacks((prev) =>
        prev.map((fb) => (fb._id === id ? { ...fb, status: newStatus } : fb))
      );

      const feedbackToUpdate = feedbacks.find((fb) => fb._id === id);
      if (!feedbackToUpdate) {
        throw new Error("Feedback not found");
      }

      const updatedFeedback = { ...feedbackToUpdate, status: newStatus };

      const response = await fetch(
        `http://localhost:5003/api/feedbacks/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFeedback),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update feedback status"
        );
      }

      const data = await response.json();
      console.log("Updated feedback:", data);
    } catch (error) {
      console.error("Error updating feedback status:", error);
      // If the update fails, revert the status back to the previous state
      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb._id === id ? { ...fb, status: currentStatus } : fb
        )
      );
    }
  };

  const columns = [
    {
      key: "profile",
      label: "User",
      renderCell: (_, feedback) => (
        <div className="flex items-center gap-3">
          <img
            src={feedback?.profile?.img}
            alt={feedback?.profile?.name}
            className="w-10 h-10 rounded-full"
          />
          <span>{feedback?.profile?.name}</span>
        </div>
      ),
    },

    { key: "review", label: "Rating" },
    { key: "feedback", label: "Feedback" },
    { key: "createdAt", label: "Created At" },
    {
      key: "actions",
      label: "Actions",
      renderCell: (_, feedback) => (
        <div className="flex gap-2">
          <button
            onClick={() => toggleStatus(feedback._id, feedback.status)}
            className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
          >
            {feedback?.status === "active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-5xl font-bold text-center text-primary">
          Feedback Management
        </h1>
        <div className="p-4 text-center text-red-700 bg-red-100 border border-red-400 rounded-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-5xl font-bold text-center text-primary">
          Feedback Management
        </h1>
        <div className="flex justify-center p-4">
          <p>Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-5xl font-bold text-center text-primary">
        Feedback Management
      </h1>
      <Table columns={columns} data={feedbacks} />
    </div>
  );
}
