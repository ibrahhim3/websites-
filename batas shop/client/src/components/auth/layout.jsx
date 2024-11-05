import { Outlet } from "react-router-dom";
function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background"> {/* Set the background color for the entire layout */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}


export default AuthLayout;