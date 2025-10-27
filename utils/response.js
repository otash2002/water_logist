export const success = (res, data = {}, message = 'OK', code = 200) => {
  return res.status(code).json({ success: true, message, data });
};

export const error = (res, message = 'Something went wrong', code = 500, details = null) => {
  const payload = { success: false, message };
  if (details) payload.details = details;
  return res.status(code).json(payload);
};
