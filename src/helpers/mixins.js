export const formatDate = (timestamp, mobile) => {
  var d = new Date(timestamp * 1000);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    d.getDate() +
    " " +
    (!mobile
      ? monthNames[d.getMonth()]
      : monthNames[d.getMonth()].substr(0, 3)) +
    " " +
    d.getFullYear()
  );
};
