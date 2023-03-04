const handleItemSize = (height: number, rowHeight: number) => {
  const rowCount = Math.round(height / rowHeight);
  return rowCount * rowHeight;
};

export default handleItemSize;
