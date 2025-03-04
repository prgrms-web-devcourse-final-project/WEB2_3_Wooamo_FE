"use client";

import Icon from "@/components/common/Icon";
import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PostImageProps {
  showDeleteIcon?: boolean;
  imageUrl: string;
  images?: string[];
  currentIndex?: number;
}

export default function PostImage({
  showDeleteIcon = true,
  imageUrl,
  images = [],
  currentIndex = 0,
}: PostImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayImages = images.length > 0 ? images : [imageUrl];

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="w-25 lg:w-40 h-25 lg:h-40 bg-site-white-100 relative cursor-pointer"
      >
        <Image
          src={imageUrl}
          alt="게시글 미리보기 이미지"
          className="object-cover"
          sizes="100%"
          fill
        />

        {showDeleteIcon && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("이미지 삭제");
            }}
            className="absolute top-0.5 lg:top-1 right-0.5 lg:right-1 flex justify-center items-center w-6 lg:w-7 h-6 lg:h-7 bg-site-black-50 rounded-sm"
          >
            <Icon MuiIcon={CloseRoundedIcon} className="text-white" />
          </button>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div className="relative w-[90vw] h-[90vh] max-w-[1200px] max-h-[800px]">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <Icon MuiIcon={CloseRoundedIcon} className="text-white" />
              </button>

              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                initialSlide={currentIndex}
                className="w-full h-full"
                spaceBetween={30}
                effect="fade"
                speed={500}
              >
                {displayImages.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`이미지 ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="100%"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <style jsx global>{`
                .swiper-button-next,
                .swiper-button-prev {
                  color: white !important;
                  background: rgba(0, 0, 0, 0.5);
                  width: 40px !important;
                  height: 40px !important;
                  border-radius: 50%;
                }
                .swiper-button-next:after,
                .swiper-button-prev:after {
                  font-size: 20px !important;
                }
                .swiper-pagination-bullet {
                  background: white !important;
                  opacity: 0.5;
                }
                .swiper-pagination-bullet-active {
                  opacity: 1;
                }
              `}</style>
            </div>
          </div>,
          document.getElementById("modal-root") as HTMLElement,
        )}
    </>
  );
}
