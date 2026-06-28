function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function NGOAvatar({ name, size = 48 }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl font-bold text-white shrink-0 select-none"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.32,
        background: 'linear-gradient(135deg, #F59E0B, #EA580C)',
      }}
    >
      {getInitials(name)}
    </div>
  );
}
