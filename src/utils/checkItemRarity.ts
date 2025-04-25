import { type Item, type ItemRarity } from "@/types/ItemType";

export function checkItemRarity(item: Item): ItemRarity | undefined {
  if (!item) return undefined;
  if (
    item.gold.total <= 1300 &&
    item.into &&
    item.into?.length > 1 &&
    !item.from
  ) {
    return "basic";
  }
  if (item.gold.total <= 1600 && item.from) {
    return "epic";
  }
  if (item.gold.total >= 1900 && item.from && item.from?.length > 1) {
    return "legendary";
  }
}
