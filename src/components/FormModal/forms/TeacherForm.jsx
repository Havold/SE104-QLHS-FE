import { CloudUploadOutlined } from "@mui/icons-material";
import InputField from "../../InputField/InputField";

export const TeacherForm = ({type='create'}) => {
  return (
    <form className="flex flex-col gap-8">
      <h1 className="text-[18px] font-semibold">Create a new teacher</h1>
      <div className="flex flex-col gap-4">
        <span className="text-[14px] text-gray-400">
          Authentication Information
        </span>
        <div className="flex flex-col md:flex-row justify-between">
          <InputField label="Username" name="username" />
          <InputField label="Email" name="email" type="email" />
          <InputField label="Password" name="password" type="password" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-[14px] text-gray-400">Personal Information</span>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <InputField label="First Name" name="firstName" />
          <InputField label="Last Name" name="lastName" />
          <InputField label="Phone" name="phone" />
          <InputField label="Address" name="address" />
          <InputField label="Rank" name="rank" />
          <InputField label="Date of Birth" name="dateOfBirth" type="date" />
          <InputField
            label="Sex"
            name="sex"
            options={["Male", "Female"]}
            type="select"
          />
          <div className="w-full md:w-1/4">
            <input
              className="hidden"
              type="file"
              id="uploadProfilePic"
              name="uploadProfilePic"
            />
            <label htmlFor="uploadProfilePic" className="flex items-center gap-4 text-[12px] text-gray-500 cursor-pointer">
              <CloudUploadOutlined />
              <span>Upload a photo</span>
            </label>
          </div>
        </div>
      </div>
      <button className="text-[18px] w-full p-2 rounded-md bg-webSkyBold hover:bg-webSky transition-colors text-white">
        {type==='create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
};
