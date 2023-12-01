export function formatVideoDuration(durationInSeconds: number | undefined): string {
  if(durationInSeconds === undefined) return '';
  
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formatUnit = (unit: number): string => {
    return unit < 10 ? `0${unit}` : `${unit}`;
  };

  const formattedHours = formatUnit(hours);
  const formattedMinutes = formatUnit(minutes);
  const formattedSeconds = formatUnit(seconds);

  let timeTotal = '';

  if(formattedHours !== '00') {
    timeTotal = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  } else {
    timeTotal = `${formattedMinutes}:${formattedSeconds}`
  }
    
  return  timeTotal;
}