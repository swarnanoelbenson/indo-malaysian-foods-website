import React, { useState } from 'react';
import useGoogleSheets from '../../hooks/useGoogleSheets';
import useContentStore, { ContentType } from '../../store/contentStore';

// ─── Types ────────────────────────────────────────────────────────────────────

const CONTENT_TYPES: ContentType[] = [
  'workshops',
  'recipes',
  'videos',
  'about',
  'committees',
  'universities',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContentPanel({ type }: { type: ContentType }) {
  const { data, loading, error, refetch } = useGoogleSheets(type);
  const lastSyncTime = useContentStore((s) => s.lastSyncTime[type]);

  const syncAgo = lastSyncTime
    ? Math.round((Date.now() - lastSyncTime) / 1000)
    : null;

  return (
    <section style={styles.panel}>
      <div style={styles.panelHeader}>
        <h2 style={styles.panelTitle}>{type}</h2>
        <div style={styles.badges}>
          {loading && <span style={{ ...styles.badge, ...styles.badgeBlue }}>Loading…</span>}
          {!loading && data && (
            <span style={{ ...styles.badge, ...styles.badgeGreen }}>
              {data.length} record{data.length !== 1 ? 's' : ''}
            </span>
          )}
          {!loading && !data && !error && (
            <span style={{ ...styles.badge, ...styles.badgeGray }}>No data</span>
          )}
          {error && <span style={{ ...styles.badge, ...styles.badgeRed }}>Error</span>}
          {syncAgo !== null && (
            <span style={{ ...styles.badge, ...styles.badgeGray }}>
              synced {syncAgo}s ago
            </span>
          )}
        </div>
        <button style={styles.button} onClick={refetch}>
          Refetch
        </button>
      </div>

      {error && (
        <p style={styles.error}>
          <strong>Error:</strong> {error}
        </p>
      )}

      {data && data.length > 0 && (
        <>
          <p style={styles.hint}>First record (expand to inspect full structure):</p>
          <pre style={styles.pre}>{JSON.stringify(data[0], null, 2)}</pre>
        </>
      )}

      {data && data.length === 0 && !loading && (
        <p style={styles.hint}>Sheet returned 0 rows — check the tab name and range in .env.local.</p>
      )}
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function TestGoogleSheets() {
  const { syncAll, clearCache, loading: globalLoading, error: globalError, lastSyncTime } =
    useContentStore();

  const [activeTab, setActiveTab] = useState<ContentType>('workshops');

  const envCheck = {
    'REACT_APP_GOOGLE_SHEETS_API_KEY': !!process.env.REACT_APP_GOOGLE_SHEETS_API_KEY,
    'REACT_APP_GOOGLE_SHEETS_ID': !!process.env.REACT_APP_GOOGLE_SHEETS_ID,
    'REACT_APP_WORKSHEETS_RANGE': !!process.env.REACT_APP_WORKSHEETS_RANGE,
    'REACT_APP_RECIPES_RANGE': !!process.env.REACT_APP_RECIPES_RANGE,
    'REACT_APP_VIDEOS_RANGE': !!process.env.REACT_APP_VIDEOS_RANGE,
    'REACT_APP_ABOUT_RANGE': !!process.env.REACT_APP_ABOUT_RANGE,
    'REACT_APP_COMMITTEE_RANGE': !!process.env.REACT_APP_COMMITTEE_RANGE,
    'REACT_APP_UNIVERSITIES_RANGE': !!process.env.REACT_APP_UNIVERSITIES_RANGE,
  };

  const allEnvOk = Object.values(envCheck).every(Boolean);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Google Sheets Integration — Test Page</h1>
      <p style={styles.subtitle}>
        Open DevTools → Network and Console to monitor API calls and parsed data.
      </p>

      {/* ── Environment variable check ─────────────────────────────────── */}
      <section style={styles.panel}>
        <h2 style={styles.panelTitle}>
          Environment Variables{' '}
          {allEnvOk ? (
            <span style={{ ...styles.badge, ...styles.badgeGreen }}>All OK</span>
          ) : (
            <span style={{ ...styles.badge, ...styles.badgeRed }}>Missing values</span>
          )}
        </h2>
        <table style={styles.table}>
          <tbody>
            {Object.entries(envCheck).map(([key, present]) => (
              <tr key={key}>
                <td style={styles.td}>
                  <code>{key}</code>
                </td>
                <td style={styles.td}>
                  {present ? (
                    <span style={{ color: '#16a34a' }}>✓ present</span>
                  ) : (
                    <span style={{ color: '#dc2626' }}>✗ missing — check .env.local</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── Global actions ─────────────────────────────────────────────── */}
      <section style={styles.panel}>
        <h2 style={styles.panelTitle}>Global Actions</h2>
        <div style={styles.row}>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={syncAll}
            disabled={globalLoading}
          >
            {globalLoading ? 'Syncing…' : 'Sync All'}
          </button>
          <button style={styles.button} onClick={clearCache}>
            Clear Cache
          </button>
        </div>
        {globalError && (
          <p style={styles.error}>
            <strong>Sync errors:</strong> {globalError}
          </p>
        )}
        <p style={styles.hint}>
          Cache TTL: 5 minutes. After clearing, the next hook render will re-fetch from the API.
        </p>
        <details style={{ marginTop: 8 }}>
          <summary style={styles.hint}>Last sync timestamps</summary>
          <pre style={styles.pre}>{JSON.stringify(lastSyncTime, null, 2)}</pre>
        </details>
      </section>

      {/* ── Per-type panels ─────────────────────────────────────────────── */}
      <div style={styles.tabs}>
        {CONTENT_TYPES.map((t) => (
          <button
            key={t}
            style={{
              ...styles.tab,
              ...(activeTab === t ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <ContentPanel key={activeTab} type={activeTab} />

      {/* ── Debugging checklist ─────────────────────────────────────────── */}
      <section style={styles.panel}>
        <h2 style={styles.panelTitle}>Debugging Checklist</h2>
        <ul style={styles.list}>
          {[
            'API key in .env.local is correct',
            'Sheet ID in .env.local is correct',
            'Range names in .env.local match your Sheet tab names exactly (case-sensitive)',
            'Headers in Google Sheets match interface property names exactly',
            'No empty rows in the middle of data',
            'Network tab → request to sheets.googleapis.com returns 200',
            'imageUrls values are pipe-separated (url1|url2)',
            'ingredients values are semicolon-separated (item1;item2)',
            'Zustand store updates after a successful fetch (check React DevTools)',
            'Refetching within 5 min uses cache (no new network request)',
          ].map((item) => (
            <li key={item} style={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TestGoogleSheets;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 860,
    margin: '0 auto',
    padding: '32px 16px',
    fontFamily: 'system-ui, sans-serif',
    color: '#111',
  },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 4 },
  subtitle: { color: '#555', marginBottom: 24 },
  panel: {
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    background: '#fff',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  panelTitle: { fontSize: 16, fontWeight: 600, margin: 0 },
  badges: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  badge: {
    fontSize: 12,
    padding: '2px 8px',
    borderRadius: 999,
    fontWeight: 500,
  },
  badgeGreen: { background: '#dcfce7', color: '#15803d' },
  badgeBlue: { background: '#dbeafe', color: '#1d4ed8' },
  badgeRed: { background: '#fee2e2', color: '#b91c1c' },
  badgeGray: { background: '#f3f4f6', color: '#374151' },
  button: {
    padding: '6px 14px',
    borderRadius: 6,
    border: '1px solid #d1d5db',
    background: '#f9fafb',
    cursor: 'pointer',
    fontSize: 13,
    marginLeft: 'auto',
  },
  buttonPrimary: {
    background: '#2563eb',
    color: '#fff',
    border: '1px solid #1d4ed8',
  },
  row: { display: 'flex', gap: 10, alignItems: 'center' },
  error: { color: '#b91c1c', background: '#fee2e2', padding: '8px 12px', borderRadius: 6, margin: '8px 0' },
  hint: { color: '#6b7280', fontSize: 13, margin: '4px 0' },
  pre: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: 12,
    fontSize: 12,
    overflowX: 'auto',
    maxHeight: 360,
    overflowY: 'auto',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  td: { padding: '5px 10px', borderBottom: '1px solid #f3f4f6' },
  tabs: { display: 'flex', gap: 4, marginBottom: 0, flexWrap: 'wrap' },
  tab: {
    padding: '8px 16px',
    border: '1px solid #e5e7eb',
    borderBottom: 'none',
    borderRadius: '6px 6px 0 0',
    background: '#f9fafb',
    cursor: 'pointer',
    fontSize: 13,
  },
  tabActive: { background: '#fff', fontWeight: 600, borderColor: '#e5e7eb' },
  list: { paddingLeft: 20, margin: 0 },
  listItem: { marginBottom: 6, fontSize: 14 },
};
