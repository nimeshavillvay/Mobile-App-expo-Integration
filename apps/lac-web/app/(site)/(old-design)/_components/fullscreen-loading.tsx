import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FullscreenLoading = () => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/60">
      <AiOutlineLoading3Quarters className="animate-spin text-3xl leading-none text-brand-success" />
    </div>
  );
};

export default FullscreenLoading;
