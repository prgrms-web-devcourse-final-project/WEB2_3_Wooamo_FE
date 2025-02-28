import Image from "next/image";
import NotFoundImage from "@/assets/images/NotFoundImage.svg";
import Noise from "@/components/common/Noise";

export default function NotFound() {
  return (
    <Noise>
      <div className="bg-site-button h-screen flex flex-col gap-6 lg:gap-10 justify-center items-center">
        <div className="relative">
          <Image
            src={NotFoundImage}
            width={280}
            sizes="(max-width: 768px) 100%"
            alt="Not Found"
            className="w-50 lg:w-70"
          />
          <div className="w-3 h-3 bg-site-darkgray-02 absolute -top-12"></div>
          <div className="w-3 h-3 bg-site-main absolute -top-18 -left-5"></div>
          <div className="w-3 h-3 bg-site-main absolute -top-0 -left-15"></div>
          <div className="w-3 h-3 bg-site-main absolute bottom-2 -right-10"></div>
          <div className="w-3 h-3 bg-site-darkgray-02 absolute -bottom-5 -right-5"></div>
          <div className="w-3 h-3 bg-site-main absolute -bottom-15 -right-15"></div>
          <div className="w-3 h-3 bg-site-darkgray-02 absolute -bottom-25 -left-5"></div>
          <div className="w-3 h-3 bg-site-main absolute -bottom-32 left-2"></div>
        </div>
        <div className="font-galmuri text-3xl lg:text-5xl">NOT FOUND</div>
      </div>
    </Noise>
  );
}
