// @flow
export type Item = {
  itemId: number,
  owner: string,
  name: string,
  serialNumber: string,
  state: string,
};

export type SendRequestArgs = {
  itemId: number,
  fee: string,
  unit: string,
  start: string,
  end: string,
};

export type Request = {
  requestId: number,
  clientAddress: string,
  ownerAddress: string,
  itemId: number,
  itemName: string,
  serialNumber: string,
  feeEther: string,
  start: string,
  end: string,
  state: string,
};
