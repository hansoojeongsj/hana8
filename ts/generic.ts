type X<T> = { id: T };

type IdNum = X<number>;
type IdStr = X<string>;

//
interface FailureResult {
  error: Error;
  succeeded: false;
}
interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}
type Result<T> = FailureResult | SuccessfulResult<T>;
type ResultX<Data> = { error?: Error; data?: Data; succeeded: boolean };

const x: Result<string> = { succeeded: true, data: 'xxx' };
x.data;

//