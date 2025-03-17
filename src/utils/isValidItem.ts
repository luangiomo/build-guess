import { type Item, Tag } from "../types/ItemType";

export function isValidItem(item: Item, id: string): boolean {
  if (
    item.maps["11"] === false ||
    item.requiredChampion ||
    item.specialRecipe ||
    item.consumed ||
    item.hideFromAll ||
    item.inStore == false ||
    item.gold.total === 0 ||
    (item.gold.total < 500 && !item.into) ||
    item.tags.some((value) => value === Tag.Jungle || value === Tag.Boots) ||
    id.length > 4
  ) {
    return false;
  }
  return true;
}
