interface ChattingItemProps {
  chatTime: string;
  nickname: string;
  isMe: boolean;
  chatting: string;
}

export default function ChattingItem({
  chatTime,
  nickname,
  isMe,
  chatting,
}: ChattingItemProps) {
  return (
    <>
      {isMe ? (
        <div className="flex justify-end my-5">
          <div className="flex flex-col justify-end mr-2 lg:mr-3">
            <p className="text-xs text-site-darkgray-02">{chatTime}</p>
          </div>
          <div className="flex items-start gap-3 lg:gap-5">
            <div className="px-5 lg:px-7 py-4 bg-site-profile rounded-xl lg:max-w-190">
              <span className="text-sm lg:text-base text-black">
                {chatting}
              </span>
            </div>
            <div className="flex">
              <div className="h-11 lg:h-14 w-11 lg:w-14 bg-site-darkgray-01 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex my-5">
          <div className="flex items-start gap-3 lg:gap-5">
            <div className="flex">
              <div className="h-11 lg:h-14 w-11 lg:w-14 bg-site-darkgray-01 rounded-full"></div>
            </div>
            <div className="px-5 lg:px-7 py-4 bg-site-white-100 rounded-xl lg:max-w-190">
              <span className="text-sm lg:text-base text-black">
                {chatting}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-end ml-2 lg:ml-3">
            <p className="text-xs text-site-darkgray-02">{chatTime}</p>
          </div>
        </div>
      )}
    </>
  );
}
