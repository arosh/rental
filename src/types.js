export type Item = {
  index: number,
  owner: string,
  name: string,
  state: string,
};

export type RequestArgs = {
  fee: number,
  unit: string,
  start: string,
  end: string,
};
