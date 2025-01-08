import {
  CloseRounded,
  CloudUploadOutlined,
  SubwayTwoTone,
} from "@mui/icons-material";
import InputField from "../InputField/InputField";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeRequest } from "../../axios";
import { useEffect, useRef, useState } from "react";
import {
  dataTagErrorSymbol,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../lib/settings";

const getSchema = (type) =>
  z.object({
    username:
      type === "filter"
        ? z.string().optional()
        : z
            .string()
            .min(3, { message: "Username must be at least 3 characters long!" })
            .max(20, {
              message: "Username must be at most 20 characters long!",
            }),
    email:
      type === "filter"
        ? z.string().optional()
        : z.string().email({ message: "Invalid email address!" }),
    fullName:
      type === "filter"
        ? z.string().optional()
        : z.string().min(1, { message: "Full Name is required!" }),
    password:
      type === "filter"
        ? z.string().optional()
        : z.string().min(6, {
            message: "Password must be at least 6 characters long!",
          }),
    phone:
      type === "filter"
        ? z.string().optional()
        : z.string().min(10, {
            message: "Phone number must be at least 10 numbers long!",
          }),
    address:
      type === "filter"
        ? z.string().optional()
        : z.string().min(1, { message: "Address is required!" }).optional(),
    birthday: type === "filter" ? z.string().optional() : z.coerce.date(),
    sex:
      type === "filter"
        ? z.string().optional()
        : z.enum(["Male", "Female"], { message: "Sex is required!" }),
    // img: z.instanceof(File, { message: "Image is required!" }),
    // img: z.optional(),
  });

// const schema = z.object({
//   username:  z
//     .string()
//     .min(3, { message: "Username must be at least 3 characters long!" })
//     .max(20, { message: "Username must be at most 20 characters long!" }),
//   email: z.string().email({ message: "Invalid email address!" }),
//   fullName: z.string().min(1, { message: "Full Name is required!" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters long!" }),
//   phone: z
//     .string()
//     .min(10, { message: "Phone number must be at least 10 numbers long!" }),
//   address: z.string().min(1, { message: "Address is required!" }).optional(),
//   birthday: z.coerce.date(),
//   sex: z.enum(["Male", "Female"], { message: "Sex is required!" }),
//   // img: z.instanceof(File, { message: "Image is required!" }),
//   // img: z.optional(),
// });

export const StudentForm = ({ data, type = "create", setOpenForm }) => {
  const schema = getSchema(type);
  const [changeImg, setChangImg] = useState(false);
  const [profilePic, setProfilePic] = useState(
    data?.img ? { preview: `${data.img}` } : { preview: null }
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";

  const queryClient = useQueryClient();

  const handleChangeImg = (e) => {
    setChangImg(true);
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setProfilePic(file);
    }
  };

  const uploadProfilePicRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(schema) });

  const upload = async () => {
    // tạo formData
    const formData = new FormData();
    formData.append("file", profilePic);
    const res = await makeRequest.post("/upload", formData);
    return "/uploads/" + res.data;
  };

  const mutation = useMutation({
    mutationFn: ({ newStudent, type }) => {
      console.log(newStudent);
      if (type === "create") {
        return makeRequest
          .post("/students/", newStudent)
          .then((res) => res.data);
      } else if (type === "filter") {
        searchParams.set("username", newStudent.username);
        searchParams.set("email", newStudent.email);
        searchParams.set("search", newStudent.fullName);
        searchParams.set("phone", newStudent.phone);
        searchParams.set("address", newStudent.address);
        const queryString = new URLSearchParams(searchParams);
        queryString.set("page", 1);
        queryString.set("pageItems", pageItems);
        navigate(`${location.pathname}?${queryString}`, { replace: true });
      } else
        return makeRequest
          .put(`/students/${data.id}`, newStudent)
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast(data, { type: "success" });
    },
    onError: (err) => {
      if (err) {
        toast(err.response.data, { type: "error" });
      }
    },
  });

  const onValid = async (data) => {
    console.log("Hello");
    let imgUrl = null;
    if (profilePic && changeImg) {
      imgUrl = await upload();
    } else imgUrl = profilePic?.preview;
    const newStudent = { ...data, img: imgUrl };
    mutation.mutate({ newStudent, type });
  };

  const onSubmit = handleSubmit(onValid);

  useEffect(() => {
    return () => {
      if (profilePic) {
        URL.revokeObjectURL(profilePic.preview);
      }
    };
  }, [profilePic]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-[18px] font-semibold">
        {type === "create"
          ? "Create a new student"
          : type === "filter"
          ? "Filter students"
          : "Update a student"}
      </h1>
      <div className="flex flex-col gap-4">
        <span className="text-[14px] text-gray-400">
          Authentication Information
        </span>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <InputField
            register={register}
            error={errors.username}
            label="Username"
            name="username"
            defaultValue={
              type === "filter" ? searchParams.get("username") : data?.username
            }
          />
          <InputField
            register={register}
            error={errors.email}
            label="Email"
            name="email"
            type="email"
            defaultValue={
              type === "filter" ? searchParams.get("email") : data?.email
            }
          />
          {type === "filter" ? (
            <></>
          ) : (
            <InputField
              register={register}
              error={errors.password}
              label="Password"
              name="password"
              type="password"
              defaultValue={data?.password}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-[14px] text-gray-400">Personal Information</span>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <InputField
            register={register}
            error={errors.fullName}
            label="Full Name"
            name="fullName"
            defaultValue={
              type === "filter" ? searchParams.get("search") : data?.fullName
            }
          />
          <InputField
            register={register}
            error={errors.phone}
            label="Phone"
            name="phone"
            defaultValue={
              type === "filter" ? searchParams.get("phone") : data?.phone
            }
          />
          <InputField
            register={register}
            error={errors.address}
            label="Address"
            name="address"
            defaultValue={
              type === "filter" ? searchParams.get("address") : data?.address
            }
          />
          {type === "filter" ? (
            <></>
          ) : (
            <>
              <InputField
                register={register}
                error={errors.birthday}
                label="Date of Birth"
                name="birthday"
                type="date"
                defaultValue={
                  data?.birth ? moment(data?.birth).format("YYYY-MM-DD") : null
                }
              />
              <InputField
                register={register}
                error={errors.sex}
                label="Sex"
                name="sex"
                options={["Male", "Female"]}
                type="select"
                defaultValue={data?.sex}
              />
              <div className="flex flex-col w-full md:w-1/4">
                <input
                  ref={uploadProfilePicRef}
                  className="hidden"
                  type="file"
                  id="uploadProfilePic"
                  onChange={(e) => handleChangeImg(e)}
                />
                {profilePic?.preview == null ? (
                  <label
                    htmlFor="uploadProfilePic"
                    className="flex items-center gap-4 text-[12px] text-gray-500 cursor-pointer"
                  >
                    <CloudUploadOutlined />
                    <span>Upload a photo</span>
                  </label>
                ) : (
                  <></>
                )}
                {profilePic?.preview ? (
                  <div className="relative w-fit h-fit justify-self-center">
                    <CloseRounded
                      fontSize="medium"
                      className="absolute top-0 right-0 cursor-pointer p-1 bg-webPurple text-white rounded-xl"
                      onClick={() => {
                        if (uploadProfilePicRef.current) {
                          uploadProfilePicRef.current.value = "";
                        }
                        setProfilePic({ preview: null });
                      }}
                    />
                    <label htmlFor="uploadProfilePic">
                      <img
                        src={
                          profilePic && changeImg === false
                            ? `${process.env.REACT_APP_API_URL}${profilePic.preview}`
                            : profilePic.preview
                        }
                        alt="ProfilePic"
                        className="w-[80px] h-[80px] object-cover rounded-full cursor-pointer"
                      />
                    </label>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <button
        className={`text-[18px] w-full p-2 rounded-md ${btnColor} transition-colors text-white`}
      >
        {type === "create" ? "Create" : type === "filter" ? "Filter" : "Update"}
      </button>
    </form>
  );
};
