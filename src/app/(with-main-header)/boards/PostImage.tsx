"use client";

import Icon from "@/components/common/Icon";
import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard, Mousewheel } from "swiper/modules";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
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
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const displayImages = images.length > 0 ? images : [imageUrl];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div className="relative w-70 h-70 lg:w-150 lg:h-150 max-w-250 max-h-150 bg-site-white-50">
              <button
                onClick={() => swiper?.slidePrev()}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10"
              >
                <Icon
                  MuiIcon={ChevronLeftRoundedIcon}
                  className="text-site-main bg-site-white-70 rounded-2xl"
                />
              </button>
              <button
                onClick={() => swiper?.slideNext()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10"
              >
                <Icon
                  MuiIcon={ChevronRightRoundedIcon}
                  className="text-site-main bg-site-white-70 rounded-2xl"
                />
              </button>
              <Swiper
                modules={[Pagination, Keyboard, Mousewheel]}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                mousewheel={{ enabled: true }}
                initialSlide={currentIndex}
                className="w-full h-full"
                spaceBetween={30}
                speed={500}
                onSwiper={(swiper) => setSwiper(swiper)}
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
            </div>
          </div>,
          document.getElementById("modal-root") as HTMLElement,
        )}
    </>
  );
}
