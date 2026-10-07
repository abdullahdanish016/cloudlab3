// Netlify Function: GET /api/vehicles
// Reads from the Netlify Database when it is connected.
// If no database is connected yet, it serves built-in sample data so the site always works.

const SAMPLE = [
  { id: 1, name: "Toyota Corolla Altis", type: "Car", year: 2024, price_pkr: 7200000, stock: 8 },
  { id: 2, name: "Honda Civic RS", type: "Car", year: 2024, price_pkr: 9800000, stock: 5 },
  { id: 3, name: "Suzuki Cultus", type: "Car", year: 2023, price_pkr: 3600000, stock: 7 },
  { id: 4, name: "Honda CG 125", type: "Bike", year: 2025, price_pkr: 285000, stock: 18 },
  { id: 5, name: "Yamaha YBR 125G", type: "Bike", year: 2025, price_pkr: 410000, stock: 12 },
  { id: 6, name: "Hino 500 Series", type: "Truck", year: 2023, price_pkr: 14500000, stock: 22 },
  { id: 7, name: "Isuzu NPR", type: "Truck", year: 2024, price_pkr: 9900000, stock: 18 },
];

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export default async () => {
  try {
    const { neon } = await import("@netlify/neon");
    const sql = neon();

    await sql`CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      year INTEGER NOT NULL,
      price_pkr BIGINT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0
    )`;

    let rows = await sql`SELECT id, name, type, year, price_pkr::float8 AS price_pkr, stock FROM vehicles ORDER BY type, name`;

    if (rows.length === 0) {
      for (const v of SAMPLE) {
        await sql`INSERT INTO vehicles (name, type, year, price_pkr, stock)
                  VALUES (${v.name}, ${v.type}, ${v.year}, ${v.price_pkr}, ${v.stock})`;
      }
      rows = await sql`SELECT id, name, type, year, price_pkr::float8 AS price_pkr, stock FROM vehicles ORDER BY type, name`;
    }

    return json({ source: "database", vehicles: rows });
  } catch (err) {
    return json({ source: "sample", vehicles: SAMPLE });
  }
};

export const config = { path: "/api/vehicles" };
