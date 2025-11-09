import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";



const InputWithIcon = ({ icon, label,type, error, ...props }: InputWithIconProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  }
  return (
    <div className="space-y-2">
        {label && <label htmlFor={props.id} className="text-sm text-muted font-medium">{label}</label>}
        <div className="relative mt-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                {icon}
            </div>
            <input {...props} type={type === "password" ? (showPassword ? "text" : "password") : type} className={`pl-12 h-11 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-[3px] focus:ring-primary/20 ${props.className}`} />

            {type === "password" && (
                <div onClick={togglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted cursor-pointer">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
            )}
        </div>
        {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
    </div>
  )
}

export default InputWithIcon