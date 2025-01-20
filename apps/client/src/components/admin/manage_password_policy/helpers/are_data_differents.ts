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
    dataMaximunMinutesOfInactivity: number;
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
    dataMaximunMinutesOfInactivity: number;
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
      currentData.dataPasswordHistoryLimit ||
    initialData.dataMaximunMinutesOfInactivity !==
      currentData.dataMaximunMinutesOfInactivity
  );
};
