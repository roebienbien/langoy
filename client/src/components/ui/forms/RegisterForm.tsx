import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa6";
import { Link } from "react-router-dom";
import z from "zod";
import googleIcon from "../../../assets/svg/google.svg";
import Input from "../Input";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import layeredPeaks from "../../../assets/layered-peaks.svg";
import akyatLogo from "../../../assets/akyat-logo.svg";
import OAuth from "./OAuth";

const registerSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .min(1, "email is required")
    .email({ message: "must be valid email" }),
  password: z
    .string({ required_error: "password is required" })
    .min(1, "password must be at least 6 characters long"),
  confirmPassword: z
    .string({ required_error: "password is required" })
    .min(1, "confirm password must be at least 6 characters long"),
});

type FormFields = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const result = data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${layeredPeaks})` }}
      className="grid h-screen   place-items-center bg-gray-50 bg-cover bg-no-repeat  "
    >
      <div className="h-[90%] w-11/12 rounded-xl bg-gray-100 shadow-2xl sm:w-8/12 md:w-7/12 lg:h-[700px] lg:w-[500px]">
        <div className="flex flex-col p-4">
          <img src={akyatLogo} alt="akyatLogo" className="h-7 w-auto lg:h-8" />
          <h2 className="mb-4 text-center text-2xl font-bold lg:text-4xl">
            Create your account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-items-center gap-y-4 text-xs md:text-sm lg:text-base "
          >
            <span className="text-center  ">
              Already have an Account? {""}
              <Link to={"/login"} className="text-blue-400">
                Login
              </Link>
            </span>
            <Input
              register={register}
              errors={errors.email}
              id="email"
              placeholder="Email"
              className="rounded-md "
            />
            <Input
              register={register}
              errors={errors.email}
              id="password"
              placeholder="Password"
              type="password"
              className="rounded-md "
            />
            <Input
              register={register}
              errors={errors.email}
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              className="rounded-md "
            />
            <PrimaryButton
              text={"Login"}
              className="w-full bg-green-700 px-4 py-2 "
            />
            <OAuth />
            <p className="mt-4 text-center lg:text-xs">
              By continuing to use Akyat, you agree to our{" "}
              <a
                href="http://www.example.com"
                target="_blank"
                className="text-blue-500"
              >
                Terms of Service &nbsp;
              </a>
              and &nbsp;
              <a
                href="http://www.example.com"
                target="_blank"
                className="text-blue-500"
              >
                Privacy Policy.
              </a>{" "}
              &nbsp; Personal data added to Akyat is public by default — refer
              to our Privacy FAQs to make changes.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
