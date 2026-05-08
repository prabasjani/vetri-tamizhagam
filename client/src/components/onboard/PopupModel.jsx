import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PopupModel = ({ setToggleModal }) => {
  const navigate = useNavigate();
  const handleContinuePortal = () => {
    setToggleModal(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="h-dvh w-dvw bg-gray-500/50 fixed left-0 top-0 flex items-center justify-center">
      <div className="p-12 rounded-md bg-surface flex flex-col items-center gap-y-2 w-125 shadow-2xl">
        <CiCircleCheck size={120} color="green" />
        <h2>Registration Successful</h2>
        <h5>Application Ref: TVK-2026-569524</h5>
        <p className="leading-7! text-center">
          Your application has been received and is under review. You will
          receive a confirmation on your registered email and mobile number
          within 24–48 working hours.
        </p>
        <button
          className="btn mt-4! flex items-center gap-1.5"
          onClick={handleContinuePortal}
        >
          Continue To Portal <MdArrowRightAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default PopupModel;
