import { Outlet } from "react-router-dom";

export default function Bom() {
  return (
    <div className="w-[100%]">
      <Outlet />
    </div>
  );
};