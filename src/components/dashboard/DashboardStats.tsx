import { Users, Building, Briefcase } from "lucide-react";
import { HiUserGroup } from "react-icons/hi";
import StatsCard from "./StatsCard";
import useApi from "@/hooks/useApi";
import { getDashboardStats } from "@/lib/api/dashboard";
import { useEffect, useState } from "react";
import DashboardStatsSkeleton from "../skeletons/DashboardStatsSkeleton";

const DashboardStats = ({
  timeFilter,
  hotelId,
}: {
  timeFilter: TimeFilter;
  hotelId?: string;
}) => {
  const [stats, setStats] = useState([
    {
      title: "Users",
      icon: Users,
      total: "",
      change: "",
    },
    {
      title: "Hotels",
      icon: Building,
      total: "",
      change: "",
    },
    {
      title: "Employees",
      icon: HiUserGroup,
      total: "",
      change: "",
    },
    {
      title: "Services",
      icon: Briefcase,
      total: "",
      change: "",
    },
  ]);

  const { execute, loading, error, data } = useApi(getDashboardStats);

  useEffect(() => {
    execute(timeFilter, hotelId);
  }, [timeFilter, hotelId, execute]);

  useEffect(() => {
    if (data?.body) {
      const { usersStats, hotelsStats, employeesStats, servicesStats } =
        data.body;

      setStats([
        {
          title: usersStats?.title || "Users",
          icon: Users,
          total: usersStats?.total || "0",
          change: `${usersStats?.growth || "0"}%`,
        },
        {
          title: hotelsStats?.title || "Hotels",
          icon: Building,
          total: hotelsStats?.total || "0",
          change: `${hotelsStats?.growth || "0"}%`,
        },
        {
          title: employeesStats?.title || "Employees",
          icon: HiUserGroup,
          total: employeesStats?.total || "0",
          change: `${employeesStats?.growth || "0"}%`,
        },
        {
          title: servicesStats?.title || "Services",
          icon: Briefcase,
          total: servicesStats?.total || "0",
          change: `${servicesStats?.growth || "0"}%`,
        },
      ]);
    }
  }, [data]);

  if (loading) {
    return <DashboardStatsSkeleton />;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ title, icon, total, change }, index) => (
        <StatsCard
          key={index}
          title={title}
          icon={icon}
          total={total}
          change={change}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
