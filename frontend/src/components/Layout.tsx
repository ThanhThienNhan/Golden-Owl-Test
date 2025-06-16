import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-gray-900 text-white" : "text-white hover:bg-gray-700"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? "bg-gray-900 text-white" : "text-white hover:bg-gray-700"
    }`;

  return (
    <div className=" min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-xl font-bold text-white">
                G-Scores
              </NavLink>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/reports" className={linkClass}>
                  Reports
                </NavLink>
                <NavLink to="/statistics" className={linkClass}>
                  Statistics
                </NavLink>
                <NavLink to="/top-students" className={linkClass}>
                  Top Students
                </NavLink>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 bg-white inline-flex items-center justify-center rounded-md hover:bg-gray-200 focus:outline-none"
              >
                <span className="text-black text-xl leading-none">
                  {mobileMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-list"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/reports"
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Reports
              </NavLink>
              <NavLink
                to="/statistics"
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Statistics
              </NavLink>
              <NavLink
                to="/top-students"
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Top Students
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
