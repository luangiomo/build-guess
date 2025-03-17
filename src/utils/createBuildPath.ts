import { getItemById } from "@/api/items";
import type { BuildNode, BuildPathType } from "@/types/BuildPathType";
import type { Item } from "@/types/ItemType";

export async function createBuildPath(item: Item): Promise<BuildPathType> {
  const { id, from } = item;

  const buildPath: BuildPathType = {
    id,
    from: from
      ? await Promise.all(
          from.map(async (id, childIndex) => {
            const item = await getItemById(id);
            const node: BuildNode = {
              id: item?.id,
              selectedId: "",
              position: childIndex + 1,
              status: "empty",
              from: item?.from
                ? await Promise.all(
                    item.from.map((id, grandChildIndex) => {
                      const node: BuildNode = {
                        id,
                        selectedId: "",
                        position: Number(
                          (childIndex + 1).toString() +
                            (grandChildIndex + 1).toString()
                        ),
                        status: "empty",
                        from: [],
                      };
                      return node;
                    })
                  )
                : [],
            };
            return node;
          })
        )
      : [],
  };

  return buildPath;
}
