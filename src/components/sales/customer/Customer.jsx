import { Outlet } from "react-router-dom";

export default function Customer() {
  return (
    <div className="w-[100%]">
      <Outlet />
    </div>
  );
};