import { partyApi } from "@/api/party/party";
import { revalidateTagAction } from "@/actions";
import Button from "@/components/common/Button";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";
import Modal from "@/components/common/Modal";
import useInputValidation from "@/hooks/useInputValidation";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";

import { FormEvent } from "react";

interface CreatePartyProps {
  title: string;
  description: string;
  maxPeople: number;
  startDate: string;
  endDate: string;
  minBetting: number;
}

export default function CreatePartyButton({
  title,
  description,
  maxPeople,
  startDate,
  endDate,
  minBetting,
}: CreatePartyProps) {
  const { open, close } = useModalStore((state) => state);
  const { validate, ...point } = useInputValidation(0, (value) => {
    if (!value || Number(value) < minBetting) {
      return "최소 배팅 금액 이상 입력해주세요";
    }
    return null;
  });
  const router = useRouter();

  const createParty = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    if (
      title &&
      description &&
      maxPeople &&
      startDate &&
      endDate &&
      minBetting &&
      point.value
    ) {
      const request = await partyApi.postPartyCreateAndParticipate({
        name: title,
        context: description,
        recruitCap: maxPeople,
        startDate,
        endDate,
        bettingPointCap: minBetting,
        userBettingPoint: point.value,
      });

      if (request?.status === "성공") {
        revalidateTagAction("party-list");
        close();
        router.replace(`/party/${request.data.partyId}`);
      }
    }
  };

  return (
    <>
      <Button type="button" onClick={() => open("create-party")}>
        생성하기
      </Button>
      <Modal modalId="create-party">
        <form
          onSubmit={createParty}
          className="flex flex-col items-center w-full gap-7.5"
        >
          <div className="flex flex-col w-full items-center gap-4">
            <span className="text-xl">배팅 포인트</span>
            <InputWithErrorMsg
              type="number"
              className="bg-site-button-input"
              placeholder="배팅할 포인트를 입력해주세요"
              autoFocus
              {...point}
            />
          </div>
          <Button className="w-fit px-6">팟 생성 및 참여</Button>
        </form>
      </Modal>
    </>
  );
}
