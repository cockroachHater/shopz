import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRoleCheck() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(role);

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  function roleCheck() {
    if (userRole !== "manager") {
      navigate("/");
    }
  }

  return [userRole, roleCheck];
}
