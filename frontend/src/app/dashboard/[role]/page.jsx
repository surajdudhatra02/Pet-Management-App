"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LogOut, UserRound, Menu, X, PawPrint } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const DashboardPage = ({ params }) => {
  const { role: urlRole } = useParams();
  const {
    role: authRoleFromContext,
    logout,
    isAuthenticated,
    loading,
    user,
  } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [displayRole, setDisplayRole] = useState(authRoleFromContext);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
    }
    return;

    // if (user && authRoleFromContext && displayRole !== authRoleFromContext) {
    //   setDisplayRole(authRoleFromContext);
    // }

    // if (urlRole && urlRole !== authRoleFromContext) {
    //   router.replace(`/dashboard/${authRoleFromContext}`);
    // }
  }, [
    isAuthenticated,
    router,
    loading,
    authRoleFromContext,
    urlRole,
    user,
    displayRole,
  ]);

  useEffect(() => {
    if (!loading) {
      setDisplayRole(authRoleFromContext);
    }
  }, [authRoleFromContext, loading]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50/50 to-white">
        <p className="text-amber-700">Loading dashboard...</p>
      </div>
    );
  }
  const dashboardContent =
    authRoleFromContext === "admin" ? <AdminDashboard /> : <UserDashboard />;

  console.log(authRoleFromContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <nav className="bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <PawPrint className="h-8 w-8 text-white mr-2" />
              <h1 className="text-xl font-bold text-white">
                Dog Training Dashboard
              </h1>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <UserRound size={20} className="text-white" />
                <span className="text-sm font-medium text-white capitalize">
                  {authRoleFromContext}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-white hover:bg-amber-600 transition-colors border border-white/30 hover:shadow-md cursor-pointer"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-white hover:bg-amber-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-3 px-4 shadow-inner border-t border-amber-200">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 py-2 px-3 bg-amber-50 rounded-lg">
                <UserRound size={20} className="text-amber-500" />
                <span className="text-sm font-medium text-amber-700 capitalize">
                  {authRole}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 w-full text-left rounded-lg text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <LogOut size={20} className="text-amber-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(30deg,rgba(251,191,36,0.05)_12%,transparent_12.5%,transparent_87%,rgba(251,191,36,0.05)_87.5%,rgba(251,191,36,0.05))] opacity-60"></div>

        {/* Content Container */}
        <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6">
          {dashboardContent}
        </div>

        {/* Floating Decoration */}
        <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
          <PawPrint className="w-16 h-16 text-amber-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
