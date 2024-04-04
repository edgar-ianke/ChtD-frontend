export default function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayofMonth = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute}, ${dayofMonth < 10 ? `0${dayofMonth}`: dayofMonth}/${month < 10 ? `0${month}`: month}/${year}`;
}
