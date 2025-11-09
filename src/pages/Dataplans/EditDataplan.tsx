import { DashboardLayout } from "@/layouts";
import { ChevronDown, Loader } from "lucide-react";
import { useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import useDataplan from "@/hooks/useDataplan";

const editDataplanSchema = z.object({
  network: z.string().min(1, { message: "Network is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  days: z.string().min(1, { message: "Days is required" }),
  planId: z.number().min(1, { message: "Plan ID is required" }),
  volume: z.number().min(1, { message: "Volume is required" }),
  extension: z.string().min(1, { message: "Extension is required" }),
  price: z.number().min(1, { message: "Price is required" }),
});

export type EditDataplanSchema = z.infer<typeof editDataplanSchema>;

const EditDataplan = () => {
  const { editDataplan, isLoading } = useDataplan();
  const { plan } = useLocation().state as { plan: DataPlan };
  console.log(plan);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDataplanSchema>({
    resolver: zodResolver(editDataplanSchema),
    defaultValues: {
      network: plan?.network ?? "",
      type: plan?.planType ?? "", 
      planId: Number(plan?.planId) || 0,
      days: String(plan?.days) || "",
      volume: Number(plan?.volume) || 0,
      extension: plan?.extension ?? "",
      price: Number(plan?.price) || 0,
    },
  });

  const onSubmit = (data: EditDataplanSchema) => {
    console.log(data);
    const payload = {
      ...data,
      planId: Number(plan?.planId) || 0,
    }
    editDataplan(payload)
  };

  const onError = (errors: FieldErrors<EditDataplanSchema>) => {
    console.log(errors);
  };

  return (
    <>
      <DashboardLayout title="Edit Data Plan">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-5 bg-background dark:bg-secondary border border-line rounded-xl p-4 shadow-2xl shadow-primary/10"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="network" className="text-sm font-medium">
              Network
            </label>
            <div className="relative">
              <select
                className="w-full select"
                {...register("network")}
              >
                <option value="MTN">MTN</option>
                <option value="Airtel">Airtel</option>
                <option value="Glo">Glo</option>
                <option value="9mobile">9mobile</option>
              </select>
              {errors.network && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.network.message}
                </p>
              )}
              <ChevronDown
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-sm font-medium">
              Type
            </label>
            <div className="relative">
              <select
                className="w-full select"
                {...register("type")}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.type.message}
                </p>
              )}
              <ChevronDown
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="days" className="text-sm font-medium">
              Days : {plan?.days}
            </label>
            <input
              type="text"
              placeholder="e.g. 30"
              className="w-full input"
              {...register("days", {
                valueAsNumber: false,
              })}
            />
            {errors.days && (
              <p className="text-red-500 text-xs mt-1">{errors.days.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="planId" className="text-sm font-medium">
              Plan ID
            </label>
            <input
              type="number"
              placeholder="e.g. 1"
              className="w-full input"
              {...register("planId", {
                valueAsNumber: true,
              })}
            />
            {errors.planId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.planId.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="volume" className="text-sm font-medium">
              Volume
            </label>
            <input
              type="number"
              placeholder="e.g. 1000"
              className="w-full input"
              {...register("volume", {
                valueAsNumber: true,
              })}
            />
            {errors.volume && (
              <p className="text-red-500 text-xs mt-1">
                {errors.volume.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="extension" className="text-sm font-medium">
              Extension
            </label>
            <div className="relative">
              <select
                className="w-full select"
                {...register("extension")}
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </select>
              {errors.extension && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.extension.message}
                </p>
              )}
              <ChevronDown
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              placeholder="e.g. NGN 1000"
              className="w-full input"
              readOnly
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full h-11 rounded-full text-sm font-semibold"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Edit Plan"}
          </button>
        </form>
      </DashboardLayout>
    </>
  );
};

export default EditDataplan;
