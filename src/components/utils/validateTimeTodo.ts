/* eslint-disable operator-linebreak */
export const handleMinutesToHalfHour = (time: string) => {
  const normalizedTime = time.split(':');
  const hours =
    parseInt(normalizedTime[0], 10) < 10
      ? `0${parseInt(normalizedTime[0], 10)}`
      : `${parseInt(normalizedTime[0], 10)}`;
  const minutes = parseInt(normalizedTime[1], 10);
  const result = minutes < 30 ? `${hours}:00` : `${hours}:30`;
  return result;
};

export const validateStartEndTime = (
  start: string,
  end: string,
  date: string,
) => {
  const startHour = start.split(':')[0];
  const endHour = end.split(':')[0];
  if (!startHour || !endHour || !date) return false;
  const allMinutesFromStart =
    parseInt(startHour, 10) * 60 + parseInt(start.split(':')[1], 10);
  const allMinutesFromEnd =
    parseInt(endHour, 10) * 60 + parseInt(end.split(':')[1], 10);
  if (allMinutesFromStart < allMinutesFromEnd) {
    return true;
  }
  return false;
};
