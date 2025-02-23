import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, User, IndianRupee , Dog, Heart, FileCheck } from 'lucide-react';
const apiURL = import.meta.env.VITE_API_URL 

const UserDashboard = () => {
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${apiURL}/api/dashboard/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAdmission(response.data.admissions[0]);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-amber-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-amber-50 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center font-medium">
          {error}
        </div>
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">Here are your pet's boarding details</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Status Bar */}
          <div className="bg-amber-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Booking Status</h3>
              <span className="px-3 py-1 bg-white text-amber-500 rounded-full text-sm font-medium">
                Active Booking
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Owner Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-semibold text-gray-900">Owner Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50/50 rounded-lg p-4">
                <p className="flex justify-between"><span className="text-gray-600">Name:</span> <span className="font-medium text-gray-900">{admission.ownerName}</span></p>
                <p className="flex justify-between"><span className="text-gray-600">Email:</span> <span className="font-medium text-gray-900">{admission.ownerEmail}</span></p>
                <p className="flex justify-between"><span className="text-gray-600">Contact:</span> <span className="font-medium text-gray-900">{admission.contactNumber}</span></p>
                <p className="flex justify-between"><span className="text-gray-600">WhatsApp:</span> <span className="font-medium text-gray-900">{admission.whatsappNumber}</span></p>
                <p className="col-span-2 flex justify-between"><span className="text-gray-600">Address:</span> <span className="font-medium text-gray-900">{admission.address}</span></p>
              </div>
            </div>

            {/* Pet Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Dog className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-semibold text-gray-900">Pet Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50/50 rounded-lg p-4">
                <p className="flex justify-between"><span className="text-gray-600">Name:</span> <span className="font-medium text-gray-900">{admission.dogName}</span></p>
                <p className="flex justify-between"><span className="text-gray-600">Age:</span> <span className="font-medium text-gray-900">{admission.dogAge}</span></p>
                <p className="flex justify-between"><span className="text-gray-600">Weight:</span> <span className="font-medium text-gray-900">{admission.dogWeight} kg</span></p>
                <p className="flex justify-between"><span className="text-gray-600">Diet:</span> <span className="font-medium text-gray-900">{admission.dietPreference}</span></p>
                <p className="col-span-2 flex justify-between"><span className="text-gray-600">Health Issues:</span> <span className="font-medium text-gray-900">{admission.healthComplaints || "None"}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Service Details */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Service Details</h3>
                </div>
                <div className="bg-amber-50/50 rounded-lg p-4">
                  <p className="flex justify-between mb-2"><span className="text-gray-600">Service Type:</span> <span className="font-medium text-gray-900">{admission.service}</span></p>
                  <p className="flex justify-between"><span className="text-gray-600">Duration:</span> <span className="font-medium text-gray-900">{admission.numberOfDays} days</span></p>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <IndianRupee  className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Payment Details</h3>
                </div>
                <div className="bg-amber-50/50 rounded-lg p-4">
                  <p className="flex justify-between mb-2"><span className="text-gray-600">Advance Paid:</span> <span className="font-medium text-green-600">₹{admission.payment.advance}</span></p>
                  <p className="flex justify-between"><span className="text-gray-600">Balance Due:</span> <span className="font-medium text-amber-600">₹{admission.payment.balance}</span></p>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-semibold text-gray-900">Important Dates</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50/50 rounded-lg p-4">
                <p className="flex justify-between"><span className="text-gray-600">Vaccination Date:</span> <span className="font-medium text-gray-900">{formatDate(admission.vaccinationDate)}</span></p>
                <p className="flex justify-between"><span className="text-gray-600">Admission Date:</span> <span className="font-medium text-gray-900">{formatDate(admission.admissionDate)}</span></p>
              </div>
            </div>

            {/* Agreement Status */}
            <div className="mt-6 flex items-center justify-between bg-amber-50/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-500" />
                <span className="text-gray-600">Agreement Status</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${admission.agreementSigned
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                }`}>
                {admission.agreementSigned ? "Signed" : "Not Signed"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;