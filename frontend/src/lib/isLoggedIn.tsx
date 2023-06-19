import { Navigate } from "react-router-dom";
import { User } from "../types";
import { ReactNode } from "react";

interface Protected {
  user: User;
  children: ReactNode;
}

const Protected = ({ user, children }: Protected) => {
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
export default Protected;
