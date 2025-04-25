import { getItemsByRarity } from "@/api/items";
import { getRandomNumber } from "@/utils/getRandomNumber";

export async function drawItem() {
  const legendaryItems = await getItemsByRarity("legendary");
  const randomIndex = getRandomNumber(legendaryItems.length);
  return legendaryItems[randomIndex];
}
