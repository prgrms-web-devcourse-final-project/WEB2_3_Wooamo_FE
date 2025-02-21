import { costumes } from "@/consts/costumes";
import CostumeItem from "./CostumeItem";
import AddCustume from "./AddCustume";

export default function page() {
  return (
    <>
      <div className="flex flex-col gap-15">
        <AddCustume />
        <div className="flex flex-wrap gap-10">
          {costumes.map((costume, index) => (
            <CostumeItem
              key={`costume${index}`}
              index={index}
              costume={costume}
            />
          ))}
        </div>
      </div>
    </>
  );
}
