// Client-side booking store backed by localStorage.
// Merges the static mock list (lib/bookings.js) with the demo bookings
// created on the site, so the admin dashboard stays in sync in any tab.

import { bookings } from "@/lib/bookings";

const STORAGE_KEY = "ce_bookings";

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

function nextId(list) {
  let max = 3000;
  for (const b of list) {
    const n = parseInt(String(b.id).replace(/^BC-/, ""), 10);
    if (!Number.isNaN(n) && n > max) max = n;
  }
  return `BC-${max + 1}`;
}

export function getStoredBookings() {
  return read();
}

export function addBooking(booking) {
  const list = read();
  const next = { ...booking, id: nextId(list), type: booking.type || "stay" };
  write([...list, next]);
  window.dispatchEvent(new Event("ce-bookings-changed"));
  return next;
}

export function updateStoredBooking(id, patch) {
  const list = read();
  const next = list.map((b) => (b.id === id ? { ...b, ...patch } : b));
  write(next);
  window.dispatchEvent(new Event("ce-bookings-changed"));
}

export function getAllBookings() {
  const mocks = bookings.map((b) => ({ ...b, type: b.type || "stay" }));
  return [...mocks, ...read()];
}
