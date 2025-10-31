import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Users, Stethoscope, Link as LinkIcon, LogOut } from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard/doctors', icon: Stethoscope, label: 'Doctors' },
    { path: '/dashboard/patients', icon: Users, label: 'Patients' },
    { path: '/dashboard/mappings', icon: LinkIcon, label: 'Assignments' },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="navbar bg-base-100 border-b shadow-sm px-6">
        <div className="flex-1 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">HealthCare Manager</h1>
            <p className="text-sm text-gray-500">Welcome, {user?.fullName}</p>
          </div>
        </div>

        <div className="flex-none">
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-base-100 border-b">
        <div className="container mx-auto flex gap-2 px-6 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <button
                  className={`btn btn-sm flex items-center gap-2 rounded-none border-b-2 ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent hover:border-primary/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
