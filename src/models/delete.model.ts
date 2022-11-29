export type DeleteCallback = null | (() => void);

export interface DeleteState {
  callback: DeleteCallback;
}
