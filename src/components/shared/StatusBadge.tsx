
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "ativo" | "inativo" | "pendente" | "aprovado" | "reprovado";

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    ativo: "bg-green-100 text-green-600",
    inativo: "bg-gray-100 text-gray-600",
    pendente: "bg-yellow-100 text-yellow-600",
    aprovado: "bg-blue-100 text-blue-600",
    reprovado: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        styles[status]
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
