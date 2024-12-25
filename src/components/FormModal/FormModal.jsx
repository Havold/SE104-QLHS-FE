import {
  AddRounded,
  CloseRounded,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import SubjectForm from "../forms/SubjectForm";
import ClassForm from "../forms/ClassForm";
import DetailClassForm from "../forms/DetailClassForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import GradeForm from "../forms/GradeForm";
import ListStudentForm from "../forms/ListStudentForm";

const TeacherForm = lazy(() =>
  import("../forms/TeacherForm").then((module) => ({
    default: module.TeacherForm,
  }))
);
const StudentForm = lazy(() =>
  import("../forms/StudentForm").then((module) => ({
    default: module.StudentForm,
  }))
);

const forms = {
  teacher: (data, type, setOpenForm) => (
    <TeacherForm setOpenForm={setOpenForm} data={data} type={type} />
  ),
  student: (data, type, setOpenForm) => (
    <StudentForm setOpenForm={setOpenForm} data={data} type={type} />
  ),
  subject: (data, type, setOpenForm) => (
    <SubjectForm setOpenForm={setOpenForm} data={data} type={type} />
  ),
  class: (data, type, setOpenForm) => (
    <ClassForm setOpenForm={setOpenForm} data={data} type={type} />
  ),
  grade: (data, type, setOpenForm) => (
    <GradeForm setOpenForm={setOpenForm} data={data} type={type} />
  ),
  detailClass: (data, type, setOpenForm) => (
    <DetailClassForm setOpenForm={setOpenForm} data={data} type={type} />
  ),
  listStudent: (data, type, setOpenForm) => (
    <ListStudentForm setOpenForm={setOpenForm} data={data} type={type} />
  ),
};

const FormModal = ({ table, type, id, data }) => {
  const [openForm, setOpenForm] = useState(false);
  const Form = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: ({ id, table }) => {
        if (table === "class") {
          table = "classe";
        }

        if (table === "detail-class") {
          table = "detail-classe";
        }

        return makeRequest.delete(`/${table}s/${id}`).then((res) => res.data);
      },
      onSuccess: (data, { table }) => {
        if (table === "class") {
          table = "classe";
        }
        if (table === "detail-class") {
          table = "detail-classe";
        }
        queryClient.invalidateQueries({ queryKey: [`${table}s`] });
        toast(data, { type: "success" });
      },
    });

    const handleDelete = useCallback(
      (id, table) => {
        mutation.mutate({ id, table });
      },
      [mutation]
    );

    return type === "delete" ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete(id, table);
        }}
        className="flex flex-col items-center justify-center gap-2"
      >
        <span>
          All data will be lost. Are you sure want to delete this {table}?
        </span>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-colors">
          Delete
        </button>
      </form>
    ) : (
      forms[table](data, type, setOpenForm)
    );
  };
  useEffect(() => {
    if (openForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openForm]);
  const size = type === "create" ? "w-9 h-9" : "w-8 h-8";
  const bg =
    type === "create"
      ? "bg-webYellow"
      : type === "delete"
      ? "bg-webPurple"
      : "bg-webSky";
  const icon =
    type === "create" ? (
      <AddRounded fontSize="small" />
    ) : type === "delete" ? (
      <DeleteOutline style={{ fontSize: 16, color: "whitesmoke" }} />
    ) : table === "teacher" ||
      table === "student" ||
      table === "detailClass" ? (
      <EditOutlined style={{ fontSize: 20, color: "black" }} />
    ) : (
      <EditOutlined style={{ fontSize: 16, color: "whitesmoke" }} />
    );
  return (
    <div>
      <button
        onClick={() => setOpenForm(true)}
        className={`${size} flex rounded-full items-center justify-center ${bg}`}
      >
        {icon}
      </button>
      {openForm ? (
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="p-8 h-[90%] md:h-fit w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white rounded-xl relative overflow-auto">
            <CloseRounded
              onClick={() => {
                setOpenForm(false);
              }}
              className="absolute top-4 right-4 cursor-pointer"
            />
            <Suspense fallback={<div>Loading...</div>}>
              <Form />
            </Suspense>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormModal;
