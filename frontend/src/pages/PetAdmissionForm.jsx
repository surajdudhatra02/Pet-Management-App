import React, { useState } from 'react';
import axios from 'axios';
import {
  PawPrint,
  User,
  Mail,
  Lock,
  Home,
  Phone,
  Calendar,
  Weight,
  IndianRupee,
  Heart,
  X,
  Send,
  Briefcase,
  Utensils
} from 'lucide-react';
const apiURL = import.meta.env.VITE_API_URL 

const PetAdmissionForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    ownerName: '', ownerEmail: '', password: '', address: '',
    contactNumber: '', whatsappNumber: '',
    dogName: '', dogAge: '', dogWeight: '',
    serviceType: 'Training',
    vaccinationDate: '', admissionDate: '',
    numberOfDays: '', dietPreference: 'Non Vegetarian',
    paymentAdvance: '', paymentBalance: '',
    healthComplaints: 'None',
    agreementSigned: false,
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        payment: { advance: formData.paymentAdvance, balance: formData.paymentBalance }
      };
      await axios.post(`${apiURL}/api/dashboard/admin/petform`, payload);
      alert('Pet admission recorded successfully!');
      closeForm();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const firstSectionFields = [
    { label: 'Owner Name', name: 'ownerName', icon: User },
    { label: 'Owner Email', name: 'ownerEmail', type: 'email', icon: Mail },
    { label: 'Password', name: 'password', type: 'password', icon: Lock },
    { label: 'Address', name: 'address', icon: Home },
    { label: 'Contact Number', name: 'contactNumber', icon: Phone },
    { label: 'Whatsapp Number', name: 'whatsappNumber', icon: Phone },
    { label: 'Dog Name', name: 'dogName', icon: PawPrint },
    { label: 'Dog Age', name: 'dogAge', icon: Calendar },
    { label: 'Dog Weight', name: 'dogWeight', type: 'number', icon: Weight },
    {
      label: 'Service Type', name: 'serviceType', type: 'select', icon: Briefcase,
      options: [
        { value: 'Training', label: 'Training' },
        { value: 'Hostel', label: 'Hostel' },
        { value: 'Both', label: 'Training & Hostel' }
      ]
    },
    { label: 'Vaccination Date', name: 'vaccinationDate', type: 'date', icon: Calendar },
    { label: 'Admission Date', name: 'admissionDate', type: 'date', icon: Calendar },
    { label: 'Number of Days', name: 'numberOfDays', type: 'number', icon: Calendar },
  ];

  const dietPreferenceField = {
    label: 'Diet Preference',
    name: 'dietPreference',
    type: 'select',
    icon: Utensils,
    options: [
      { value: 'Vegetarian', label: 'Vegetarian' },
      { value: 'Non Vegetarian', label: 'Non Vegetarian' }
    ]
  };

  return (
    <div className="fixed inset-0 bg-gray-600/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500 to-amber-600 border-b border-amber-400 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-white" />
            <h2 className="text-2xl font-bold text-white">Pet Admission Form</h2>
          </div>
          <button
            onClick={closeForm}
            className="p-2 hover:bg-amber-600/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] bg-gradient-to-b from-amber-50/50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {firstSectionFields.map(({ label, name, type = 'text', icon: Icon, options }) => (
              <div key={name} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 group-hover:text-amber-600 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>

                  {type === 'select' ? (
                    <select
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white hover:border-amber-300 transition-colors appearance-none"
                    >
                      {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={formData[name] || ''}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white hover:border-amber-300 transition-colors"
                    />
                  )}
                </div>
              </div>
            ))}

            <div key={dietPreferenceField.name} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {dietPreferenceField.label}
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 group-hover:text-amber-600 transition-colors">
                  <dietPreferenceField.icon className="h-4 w-4" />
                </div>
                <select
                  name={dietPreferenceField.name}
                  value={formData[dietPreferenceField.name]}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white hover:border-amber-300 transition-colors appearance-none"
                >
                  {dietPreferenceField.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Details
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 group-hover:text-amber-600 transition-colors">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    name="paymentAdvance"
                    value={formData.paymentAdvance || ''}
                    onChange={handleChange}
                    placeholder="Advance Payment"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white hover:border-amber-300 transition-colors"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 group-hover:text-amber-600 transition-colors">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    name="paymentBalance"
                    value={formData.paymentBalance || ''}
                    onChange={handleChange}
                    placeholder="Balance Payment"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white hover:border-amber-300 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Health Complaints
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-amber-500 group-hover:text-amber-600 transition-colors">
                  <Heart className="h-4 w-4" />
                </div>
                <textarea
                  name="healthComplaints"
                  value={formData.healthComplaints}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[80px] hover:border-amber-300 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 relative p-4 mt-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <input
                type="checkbox"
                name="agreementSigned"
                checked={formData.agreementSigned}
                onChange={(e) => setFormData({ ...formData, agreementSigned: e.target.checked })}
                required
                className="rounded border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <label className="text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
              <div className="absolute right-2 top-2 opacity-10">
                <PawPrint className="w-6 h-6 text-amber-500 animate-pulse" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetAdmissionForm;