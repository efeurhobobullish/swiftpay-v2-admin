import { useAuth } from "@/hooks";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormSchema = z.infer<typeof formSchema>;

const Login = () => {
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    login(data.email);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <>
      <div className="h-[100dvh] flex md:items-center justify-center pt-20 md:pt-0 bg-gradient-to-b from-primary to-pink-400">
        <div className="w-[90%] max-w-md space-y-10">
          <img
            src="/full-logo-white.svg"
            alt="logo"
            height={200}
            width={200}
            className="mx-auto"
          />
          <div className="bg-white rounded-lg p-8 space-y-10 shadow-2xl">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm ">Sign in to your account to continue</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter admin email"
                  className="w-full input"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary-2 h-11 rounded-full font-semibold w-full"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
