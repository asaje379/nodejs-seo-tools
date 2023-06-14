export type Result<T> = { result: { result: T } };
export interface TaskResult<T> {
  task: Result<T>;
  [x: string]: string | Result<T>;
}
