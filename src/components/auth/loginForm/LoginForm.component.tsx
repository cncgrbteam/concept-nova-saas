import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@components";
import { BiLockAlt } from "react-icons/bi";
import { IUser } from "@utils";
import { useMutation } from "react-query";
import { accountApi } from "@services";
import { useRouter } from "next/router";
import { useAuth } from "@context";

const validationSchema = yup.object().shape({
  email: yup.string().email("Value must be a valid email address").required(),
  password: yup.string().required().min(8),
});

export const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (data: IUser) => {
      return accountApi.login(data);
    },
    onSuccess: async (data) => {
      login(data?.data["auth-token"]);
      router.push("/dashboard");
    },
  });

  const handleLogin: SubmitHandler<IUser> = (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`pt-2`}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          {isError && (
            <div className="py-5">
              <div className="bg-red-100 text-red-500 py-4 px-5 rounded">
                {/* @ts-ignore */}
                {error?.message ? error?.message : "Unalbe to login"}
              </div>
            </div>
          )}
          <Input
            label="Email"
            type="email"
            labelClassName="text-black"
            arialLabel="Email address"
            placeholder="Email address"
            error={errors.email}
            leftIcon="@"
            otherProps={{ ...register("email", { required: true }) }}
          />
          <Input
            label="Password"
            type="password"
            labelClassName="text-black"
            leftIcon={<BiLockAlt />}
            arialLabel="Password"
            placeholder="Password (min. 8 character)"
            error={errors.password}
            otherProps={{ ...register("password", { required: true }) }}
          />

          <div className="pt-5">
            <Button
              type="submit"
              className="h-12 block w-full"
              isLoading={isLoading}
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
