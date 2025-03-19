import type { ItemRarity, ItemsResponse, Item } from "@/types/ItemType";
import { checkItemRarity } from "@/utils/checkItemRarity";
import { isValidItem } from "@/utils/isValidItem";

const API_URL = "https://ddragon.leagueoflegends.com";
const API_VERSION: string | undefined = await getMostRecentVersion();
const API_LANGUAGE = "pt_BR";

async function getMostRecentVersion(): Promise<string> {
  const res = await fetch(`${API_URL}/api/versions.json`);
  const versions: string[] = await res.json();
  return versions[0];
}

export async function getItems(): Promise<Item[]> {
  try {
    const response = await fetch(
      `${API_URL}/cdn/${API_VERSION}/data/${API_LANGUAGE}/item.json`
    );
    const json = (await response.json()) as ItemsResponse;
    let validItems: Item[] = [];

    for (const [key, value] of Object.entries(json.data)) {
      isValidItem(value, key) && validItems.push({ ...value, id: key });
    }
    return validItems.sort((a, b) => a.gold.total - b.gold.total).reverse();
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    return [];
  }
}

export async function getItemById(id: string): Promise<Item | undefined> {
  const items = await getItems();
  const item = items?.find((item) => item.id === id);
  return item;
}

export async function getItemsByRarity(rarity: ItemRarity): Promise<Item[]> {
  const items = await getItems();
  let validItems: Item[] = [];
  for (const item of items) {
    if (checkItemRarity(item) === rarity) {
      validItems.push(item);
    }
  }
  return validItems.sort((a, b) => a.gold.total - b.gold.total).reverse();
}

export function getItemSpriteURL(item: Item): string {
  return `${API_URL}/cdn/${API_VERSION}/img/sprite/${item?.image.sprite}`;
}
export function getItemImageURL(item: Item): string {
  return `${API_URL}/cdn/${API_VERSION}/img/item/${item?.image.full}`;
}
export function getItemImageURLById(id: string): string {
  return `${API_URL}/cdn/${API_VERSION}/img/item/${id}.png`;
}
