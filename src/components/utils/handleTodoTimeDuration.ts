/* eslint-disable operator-linebreak */
const handleTodoTimeDuration = (start: number, end: number) => {
  const todoStartTime = new Date(start);
  const todoEndTime = new Date(end);
  const todoStartHour =
    todoStartTime.getHours() < 10
      ? `0${todoStartTime.getHours()}`
      : `${todoStartTime.getHours()}`;
  const todoStartMinutes =
    todoStartTime.getMinutes() > 0
      ? `${todoStartTime.getMinutes()}`
      : `${todoStartTime.getMinutes()}0`;
  const todoEndHour =
    todoEndTime.getHours() < 10
      ? `0${todoEndTime.getHours()}`
      : `${todoEndTime.getHours()}`;
  const todoEndMinutes =
    todoEndTime.getMinutes() > 0
      ? `${todoEndTime.getMinutes()}`
      : `${todoEndTime.getMinutes()}0`;

  const startTime = `${todoStartHour}:${todoStartMinutes}`;
  const endTime = `${todoEndHour}:${todoEndMinutes}`;

  const result = `${startTime} - ${endTime}`;
  return result;
};

export default handleTodoTimeDuration;
