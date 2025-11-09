import useDataplan from "@/hooks/useDataplan";
import { DashboardLayout } from "@/layouts";
import { formatNumber } from "@/utils/formatNumber";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ListFilter,
  Loader,
  OctagonAlert,
  Pencil,
  Plus,
  RefreshCcw,
  Trash,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dataplan = () => {
  const { getDataPlans, deleteDataplan, isLoading } = useDataplan();
  const [network, setNetwork] = useState<string>("MTN");
  const [type, setType] = useState<string>("monthly");
  const [selectedDataPlan, setSelectedDataPlan] = useState<DataPlan | null>(
    null
  );

  const navigate = useNavigate();
  const handlePlanSelect = (plan: DataPlan) => {
    setSelectedDataPlan(plan);
  };

  const { data: dataPlans } = useQuery({
    queryKey: ["data-plans"],
    queryFn: getDataPlans,
  });

  const filteredDataPlans = dataPlans?.filter(
    (plan: DataPlan) => plan.network === network && plan.planType === type
  );

  const handleEdit = (plan: DataPlan) => {
    navigate(`/data/edit/${plan.planId}`, {
      state: {
        plan,
      },
    });
  }

  const handleDelete = async (planId: number) => {
    const isSuccess = await deleteDataplan(planId)
    if (isSuccess) {
      setSelectedDataPlan(null);
      window.location.reload();
    }
  }

  return (
    <>
      <DashboardLayout title="Data Plan">
        <div className="flex md:items-center justify-between  md:gap-0 gap-4 mb-4">
          <Link
            to="/data/add"
            className="btn btn-primary-2 h-10 px-2 rounded-lg text-sm font-semibold pr-4 min-w-[110px] max-w-[150px]"
          >
            <Plus size={20} />
            Add Plan
          </Link>
          <Link
            to="/data/prices"
            className="btn bg-foreground h-10 px-2 rounded-lg text-sm font-semibold pr-4 min-w-[110px] max-w-[210px]"
          >
            <RefreshCcw size={20} />
            Update Prices
          </Link>
        </div>
        <div className="flex md:items-center justify-between md:flex-row flex-col md:gap-0 gap-4">
          <div className="flex items-center md:gap-4 gap-2">
            <ListFilter />
            <div className="relative">
              <select
                className="min-w-[100px] bg-secondary text-sm font-medium h-10 px-3 rounded-lg border border-line appearance-none"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <option value="MTN">MTN</option>
                <option value="Airtel">Airtel</option>
                <option value="Glo">Glo</option>
                <option value="9mobile">9mobile</option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>
            <div className="relative">
              <select
                className="min-w-[110px] bg-secondary text-sm font-medium h-10 px-3 rounded-lg border border-line appearance-none"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        
        </div>

        <DataPlanList
          filteredDataPlans={filteredDataPlans}
          handlePlanSelect={handlePlanSelect}
          selectedDataPlan={selectedDataPlan}
          setSelectedDataPlan={setSelectedDataPlan}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      </DashboardLayout>
    </>
  );
};

export default Dataplan;

const DataPlanList = ({
  filteredDataPlans,
  handlePlanSelect,
  selectedDataPlan,
  setSelectedDataPlan,
  handleEdit,
  handleDelete,
  isLoading,
}: {
  filteredDataPlans: DataPlan[] | undefined;
  handlePlanSelect: (plan: DataPlan) => void;
  selectedDataPlan: DataPlan | null;
  setSelectedDataPlan: (plan: DataPlan | null) => void;
  handleEdit: (plan: DataPlan) => void;
  handleDelete: (planId: number) => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className="border border-line p-4 shadow-2xl shadow-primary/10 bg-background dark:bg-secondary rounded-xl">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
          {filteredDataPlans?.map((plan: DataPlan) => (
            <div
              key={plan.planId}
              onClick={() => handlePlanSelect(plan)}
              className={`cursor-pointer rounded-lg p-2 py-4 ${
                selectedDataPlan?.planId === plan.planId
                  ? "bg-yellow-500/10 text-yellow-600 border-2 border-yellow-500"
                  : "bg-foreground border-2 border-transparent"
              }`}
            >
              <div className="flex items-center flex-col gap-1">
                <span className="text-sm text-yellow-600 dark:text-yellow-500 font-outfit font-semibold">
                  {plan.volume} {plan.extension}
                </span>
                <span className="text-xs font-medium">{plan.days}</span>
                <span className="text-xs font-medium">
                  ₦ {formatNumber(plan.price)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredDataPlans?.length === 0 && (
          <div className="center bg-foreground p-4 rounded-sm flex-col gap-1 h-full ">
            <div className="center bg-yellow-500/10 text-yellow-500 rounded-full h-14 w-14">
              <OctagonAlert size={24} />
            </div>
            <p className="text-sm text-main">No plans found</p>
            <p className="text-xs text-muted">Did you select a Network?</p>
          </div>
        )}

        {selectedDataPlan && (
          <motion.div
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 10}}
          transition={{duration: 0.2}}
          className="mt-4 bg-foreground p-4 rounded-lg relative overflow-hidden">
            <p className="text-sm text-muted">Selected Plan</p>
            <p className="font-semibold">
              {selectedDataPlan.planName} - ₦
              {formatNumber(selectedDataPlan.price)}
            </p>
            <button
              onClick={() => setSelectedDataPlan(null)}
              className="absolute top-0 right-0 bg-red-500/10 text-red-500 p-2"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => handleEdit(selectedDataPlan)}
                className="btn bg-primary/10 text-primary h-10 px-2 rounded-lg text-sm font-semibold pr-4 min-w-[110px] w-full"
              >
                <Pencil size={16} />
                Edit
              </button>
              <button onClick={() => handleDelete(selectedDataPlan.planId)} className="btn bg-red-500/10 text-red-500 h-10 px-2 rounded-lg text-sm font-semibold pr-4 min-w-[110px] w-full">
               {isLoading ? <Loader className="animate-spin" /> : <Trash size={16} />}
               {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
            </motion.div>
          )}
      </div>
    </>
  );
};
