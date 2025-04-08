
import React from "react";

interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, className }) => {
  return (
    <div 
      className={`stat-card rounded-lg border bg-card text-card-foreground p-4 shadow-sm 
                 hover-scale hover-glow animate-fade-in transition-all duration-300 
                 transform hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      <div className="stat-number text-3xl font-bold">{value}</div>
      <div className="stat-label text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export default StatCard;
