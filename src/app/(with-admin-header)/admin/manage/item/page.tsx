import { costumes } from "@/consts/costumes";
import CostumeItem from "./CostumeItem";
import AddCustume from "./AddCustume";
import { shopApi } from "@/api/shop/shop";

export default async function page() {
  const fetchCostumeList = await shopApi.getCostumeList();
  const costumeList = fetchCostumeList?.data.contents;
  if (!costumeList) return;

  return (
    <div className="flex flex-col gap-15">
      <AddCustume />
      <div className="flex flex-wrap gap-10">
        {costumeList.map((costume) => (
          <CostumeItem
            key={costume.costumeId}
            costumeId={costume.costumeId}
            costume={costume.image}
            name={costume.costumeName}
            point={costume.point}
          />
        ))}
      </div>
    </div>
  );
}
