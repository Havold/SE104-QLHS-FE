import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long!" }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const { login, currentUser } = useContext(AuthContext);
  const [err, setErr] = useState();

  const onValid = async (data) => {
    setErr(null);
    try {
      await login(data);
      const role = currentUser.role.name.toLowerCase();
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (error) {
      if (error.response?.data) {
        setErr(error.response.data);
      }
    }
  };

  const onSubmit = handleSubmit(onValid);

  return (
    <div className="h-screen flex items-center justify-center bg-webSky">
      {/* CARD */}
      <div className="h-[70%] w-[50%] flex bg-white rounded-xl overflow-hidden">
        {/* LEFT */}
        <div className="flex-1 p-10 custom-background-image-login flex flex-col gap-4 justify-center">
          <h1 className="text-[90px] font-semibold text-white leading-none">
            Hello World.
          </h1>
          <p className="text-[12px] text-white">
            {" "}
            Welcome to METAN School Management, your ultimate solution for
            streamlining education! Our platform connects students, teachers,
            and administrators, simplifies school operations, and enhances
            learning experiences. Let's build a smarter, more connected school
            environment together!
          </p>
        </div>
        {/* RIGHT */}
        <div className="flex-1">
          <div className="h-full flex flex-col justify-center gap-8 p-10">
            <h2 className="font-semibold text-gray-600">Login</h2>
            <form className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col ">
                <input
                  className="p-2 outline-none border-b-2 focus:border-b-webSky transition-colors caret-webSkyBold"
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username?.message && (
                  <span className="text-[10px] text-red-600">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  className="p-2 outline-none border-b-2 focus:border-b-webSky transition-colors caret-webSkyBold"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password?.message && (
                  <span className="text-[10px] text-red-600">
                    {errors.password.message}
                  </span>
                )}
                {err && <span className="text-[10px] text-red-600">{err}</span>}
              </div>
            </form>
            <button
              className="w-[40%] text-[20px] outline-none bg-webSkyBold hover:bg-webSky transition-colors px-4 p-2 text-white rounded-lg cursor-pointer"
              onClick={onSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
