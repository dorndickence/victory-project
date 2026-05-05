import React, { useState, useMemo, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { apiFetch } from '../lib/api';
import type { Announcement } from '../types';
import { Megaphone, Send, Users, GraduationCap, BookOpen, UserCheck, Loader2 } from 'lucide-react';

const AudienceBadge: React.FC<{ audience: Announcement['audience'] }> = ({ audience }) => {
  const styles: Record<Announcement['audience'], string> = {
    All: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Students: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Teachers: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Parents: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[audience]}`}>
      {audience}
    </span>
  );
};

const CommunicationPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [audienceFilter, setAudienceFilter] = useState<'All' | Announcement['audience']>('All');
  const [showCompose, setShowCompose] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', audience: 'All' as Announcement['audience'] });

  useEffect(() => {
    apiFetch<{ data: { announcements: Announcement[] } }>('/communication')
      .then(res => setAnnouncements(res.data.announcements))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() =>
    announcements.filter(a => audienceFilter === 'All' || a.audience === audienceFilter),
    [announcements, audienceFilter]
  );

  const handleSend = async () => {
    if (!form.title.trim() || !form.message.trim()) return;
    setSending(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await apiFetch<{ data: { announcement: Announcement } }>('/communication', {
        method: 'POST',
        body: JSON.stringify({ ...form, date: today, author: 'Admin' }),
      });
      setAnnouncements(prev => [res.data.announcement, ...prev]);
      setForm({ title: '', message: '', audience: 'All' });
      setShowCompose(false);
    } catch (err: unknown) {
      alert(`Failed to send: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Communication Portal</h1>
        <Button onClick={() => setShowCompose(v => !v)}>
          <Megaphone className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {(['All', 'Students', 'Teachers', 'Parents'] as const).map(audience => {
          const icons = {
            All: <Users className="h-6 w-6 text-white" />,
            Students: <GraduationCap className="h-6 w-6 text-white" />,
            Teachers: <BookOpen className="h-6 w-6 text-white" />,
            Parents: <UserCheck className="h-6 w-6 text-white" />,
          };
          const colors = { All: 'bg-purple-500', Students: 'bg-blue-500', Teachers: 'bg-green-500', Parents: 'bg-yellow-500' };
          const count = audience === 'All'
            ? announcements.length
            : announcements.filter(a => a.audience === audience).length;
          return (
            <Card key={audience} className="flex items-center">
              <div className={`p-3 rounded-full ${colors[audience]} mr-4`}>{icons[audience]}</div>
              <div>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{audience}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{count}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Compose form */}
      {showCompose && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Compose Announcement</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Announcement title..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Audience</label>
              <select
                value={form.audience}
                onChange={e => setForm(f => ({ ...f, audience: e.target.value as Announcement['audience'] }))}
                className="w-full sm:w-48 py-2 px-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All</option>
                <option value="Students">Students</option>
                <option value="Teachers">Teachers</option>
                <option value="Parents">Parents</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Write your announcement here..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowCompose(false)}>Cancel</Button>
              <Button onClick={handleSend} disabled={!form.title.trim() || !form.message.trim() || sending}>
                {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                Send
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Announcements list */}
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Announcements</h2>
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Students', 'Teachers', 'Parents'] as const).map(a => (
              <button
                key={a}
                onClick={() => setAudienceFilter(a)}
                className={`px-3 py-1 text-sm rounded-full font-medium transition-colors ${
                  audienceFilter === a
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12 text-gray-500 dark:text-dark-text-secondary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading announcements…
          </div>
        )}
        {error && (
          <div className="text-center py-8 text-red-500">
            Failed to load announcements: {error}
          </div>
        )}
        {!loading && !error && (
          <div className="space-y-4">
            {filtered.length === 0 && (
              <p className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">No announcements found.</p>
            )}
            {filtered.map(announcement => (
              <div
                key={announcement.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{announcement.title}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <AudienceBadge audience={announcement.audience} />
                    <span className="text-xs text-gray-400 dark:text-dark-text-secondary">{announcement.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-dark-text">{announcement.message}</p>
                <p className="text-xs text-gray-400 dark:text-dark-text-secondary mt-2">— {announcement.author}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CommunicationPage;

