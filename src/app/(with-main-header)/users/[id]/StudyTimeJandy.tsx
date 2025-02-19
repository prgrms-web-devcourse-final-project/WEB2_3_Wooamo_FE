import Icon from "@/components/common/Icon";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export default function StudyTimeJandy() {
  const daysOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  ).getDate();

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="font-semibold">공부 시간</p>
        <div className="flex items-center gap-4">
          <button>
            <Icon MuiIcon={ChevronLeftRoundedIcon} />
          </button>
          <span className="font-semibold">2025년 03월</span>
          <button>
            <Icon MuiIcon={ChevronRightRoundedIcon} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 auto-cols-auto gap-2">
        {Array.from({ length: daysOfMonth }).map((_, index) => (
          <div
            key={`day${index + 1}`}
            className="w-full h-9 bg-site-button"
          ></div>
        ))}
      </div>
    </section>
  );
}
