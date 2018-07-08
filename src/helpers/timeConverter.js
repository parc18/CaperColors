export const edpTime = UnixTimestamp => {
  const a = new Date(UnixTimestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const day = weeks[a.getDay()];
  const date = a.getDate();
  // const hour = a.getHours();
  // const min = a.getMinutes();
  // const sec = a.getSeconds();
  const time = `${day}, ${date} ${month} ${year}`;
  return time;
};

export const homeTime = UnixTimestamp => {
  const a = new Date(UnixTimestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  // const day = weeks[a.getDay()];
  const date = a.getDate();
  // const hour = a.getHours();
  // const min = a.getMinutes();
  // const sec = a.getSeconds();
  const time = `  ${date} ${month} ${year}`;
  return time;
};
