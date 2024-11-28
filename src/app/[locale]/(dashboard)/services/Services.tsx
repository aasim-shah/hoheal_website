"use client";

import ServiceCard from "@/components/services/ServiceCard";

const Services = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <ServiceCard key={index} />
        ))}
    </div>
  );
};

export default Services;
