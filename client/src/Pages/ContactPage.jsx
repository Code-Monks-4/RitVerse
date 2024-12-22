import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Yup validation schema
const schema = yup
  .object({
    prompt: yup.string().required("Prompt is required"),
  })
  .required();

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [response, setResponse] = useState("");

  const onSubmit = (data) => {
    console.log("Submitted Prompt:", data.prompt);
    setResponse("Bhai Jaldi Kaarenge Sabar Rakho");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    toast.success("Response copied to clipboard!");
  };

  return (
    <div className="h-auto flex justify-center items-start bg-transparent">
      <div className="relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3 px-6 py-6 mt-24">
        <h2 className="text-2xl text-white mb-4 font-semibold text-center">
          What can I help with?
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-4"
        >
          <div className="flex items-center space-x-4 w-full">
            <textarea
              id="prompt"
              name="prompt"
              placeholder="Enter your prompt..."
              {...register("prompt")}
              className={`w-full p-4 text-white bg-[#191919] rounded-md resize-none focus:outline-none transition-all duration-300 ${
                errors.prompt ? "border-red-500" : ""
              }`}
              style={{
                minHeight: "120px",
                maxHeight: "500px",
                overflowY: "auto",
                transition: "height 0.3s ease-in-out",
              }}
            />
            <button
              type="submit"
              className="p-4 border-2 border-transparent text-white rounded-full focus:outline-none transition-all duration-300 hover:border-green-500 hover:shadow-md hover:shadow-green-500/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white hover:text-green-500"
              >
                <path d="M21 2L12 13l-3-3-5 5 11 4L21 2z" />
              </svg>
            </button>
          </div>
          {errors.prompt && (
            <p className="text-red-500 text-sm mt-2">{errors.prompt.message}</p>
          )}
        </form>
        {response && (
          <div className="mt-6 w-full">
            <div
              className="p-4 bg-[#191919] text-white rounded-md shadow-md flex justify-between items-center"
              style={{ width: "100%" }}
            >
              <p className="text-lg flex-grow">{response}</p>
              <button
                onClick={handleCopy}
                className="ml-4 p-2 border-2 border-transparent text-white rounded-full focus:outline-none transition-all duration-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white hover:text-blue-500"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
