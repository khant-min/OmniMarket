export const successResponse = (
  statusCode: number,
  message: string,
  data: any
) => {
  return {
    statusCode,
    message,
    data,
  };
};

export const errorResponse = (
  statusCode: number,
  message: string,
  data = {}
) => {
  const errorCode = 1;
  return {
    errorCode: errorCode,
    statusCode,
    message,
    error: data,
  };
};
