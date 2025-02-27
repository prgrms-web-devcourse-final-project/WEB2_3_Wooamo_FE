"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import EventImage from "@/assets/images/eventImage.png";
import Link from "next/link";

export default function EventParties() {
  return (
    <section className="flex flex-col gap-2.5 lg:gap-7 mt-15 px-5 lg:px-0">
      <p className="font-galmuri text-xl lg:text-2xl">
        <span>진행 중인 이벤트 팟</span>
        <span className="ml-3">4</span>
      </p>
      <Swiper
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: { clickable: true },
          },
          768: {
            slidesPerView: 3.3,
            spaceBetween: 20,
            pagination: false,
          },
        }}
        spaceBetween={20}
        slidesPerView={4.3}
        onSlideChange={() => console.log("slide change")}
        autoplay={{
          delay: 4000,
        }}
        speed={500}
        pagination={{ clickable: true }}
        className="w-full h-52"
      >
        {[1, 2, 3, 4, 5].map((_, index) => (
          <SwiperSlide key={index}>
            <Link href={`/party/1`}>
              <Image
                src={EventImage}
                alt="이벤트 팟 이미지"
                className="object-cover"
                sizes="100%"
                fill
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
