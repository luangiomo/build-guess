export type BuildPathType = {
  id: string | undefined;
  from: BuildNode[] | [];
};

export type BuildNode = {
  id: string | undefined;
  selectedId: string;
  position: number;
  status: ValidationStatus;
  from: BuildNode[] | [];
};

type ValidationStatus = "empty" | "pending" | "valid" | "invalid";
