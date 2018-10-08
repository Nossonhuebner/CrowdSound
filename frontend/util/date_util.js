
export const dateFormatter = (date) => {
  const ellapsed = (+new Date) - (Date.parse(date));
  const minutes = Math.floor(ellapsed / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.42);
  const years = Math.floor(months / 12);
  if (years > 0) {
    return  years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return  months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return  days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return  hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return  minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (ellapsed) {
    return "less than a minute ago";
  } else {
    return "";
  }

};
