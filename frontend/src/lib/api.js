const API_ROOT = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';
const API_BASE = API_ROOT ? `${API_ROOT}/api` : '/api';

async function safeFetch(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchVehicles(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
  return safeFetch(`${API_BASE}/vehicles?${params}`);
}

export async function fetchVehicle(id) {
  return safeFetch(`${API_BASE}/vehicles/${id}`);
}

export async function fetchMakes() {
  return safeFetch(`${API_BASE}/vehicles/makes`);
}

export async function calculateEmissions(data) {
  return safeFetch(`${API_BASE}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function compareVehicles(data) {
  return safeFetch(`${API_BASE}/calculate/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function getRecommendations(data) {
  return safeFetch(`${API_BASE}/calculate/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function getBreakevenTimeline(data) {
  return safeFetch(`${API_BASE}/calculate/breakeven-timeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function fetchGridIntensity() {
  return safeFetch(`${API_BASE}/grid-intensity`);
}

export async function fetchFuelPrices(state) {
  const params = state ? `?state=${encodeURIComponent(state)}` : '';
  return safeFetch(`${API_BASE}/fuel-prices${params}`);
}

export function formatCO2(kg) {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)}t`;
  return `${Math.round(kg)} kg`;
}

export function formatNumber(n) {
  return n?.toLocaleString('en-IN') || '0';
}

export function getFuelColor(type) {
  const colors = {
    PETROL: '#ef4444',
    DIESEL: '#f97316',
    CNG: '#22c55e',
    ELECTRIC: '#3b82f6',
    HYBRID: '#a855f7'
  };
  return colors[type] || '#94a3b8';
}

export function getFuelLabel(type) {
  const labels = {
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
    CNG: 'CNG',
    ELECTRIC: 'Electric',
    HYBRID: 'Hybrid'
  };
  return labels[type] || type;
}
