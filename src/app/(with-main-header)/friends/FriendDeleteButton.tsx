"use client";

import { friendApi } from "@/api/friend/friend";
import { revalidateTagAction } from "@/actions";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/store/modalStore";

export default function FriendDeleteButton({ friend }: { friend: friendType }) {
  const { open, close } = useModalStore();

  const deleteFriend = async () => {
    const res = await friendApi.deleteFriend(friend.friendId);
    if (res?.status === "성공") {
      revalidateTagAction("friends");
      close();
    }
  };
  return (
    <>
      <Button onClick={() => open(`friend-delete-${friend.friendId}`)}>
        삭제
      </Button>
      <Modal modalId={`friend-delete-${friend.friendId}`}>
        <div className="flex flex-col items-center">
          <p className="text-xl">친구를 삭제하시겠습니까?</p>
          <div className="flex gap-5 mt-5">
            <Button onClick={deleteFriend}>삭제하기</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
