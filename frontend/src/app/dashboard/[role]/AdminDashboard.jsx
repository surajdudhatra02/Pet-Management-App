"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import PetAdmissionForm from "./pet-admission/page";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL}/api/dashboard/admin`);
        if (Array.isArray(response.data.users)) {
          setBookings(response.data.users);
        } else {
          setBookings([]);
          console.error("Unexpected API response format:", response.data);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings data. Please try again later.");
        setBookings([]);
        setLoading(false);
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysInfo = (admissionDate) => {
    const today = new Date();
    const admission = new Date(admissionDate);
    const diffTime = admission - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `${diffDays} days until admission`;
    if (diffDays === 0) return "Admission today";
    return `${Math.abs(diffDays)} days since admission`;
  };

  const calculateTotal = (booking) => {
    return booking.payment.advance + booking.payment.balance;
  };

  const handleOpenForm = () => {
    setIsFormVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    document.body.style.overflow = "auto";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg mx-auto max-w-4xl mt-8">
        <p className="font-medium">{error}</p>
      </div>
    );

  return (
    <div className="p-6 bg-amber-50/50 min-h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dog Boarding & Training Admin Dashboard
        </h1>

        <button
          className="cursor-pointer px-3 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
          onClick={handleOpenForm}
        >
          <PlusCircle className="w-4 h-4" />
        </button>
      </div>

      {isFormVisible && <PetAdmissionForm closeForm={handleCloseForm} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-amber-700 text-sm font-semibold uppercase tracking-wide">
            Total Bookings
          </h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {bookings.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-amber-700 text-sm font-semibold uppercase tracking-wide">
            Current Boarders
          </h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {
              bookings.filter((booking) => {
                const admissionDate = new Date(booking.admissionDate);
                const endDate = new Date(admissionDate);
                endDate.setDate(endDate.getDate() + booking.numberOfDays);
                const today = new Date();
                return today >= admissionDate && today <= endDate;
              }).length
            }
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-amber-700 text-sm font-semibold uppercase tracking-wide">
            Upcoming Admissions
          </h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {
              bookings.filter(
                (booking) => new Date(booking.admissionDate) > new Date()
              ).length
            }
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 overflow-auto max-h-50 lg:max-h-screen">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 ">
            All Bookings
          </h2>

          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedBooking && selectedBooking._id === booking._id
                    ? "bg-amber-50 border-l-4 border-amber-500"
                    : "bg-gray-50 hover:bg-amber-50/50 border-l-4 border-transparent"
                }`}
                onClick={() => setSelectedBooking(booking)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {booking.dogName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Owner: {booking.ownerName}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      new Date(booking.admissionDate) > new Date()
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {new Date(booking.admissionDate) > new Date()
                      ? "Upcoming"
                      : "Active"}
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-600">
                  {formatDate(booking.admissionDate)} • {booking.service}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedBooking ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 bg-amber-50/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedBooking.dogName}'s Booking
                    </h2>
                    <p className="text-gray-600">
                      {selectedBooking.service} • {selectedBooking.numberOfDays}{" "}
                      days
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-lg font-semibold">
                    ${calculateTotal(selectedBooking)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      Dog Information
                    </h3>
                    <div className="bg-amber-50/50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium text-gray-900">
                          {selectedBooking.dogAge}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium text-gray-900">
                          {selectedBooking.dogWeight} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Diet:</span>
                        <span className="font-medium text-gray-900">
                          {selectedBooking.dietPreference}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Health Issues:</span>
                        <span className="font-medium text-gray-900">
                          {selectedBooking.healthComplaints || "None"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Vaccination:</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(selectedBooking.vaccinationDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      Owner Information
                    </h3>
                    <div className="bg-amber-50/50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-gray-900">
                          {selectedBooking.ownerName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">
                          {selectedBooking.ownerEmail}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium text-gray-900">
                          {selectedBooking.contactNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">WhatsApp:</span>
                        <span className="font-medium text-gray-900">
                          {selectedBooking.whatsappNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-right text-gray-900">
                          {selectedBooking.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    Booking Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-50/50 p-6 rounded-lg">
                      <div className="text-center">
                        <p className="text-gray-600">Admission Date</p>
                        <p className="text-xl font-bold mt-1 text-gray-900">
                          {formatDate(selectedBooking.admissionDate)}
                        </p>
                        <p className="text-sm mt-2 text-amber-600">
                          {getDaysInfo(selectedBooking.admissionDate)}
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-50/50 p-6 rounded-lg">
                      <div className="text-center">
                        <p className="text-gray-600">Payment Status</p>
                        <div className="flex justify-center items-center gap-2 mt-1">
                          <p className="text-xl font-bold text-gray-900">
                            Rs. {selectedBooking.payment.advance} paid
                          </p>
                          <span className="text-sm text-gray-600">
                            of Rs. {calculateTotal(selectedBooking)}
                          </span>
                        </div>
                        <p className="text-sm mt-2 text-amber-600">
                          Balance: Rs. {selectedBooking.payment.balance}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedBooking.agreementSigned
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      Agreement:{" "}
                      {selectedBooking.agreementSigned
                        ? "Signed"
                        : "Not Signed"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Created:{" "}
                      {new Date(selectedBooking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300">
                    Update Booking
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-300">
                    Mark Balance Paid
                  </button>
                  <button className="border border-amber-300 hover:bg-amber-50 py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-200">
                    Download Details
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md p-8">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto text-amber-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  No Booking Selected
                </h3>
                <p className="mt-2 text-gray-600">
                  Select a booking from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
