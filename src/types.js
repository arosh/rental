export type Item = {
  itemId: number,
  owner: string,
  name: string,
  state: string,
};

export type RequestArgs = {
  itemId: number,
  fee: string,
  unit: string,
  start: string,
  end: string,
};
