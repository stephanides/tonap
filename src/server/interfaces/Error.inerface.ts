interface IError extends Error {
  response?: string;
  status?: number;
}

export default IError;
