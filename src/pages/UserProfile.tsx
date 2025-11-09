import {
  ButtonWithLoader,
  InputWithIcon,
  Modal,
  RecentTransactions,
} from "@/components";
import SelectWithIcon from "@/components/SelectWithIcon";
import { useUsers } from "@/hooks";
import { DashboardLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import {
  ArrowLeftRight,
  AtSign,
  Copy,
  Phone,
  Plus,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import CountUp from "react-countup";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import {number, string, z} from "zod"

const formSchema = z.object({
  amount: number().min(1, {message: "Amount is required!"}),
  type: string().min(1, {message: "Transaction type is required"})
})

type FormData = z.infer<typeof formSchema>


const UserProfile = () => {
  const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })
  const { email } = useParams();
  const { users, transactions, updateBalance, isLoading } = useUsers();
  const [isOpen, setIsOpen] = useState(false);
  const user = users?.find((user) => user.email === email);
  const userTransactions = transactions.filter((x) => x.user?.id === user?.id);

  const onSubmit = (data: FormData)=>{
    if(!user) return
    updateBalance(data.amount, data.type, user?.id)
  }

  if (!user) {
    return (
      <DashboardLayout>
        <p>User Notfound!</p>
      </DashboardLayout>
    );
  }

  const handleCopyEmail =(email: string)=>{
    navigator.clipboard.writeText(email)
    toast.success("Email copied!", {
      description: email
    })
  }
  return (
    <>
      <DashboardLayout title={`${user.name}`}>
        <div className="space-y-4">
          <div className="flex items-center gap-4 underline underline-offset-2">
            <Phone size={20} className="text-muted" /> {user.phone}
          </div>
          <div className="flex items-center gap-4 underline underline-offset-2">
            <AtSign size={20} className="text-muted" /> {user.email}
            <button onClick={()=>handleCopyEmail(user.email)} className="ml-2 rounded-full">
              <Copy size={18} className=" text-muted" />
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="bg-secondary flex items-center justify-between cursor-pointer border border-line p-4 rounded-xl ">
            <div className="space-y-4">
              <p className="text-muted">Wallet Balance</p>
              <p className="text-2xl font-semibold">
                {" "}
                <CountUp end={user.wallet} decimals={2} separator="," />{" "}
                <span className="text-[15px]">NGN</span>{" "}
              </p>
            </div>
          </div>
          <div className="bg-secondary flex items-center space-y-2 cursor-pointer border border-line p-4 rounded-xl ">
            <div className="space-y-4">
              <p className="text-muted">Total Transactions</p>
              <p className="text-2xl font-semibold">
                {" "}
                <CountUp end={userTransactions.length} separator="," />
              </p>
            </div>
          </div>
        </div>
        <div className="center gap-4 mx-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="md:w-[180px] w-full text-sm rounded-full btn-primary-2 h-11 font-semibold"
          >
            <Plus /> Fund Wallet
          </button>
          <Link
            to="/"
            className="md:w-[180px] w-full text-sm rounded-full h-11 font-semibold btn bg-secondary"
          >
            Supply service
          </Link>
        </div>

        <RecentTransactions userId={user.id} />
      </DashboardLayout>

      <AnimatePresence>
        {isOpen && (
          <Modal
            title="Update Balance"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <InputWithIcon
                icon={<Wallet size={20} />}
                label="Amount"
                type="number"
                placeholder="Enter an amount"
                className="bg-foreground"
                {...register("amount",{
                  valueAsNumber: true
                })}
                error={errors?.amount && errors.amount.message }
              />
              <SelectWithIcon
                icon={<ArrowLeftRight size={20} />}
                label="Transaction Type"
                className="bg-foreground"
                {...register("type")}
                error={errors?.type && errors.type.message }
                options={[
                  {
                    label: "Credit",
                    value: "credit",
                  },
                  {
                    label: "Debit",
                    value: "debit",
                  },
                ]}
              />
              <ButtonWithLoader
                type="submit"
                loading={isLoading}
                initialText="Submit"
                loadingText="Submitting"
                className="h-10 w-full mt-6 btn-primary rounded-full"
              />
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProfile;
