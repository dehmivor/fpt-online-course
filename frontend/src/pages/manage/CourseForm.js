import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CourseForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    description: "",
    date: "",
    time: "",
    trainer: {
      img: "",
      name: "",
      rate: 5,
      totalReview: 0,
    },
    categorie: "",
    sub_categorie: "",
    videos: [],
  });

  const [videoInput, setVideoInput] = useState({
    id: "",
    title: "",
    duration: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("trainer.")) {
      const trainerField = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        trainer: {
          ...prevState.trainer,
          [trainerField]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleVideoInputChange = (e) => {
    const { name, value } = e.target;
    setVideoInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addVideo = () => {
    if (videoInput.title && videoInput.url) {
      // Generate a unique ID if not provided
      const videoWithId = {
        ...videoInput,
        id: videoInput.id || `video_${Date.now()}`,
      };

      setFormData((prevState) => ({
        ...prevState,
        videos: [...prevState.videos, videoWithId],
      }));

      // Reset video input fields
      setVideoInput({
        id: "",
        title: "",
        duration: "",
        url: "",
      });
    }
  };

  const removeVideo = (videoId) => {
    setFormData((prevState) => ({
      ...prevState,
      videos: prevState.videos.filter((video) => video.id !== videoId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the date and time properly
    const formattedDate =
      formData.date && formData.time
        ? new Date(`${formData.date}T${formData.time}`).toLocaleDateString(
            "en-US",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )
        : "";

    // Create the request payload
    const courseData = {
      id: Date.now(), // Generate a unique ID
      title: formData.title,
      img: formData.img,
      description: formData.description,
      date: formattedDate,
      trainer: formData.trainer,
      categorie: formData.categorie,
      sub_categorie: formData.sub_categorie,
      videos: formData.videos,
    };

    try {
      // Use the correct API endpoint
      const response = await fetch(
        "http://localhost:5003/api/training/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Course created successfully");
        navigate("/course-mana");
        console.log("Course created:", result);
        // Reset form or redirect
      } else {
        const error = await response.json();
        toast.error(
          error.message ||
            error.error ||
            "An error occurred. Please try again later."
        );
        console.error("Error creating course:", error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container p-6 mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold text-center text-primary">
        Create New Training Course
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Course Details Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Course Details</h2>

          <div>
            <label className="block text-sm font-medium">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Course Image URL
            </label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="">Select a Category</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Sub-Category</label>
            <input
              type="text"
              name="sub_categorie"
              value={formData.sub_categorie}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Trainer & Videos Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Trainer Information</h2>

          <div>
            <label className="block text-sm font-medium">Trainer Name</label>
            <input
              type="text"
              name="trainer.name"
              value={formData.trainer.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Trainer Image URL
            </label>
            <input
              type="url"
              name="trainer.img"
              value={formData.trainer.img}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Rating (1-5)</label>
              <input
                type="number"
                name="trainer.rate"
                value={formData.trainer.rate}
                onChange={handleChange}
                min="1"
                max="5"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Total Reviews</label>
              <input
                type="number"
                name="trainer.totalReview"
                value={formData.trainer.totalReview}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <h2 className="pt-4 text-xl font-semibold">Course Videos</h2>

          <div className="p-4 space-y-3 border rounded-md">
            <div>
              <label className="block text-sm font-medium">
                Video ID (optional)
              </label>
              <input
                type="text"
                name="id"
                value={videoInput.id}
                onChange={handleVideoInputChange}
                placeholder="video_001"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Video Title</label>
              <input
                type="text"
                name="title"
                value={videoInput.title}
                onChange={handleVideoInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Duration</label>
              <input
                type="text"
                name="duration"
                value={videoInput.duration}
                onChange={handleVideoInputChange}
                placeholder="10 min"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Video URL</label>
              <input
                type="url"
                name="url"
                value={videoInput.url}
                onChange={handleVideoInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <button
              type="button"
              onClick={addVideo}
              className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
            >
              Add Video
            </button>
          </div>

          {formData.videos.length > 0 && (
            <div>
              <h3 className="font-medium">
                Added Videos ({formData.videos.length})
              </h3>
              <ul className="mt-2 border divide-y rounded-md">
                {formData.videos.map((video) => (
                  <li
                    key={video.id}
                    className="flex items-center justify-between p-3"
                  >
                    <div>
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-gray-600">{video.duration}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVideo(video.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-center col-span-2">
          <button
            type="submit"
            className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
