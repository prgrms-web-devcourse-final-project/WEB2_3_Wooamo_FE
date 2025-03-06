"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { partyApi } from "@/api/party/party";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { userApi } from "@/api/user/user";

export default function EventParties() {
  const [eventBanners, setEventBanners] = useState<EventBannerType[]>([]);
  const [user, setUser] = useState<userType>();

  useEffect(() => {
    const fetchEventBanner = async () => {
      const eventBanner = await partyApi.getEventBanner();

      if (!eventBanner) return;
      setEventBanners(eventBanner.data);
    };
    const fetchCurrentUser = async () => {
      const currentUser = await userApi.getCurrentUserInfo();

      if (!currentUser) return;
      setUser(currentUser.data);
    };

    fetchEventBanner();
    fetchCurrentUser();
  }, []);

  return (
    <section className="flex flex-col gap-2.5 lg:gap-7 mt-15 px-5 lg:px-0">
      <div className="flex justify-between items-center w-full">
        <p className="font-galmuri text-xl lg:text-2xl">
          <span>진행 중인 이벤트 팟</span>
          <span className="ml-3">{eventBanners.length}</span>
        </p>
        {user && (
          <Link href={"/party/create"}>
            <Button type="button">팟 생성</Button>
          </Link>
        )}
      </div>
      {eventBanners.length !== 0 ? (
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
          {eventBanners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Link href={`${user ? `/party/${banner.partyId}` : `/party`}`}>
                <Image
                  src={banner.image}
                  alt="이벤트 팟 이미지"
                  className="object-contain"
                  sizes="100%"
                  fill
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-site-darkgray-02">
          진행 중인 이벤트 팟이 없습니다
        </div>
      )}
    </section>
  );
}
