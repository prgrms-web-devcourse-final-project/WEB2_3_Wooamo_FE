"use client";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Modal from "@/components/common/Modal";
import { DatePicker } from "@/components/ui/datePicker";
import { useModalStore } from "@/store/modalStore";
import { useEffect, useState } from "react";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { adminApi } from "@/api/admin/admin";
import formatDateToKR from "@/utils/formatDateToKR";
import { revalidateTagAction } from "@/actions";

export default function AddEvent() {
  const today = new Date();
  const tomorrow = new Date(today).setDate(today.getDate() + 1);
  const { open, close } = useModalStore((state) => state);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventHeadcount, setEventHeadcount] = useState<number>();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(tomorrow));
  const [eventPoint, setEventPoint] = useState<number>();
  const [eventImage, setEventImage] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files;

    if (!targetFile) return;
    const filesArray = Array.from(targetFile);
    const selectedFiles: string[] = filesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagePreview(selectedFiles);
    setEventImage(filesArray);
  };

  const resetInputFields = () => {
    setEventName("");
    setEventDescription("");
    setStartDate(new Date());
    setEndDate(new Date(tomorrow));
    setEventHeadcount(0);
    setEventPoint(0);
    setEventImage([]);
    setImagePreview([]);
  };

  const registerEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      eventName &&
      eventDescription &&
      startDate &&
      endDate &&
      eventHeadcount &&
      eventPoint &&
      eventImage
    ) {
      e.preventDefault();
      const formData = new FormData();
      const contents = {
        name: eventName,
        context: eventDescription,
        recruitCap: eventHeadcount,
        startDate: String(formatDateToKR(startDate)),
        endDate: String(formatDateToKR(endDate)),
        bettingPointCap: eventPoint,
      };

      formData.append(
        "contents",
        new Blob([JSON.stringify(contents)], { type: "application/json" }),
      );

      formData.append("image", eventImage[0]);

      const request = await adminApi.postEventCreate(formData);

      if (request?.status === "성공") {
        close();
        revalidateTagAction("event-list");
      }
    }
  };

  useEffect(() => {
    const newEndDate = new Date(startDate).setDate(startDate.getDate() + 1);
    setEndDate(new Date(newEndDate));
  }, [startDate]);

  return (
    <>
      <Button onClick={() => open(`add-event`)}>이벤트 등록</Button>

      <Modal
        modalId={`add-event`}
        className="w-200 px-5"
        onClose={resetInputFields}
      >
        <form onSubmit={registerEvent} className="flex flex-col gap-5">
          <div className="text-xl font-semibold">이벤트 등록</div>
          <div className="flex gap-5">
            <div className="flex flex-1 flex-col gap-5">
              <div>
                <label htmlFor="title" className="hidden"></label>
                <input
                  required
                  value={eventName}
                  id="title"
                  type="text"
                  placeholder="이벤트 제목을 입력해주세요"
                  className="w-full border-b border-b-site-darkgray-01 px-4 py-2"
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description" className="hidden">
                  이벤트 설명
                </label>
                <textarea
                  required
                  value={eventDescription}
                  placeholder="이벤트에 대한 설명을 작성해주세요"
                  className="w-full h-25 resize-none border border-site-lightgray rounded-2xl px-4 py-2"
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="headcount">인원</label>
                <input
                  required
                  value={eventHeadcount}
                  id="headcount"
                  type="number"
                  className="w-full border border-site-lightgray rounded-2xl px-4 py-2"
                  onChange={(e) => setEventHeadcount(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="period">기간</label>
                <div className="flex items-center gap-1">
                  <DatePicker
                    value={startDate}
                    fromDate={new Date()}
                    onChange={(date) => setStartDate(date)}
                  />
                  <span>-</span>
                  <DatePicker
                    value={endDate}
                    fromDate={startDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="point">포인트</label>
                <input
                  required
                  value={eventPoint}
                  id="point"
                  type="number"
                  className="w-full border border-site-lightgray rounded-2xl px-4 py-2"
                  onChange={(e) => setEventPoint(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <div className="w-80 h-80 bg-site-lightgray rounded-2xl flex items-center justify-center relative">
                <label
                  htmlFor="event-image"
                  className={twMerge(
                    "w-full h-full flex justify-center items-center absolute",
                  )}
                >
                  {!eventImage.length && (
                    <Icon MuiIcon={AddPhotoAlternateRoundedIcon} />
                  )}
                </label>
                <input
                  type="file"
                  id="event-image"
                  className="hidden"
                  onChange={onChangeImage}
                  accept="image/*"
                />
                {eventImage &&
                  imagePreview.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      width={320}
                      height={320}
                      alt="이미지 미리보기"
                    />
                  ))}
              </div>
              <Button type="submit" className="lg:h-11 lg:text-base">
                등록하기
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
