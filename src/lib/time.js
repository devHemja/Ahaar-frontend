export function timeAgo(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function timeLeft(expiresAtInput) {
  if (!expiresAtInput) return '';
  const diffMs = new Date(expiresAtInput).getTime() - Date.now();
  if (diffMs <= 0) return 'Expired';

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;

  if (hours < 1) return `${remMinutes}m left`;
  return `${hours}h ${remMinutes}m left`;
}
