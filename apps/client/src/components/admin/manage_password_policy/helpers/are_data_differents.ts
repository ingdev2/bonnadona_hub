export const areDataDifferent = (
  initialData: {
    dataMinLenght: number;
    dataRequireUpperCase: boolean;
    dataRequireLowerCase: boolean;
    dataRequireNumber: boolean;
    dataRequireSpecialCharacter: boolean;
    dataPasswordExpiryDays: number;
    dataInactivityDays: number;
    dataPasswordHistoryLimit: number;
  },
  currentData: {
    dataMinLenght: number;
    dataRequireUpperCase: boolean;
    dataRequireLowerCase: boolean;
    dataRequireNumber: boolean;
    dataRequireSpecialCharacter: boolean;
    dataPasswordExpiryDays: number;
    dataInactivityDays: number;
    dataPasswordHistoryLimit: number;
  }
): boolean => {
  return (
    initialData.dataMinLenght !== currentData.dataMinLenght ||
    initialData.dataRequireUpperCase !== currentData.dataRequireUpperCase ||
    initialData.dataRequireLowerCase !== currentData.dataRequireLowerCase ||
    initialData.dataRequireNumber !== currentData.dataRequireNumber ||
    initialData.dataRequireSpecialCharacter !==
      currentData.dataRequireSpecialCharacter ||
    initialData.dataPasswordExpiryDays !== currentData.dataPasswordExpiryDays ||
    initialData.dataInactivityDays !== currentData.dataInactivityDays ||
    initialData.dataPasswordHistoryLimit !==
      currentData.dataPasswordHistoryLimit
  );
};
