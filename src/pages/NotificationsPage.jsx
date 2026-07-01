import { useEffect, useState } from 'react';
import { Megaphone, CheckCircle2, PackageCheck, CheckCheck, Loader2 } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { apiFetch } from '../lib/api';
import { timeAgo } from '../lib/time';

const TYPE_META = {
  food_alert: { icon: Megaphone, color: 'iconAmber', chip: 'bgChipAmber' },
  request_accepted: { icon: CheckCircle2, color: 'iconBlue', chip: 'bgChipBlue' },
  delivered: { icon: PackageCheck, color: 'iconGreen', chip: 'bgChipGreen' },
};

export default function NotificationsPage() {
  const { tokens } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await apiFetch('/api/notifications');
        if (!cancelled) setNotifications(data.data || []);
      } catch {
        // Leave the list empty; the empty state below covers this.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function markAsRead(id) {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    try {
      await apiFetch(`/api/notifications/${id}/read`, { method: 'PUT' });
    } catch {
      // Best-effort — the optimistic update already reflects locally.
    }
  }

  async function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await apiFetch('/api/notifications/read-all', { method: 'PUT' });
    } catch {
      // Best-effort — the optimistic update already reflects locally.
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="text-3xl font-bold" style={{ color: tokens.textPrimary }}>
          Notifications
        </h1>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer hover:opacity-75 transition-opacity"
            style={{ color: tokens.brandPrimary }}
          >
            <CheckCheck size={15} />
            Mark all as read
          </button>
        )}
      </div>
      <p className="text-sm mb-6" style={{ color: tokens.textSecondary }}>
        {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : "You're all caught up"}
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-20" style={{ color: tokens.textMuted }}>
          <Loader2 size={22} className="animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <div
          className="rounded-2xl border flex flex-col items-center justify-center text-center py-20 px-6"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <p className="font-semibold mb-1" style={{ color: tokens.textPrimary }}>
            No notifications yet
          </p>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Updates on your listings and deliveries will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {notifications.map((note) => {
            const meta = TYPE_META[note.type] || TYPE_META.food_alert;
            const Icon = meta.icon;

            return (
              <button
                key={note._id}
                type="button"
                onClick={() => markAsRead(note._id)}
                className="w-full flex items-start gap-3.5 rounded-2xl border p-4 text-left cursor-pointer transition-colors theme-transition"
                style={{
                  backgroundColor: note.isRead ? tokens.bgCard : tokens.bgChipAmber,
                  borderColor: note.isRead ? tokens.borderColor : tokens.brandPrimary,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: tokens[meta.chip] }}
                >
                  <Icon size={18} style={{ color: tokens[meta.color] }} />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: tokens.textPrimary, fontWeight: note.isRead ? 500 : 700 }}
                  >
                    {note.message}
                  </p>
                  <p className="text-xs mt-1" style={{ color: tokens.textMuted }}>
                    {timeAgo(note.createdAt)}
                  </p>
                </div>

                {!note.isRead && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                    style={{ backgroundColor: tokens.brandPrimary }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
