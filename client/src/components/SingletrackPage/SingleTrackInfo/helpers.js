import { differenceInSeconds, format } from 'date-fns';

export const formatDuration = (start, finish) => {
  const diffTime = differenceInSeconds(finish, start);
  if (!diffTime) return '00:00'; // divide by 0 protection
  const minutes = Math.abs(Math.floor(diffTime / 60) % 60).toString();
  const hours = Math.abs(Math.floor(diffTime / 60 / 60)).toString();
  return `${hours.length < 2 ? 0 + hours : hours}:${minutes.length < 2 ? 0 + minutes : minutes}`;
};

export const getTrackDuration = (track) => {
  const startTime = track.Data[0].ts;
  const endTime = track.Data[track.Data.length - 1].ts;
  return formatDuration(new Date(startTime), new Date(endTime));
};

export const getTrackLength = (track) => track.StartEndDistance.toFixed(1);

export const getStartTime = (track) => format(new Date(track.Data[0].ts), 'hh:mm');

export const getEndTime = (track) => format(new Date(track.Data[track.Data.length - 1].ts), 'hh:mm');

export const getMaxAltitude = (track) => Math.max(...track.Data.map((t) => (t.alt)));

export const getStartAltitude = (track) => track.Data[0].alt;

export const getEndAltitude = (track) => track.Data[track.Data.length - 1].alt;
