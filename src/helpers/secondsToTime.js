export default (seconds, showSecond = true) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - (hours * 3600)) / 60);
  let second = seconds - (hours * 3600) - (minutes * 60);
  let time = '';

  if (hours !== 0) { time = `${hours}h `; }

  if (minutes !== 0 || time !== '') {
    minutes = (minutes < 10 && time !== '') ? `0${minutes}` : String(minutes);
    time += `${minutes}m `;
  } else {
    time += minutes = '0m ';
  }
  if (showSecond) {
    if (time === '') {
      time = `${second}s`;
    } else {
      time += (second < 10) ? `0${second}s` : `${second}s`;
    }
  }
  return time;
};
