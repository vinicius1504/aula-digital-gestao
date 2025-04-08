
import React from "react";

interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, className }) => {
  return (
    <div className={`stat-card hover-scale hover-glow animate-fade-in transition-all duration-300 ${className}`}>
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCard;
