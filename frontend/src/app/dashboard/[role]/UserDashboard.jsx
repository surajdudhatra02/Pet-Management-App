"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  User,
  IndianRupee,
  Dog,
  Heart,
  FileCheck,
} from "lucide-react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const UserDashboard = () => {
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token =
          typeof window !== "undefined" && localStorage.getItem("token");

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-amber-50 py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center font-medium">
            {error}
          </div>
        </div>
      </div>
    );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">
            Here are your pet's boarding details
          </p>
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
            <Section
              title="Owner Information"
              icon={<User className="w-5 h-5 text-amber-500" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50/50 rounded-lg p-4">
                <Detail label="Name" value={admission.ownerName} />
                <Detail label="Email" value={admission.ownerEmail} />
                <Detail label="Contact" value={admission.contactNumber} />
                <Detail label="WhatsApp" value={admission.whatsappNumber} />
                <Detail label="Address" value={admission.address} colSpan={2} />
              </div>
            </Section>

            {/* Pet Information */}
            <Section
              title="Pet Information"
              icon={<Dog className="w-5 h-5 text-amber-500" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50/50 rounded-lg p-4">
                <Detail label="Name" value={admission.dogName} />
                <Detail label="Age" value={admission.dogAge} />
                <Detail label="Weight" value={`${admission.dogWeight} kg`} />
                <Detail label="Diet" value={admission.dietPreference} />
                <Detail
                  label="Health Issues"
                  value={admission.healthComplaints || "None"}
                  colSpan={2}
                />
              </div>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Service Details */}
              <Section
                title="Service Details"
                icon={<Heart className="w-5 h-5 text-amber-500" />}
              >
                <div className="bg-amber-50/50 rounded-lg p-4">
                  <Detail label="Service Type" value={admission.service} />
                  <Detail
                    label="Duration"
                    value={`${admission.numberOfDays} days`}
                  />
                </div>
              </Section>

              {/* Payment Details */}
              <Section
                title="Payment Details"
                icon={<IndianRupee className="w-5 h-5 text-amber-500" />}
              >
                <div className="bg-amber-50/50 rounded-lg p-4">
                  <Detail
                    label="Advance Paid"
                    value={`₹${admission.payment.advance}`}
                    textColor="text-green-600"
                  />
                  <Detail
                    label="Balance Due"
                    value={`₹${admission.payment.balance}`}
                    textColor="text-amber-600"
                  />
                </div>
              </Section>
            </div>

            {/* Important Dates */}
            <Section
              title="Important Dates"
              icon={<Calendar className="w-5 h-5 text-amber-500" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50/50 rounded-lg p-4">
                <Detail
                  label="Vaccination Date"
                  value={formatDate(admission.vaccinationDate)}
                />
                <Detail
                  label="Admission Date"
                  value={formatDate(admission.admissionDate)}
                />
              </div>
            </Section>

            {/* Agreement Status */}
            <div className="mt-6 flex items-center justify-between bg-amber-50/50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-500" />
                <span className="text-gray-600">Agreement Status</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  admission.agreementSigned
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {admission.agreementSigned ? "Signed" : "Not Signed"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Section = ({ title, icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

const Detail = ({ label, value, colSpan = 1, textColor = "text-gray-900" }) => (
  <p className={`flex justify-between ${colSpan === 2 ? "col-span-2" : ""}`}>
    <span className="text-gray-600">{label}:</span>
    <span className={`font-medium ${textColor}`}>{value}</span>
  </p>
);

export default UserDashboard;
