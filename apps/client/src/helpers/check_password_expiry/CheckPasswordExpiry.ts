export const checkPasswordExpiry = (
  lastPasswordUpdate: string,
  expiryDays: number
): boolean => {
  const lastUpdateDate = new Date(lastPasswordUpdate);
  const today = new Date();

  const differenceInMs = today.getTime() - lastUpdateDate.getTime();
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  return differenceInDays >= expiryDays;
};
