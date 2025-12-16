import React, { useState } from "react";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "End User",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const occupations = [
    "End User",
    "Traders",
    "Designers / Architecture",
    "Designer",
    "Builder",
    "Custom Home Builder",
    "Contractors",
    "Installers",
    "Others",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Submit Handler
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(`${BACKEND_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Message sent successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        occupation: "End User",
        subject: "",
        message: "",
      });
    } else {
      toast.error(result.error || "Something went wrong.");
    }
  } catch (err) {
    toast.error("Server error. Please try later.");
  }

  setLoading(false);
};




  return (
    <div className="w-full bg-[#1e1e1e] text-white py-16">
      <div className="app-container contact">

        {/* Form Heading */}
        <h2 className="text-3xl md:text-4xl uppercase mb-10 tracking-wide royal-heading">
          Contact Form
        </h2>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-6 p-3 rounded ${
              statusMessage.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Form */}
        <form className="space-y-10" onSubmit={handleSubmit}>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block mb-1 text-md text-[#EBEBEB]">Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-md text-[#EBEBEB]">Email Address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block mb-1 text-md text-[#EBEBEB]">Contact Number*</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-md text-[#EBEBEB]">Occupation*</label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 cursor-pointer"
              >
                {occupations.map((occ, idx) => (
                  <option key={idx} value={occ} className="text-white bg-[#1e1e1e]">
                    {occ}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-1 text-md text-[#EBEBEB]">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-md text-[#EBEBEB]">Your Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md mt-4 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
