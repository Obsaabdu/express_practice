export interface Metadata {
  [key: string]: number;
}

export interface DatabaseSchema {
  idNum: number;
  metadata: Metadata;
  data: Record<string, Record<string, any>>;
}
