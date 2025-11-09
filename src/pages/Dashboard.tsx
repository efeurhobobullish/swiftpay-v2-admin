import { useUsers } from "@/hooks";
import { DashboardLayout } from "@/layouts";
import { greetings } from "@/utils/greetings";
import {
  Banknote,
  DollarSign,
  UsersRound,
  Wallet,
  LineChart,
  Smartphone,
  Wifi,
  HelpCircle,
  RefreshCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const Dashboard = () => {
  const { users, isLoading } = useUsers();
  const stats = [
    {
      title: "API Balance",
      value: 10000.08,
      icon: Wallet,
      isCurrency: true,
      link: "https://app.aodata.ng/dashboard/app",
    },
    {
      title: "Total Users",
      value: isLoading ? 1000000 : users?.length,
      icon: UsersRound,
      isCurrency: false,
      link: "/users",
    },
    {
      title: "Net Worth",
      value: 89000,
      icon: DollarSign,
      isCurrency: true,
      link: "/transactions",
    },
    {
      title: "Total Transactions",
      value: 754,
      icon: Banknote,
      isCurrency: false,
      link: "/transactions",
    },
    {
      title: "Today's Revenue",
      value: 8200,
      icon: LineChart,
      isCurrency: true,
      link: "/transactions",
    },
    {
      title: "Total Airtime Sold",
      value: 42000,
      icon: Smartphone,
      isCurrency: true,
      link: "/airtime",
    },
    {
      title: "Total Data Sold",
      value: 26000,
      icon: Wifi,
      isCurrency: true,
      link: "/data",
    },
    {
      title: "Support Tickets",
      value: 5,
      icon: HelpCircle,
      isCurrency: false,
      link: "/support",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <h1 className="text-3xl font-semibold">
          {greetings()},<br />{" "}
          <span className="text-muted font-light">Administrator</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {stats.map((stat, index) => (
            <Link
              to={stat.link}
              key={index}
              className="bg-background relative dark:bg-secondary border border-line p-4 rounded-xl space-y-2 shadow-2xl shadow-primary/10"
            >
              {index === 0 && (
                <button className="absolute top-2 right-2 bg-foreground  px-3 h-10 rounded-full font-medium center hover:text-main text-muted transition-all duration-300">
                  <RefreshCcw size={16} />
                  <span className="text-sm">Refresh</span>
                </button>
              )}
              <div className="center h-12 w-12 rounded-lg bg-primary/10">
                <stat.icon className="text-primary" />
              </div>
              <h2 className="text-sm text-muted">{stat.title}</h2>
              <p className="text-3xl font-mono font-bold">
                {stat.isCurrency && "₦"}
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  decimals={stat.isCurrency ? 2 : 0}
                  decimalPlaces={2}
                />
              </p>
            </Link>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
