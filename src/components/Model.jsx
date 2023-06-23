import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Model = ({isOpen, onClose, children}) => {
  return createPortal (
    <>
      {isOpen && (
        <div className="grid items-center absolute top-0 z-40 h-screen w-screen backdrop-blur">
        <div className="m-auto relative z-50 min-h-[200px] min-w-[70%] bg-white p-3 rounded-lg">
          <div className="flex justify-end">
            <AiOutlineClose  
              onClick={onClose}
              className="cursor-pointer text-2xl font-medium"
            />
          </div>
          {children}
        </div>
        <div className="">
        </div>
        </div>
      )}
    </>,
    document.getElementById("model-root")
  );
};

export default Model;
