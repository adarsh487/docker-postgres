export const returnResponse = (
  res,
  code = 200,
  status = true,
  data = {},
  message = ""
) => {
  return res.status(code).json({ status, data, message });
};
