import { useState } from 'react';

interface AthleteResult {
  title: string;
  url: string;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

export default function Home() {
  const [name, setName] = useState('');
  const [results, setResults] = useState<AthleteResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(
        `${BACKEND_URL}/scraper?name=${encodeURIComponent(name)}`,
      );
      if (!res.ok) throw new Error(`Erro do servidor: ${res.status}`);
      const data: AthleteResult[] = await res.json();
      setResults(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h1>🏊 Busca de Atleta</h1>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Nome do atleta…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          {loading ? 'Buscando…' : 'Buscar'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {results.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((r, i) => (
            <li key={i} style={{ marginBottom: '0.75rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
                {r.title || r.url}
              </a>
              <br />
              <small style={{ color: '#666' }}>{r.url}</small>
            </li>
          ))}
        </ul>
      )}

      {!loading && results.length === 0 && !error && (
        <p style={{ color: '#999' }}>Nenhum resultado ainda. Pesquise um atleta acima.</p>
      )}
    </main>
  );
}
