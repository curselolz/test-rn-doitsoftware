const getTimeFromDate = timestamp => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

export default getTimeFromDate;
