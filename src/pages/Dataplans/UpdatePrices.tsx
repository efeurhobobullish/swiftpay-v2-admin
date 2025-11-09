import { DashboardLayout } from "@/layouts"
import { z } from "zod"
import { useForm, type FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useDataplan from "@/hooks/useDataplan"
import { useEffect } from "react"
const formSchema = z.object({
    percentage: z.number({required_error: "Percentage is required"}).min(1, {message: "Percentage must be greater than 0"}).max(100, {message: "Percentage must be less than 100"}),
})

type FormData = z.infer<typeof formSchema>

const UpdatePrices = () => {
    const {dataProfits, getDataplanProfits} = useDataplan()

    const networkProfitsPercentage =(network: string)=>{
        const profit = dataProfits.find((x)=>x.network === network)
        return profit?.profit || 0
    }

    useEffect(()=>{
        getDataplanProfits()
    }, [getDataplanProfits])

    const cardData = [
        {
            network: "MTN",
            percentage: networkProfitsPercentage("MTN"),
            image: "/mtn.svg"
        },
        {
            network: "Airtel",
            percentage: networkProfitsPercentage("Airtel"),
            image: "/airtel.svg"
        },
        {
            network: "Glo",
            percentage: networkProfitsPercentage("Glo"),
            image: "/glo.svg"
        },
        {
            network: "9mobile",
            percentage: networkProfitsPercentage("9mobile"),
            image: "/9mobile.svg"
        }
    ]
  return (
    <>
    <DashboardLayout title="Update Prices">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {cardData.map((x,y)=>{

                return <FormCard key={y} {...x} />
            })}
        </div>

    </DashboardLayout>
    </>
  )
}

export default UpdatePrices

interface FormCardProps {
    network: string
    percentage: number
    image: string
}



const FormCard = ({network, percentage, image}: FormCardProps)=>{
    const {updateDataPlanPriceByNetwork, isLoading, isGettingProfits} = useDataplan()
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            percentage
        }
    })

    const onSubmit = (data: FormData)=>{
        updateDataPlanPriceByNetwork(network, data.percentage)
    }

    const onError = (errors: FieldErrors<FormData>)=>{
        console.log(errors)
    }

    return (
        <>
        <div className="dark:bg-secondary bg-background p-4 shadow-2xl shadow-primary/10 rounded-lg border border-line space-y-4">
                <div className="h-16 w-16 rounded-lg overflow-hidden bg-white p-2">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                    <p className="text-sm text-muted">{network}</p>
                    <h2 className="text-2xl font-bold">{ isGettingProfits ? "Loading..." : percentage}%</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <input type="number" className="w-full input" placeholder="Enter the percentage" {...register("percentage", {valueAsNumber: true})} />
                        {errors.percentage && <p className="text-red-500 text-sm">{errors.percentage.message}</p>}
                    </div>
                    <button disabled={isLoading} className="btn btn-primary-2 w-full h-10 px-2 rounded-lg text-sm font-semibold">{isLoading ? "Updating..." : "Update"}</button>
                </form>
            </div>
        </>
    )
}