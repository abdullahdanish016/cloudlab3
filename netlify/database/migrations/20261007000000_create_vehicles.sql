CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Car', 'Bike', 'Truck')),
  year INTEGER NOT NULL,
  price_pkr BIGINT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
);

INSERT INTO vehicles (name, type, year, price_pkr, stock)
SELECT * FROM (VALUES
  ('Toyota Corolla Altis', 'Car', 2024, 7200000, 8),
  ('Honda Civic RS', 'Car', 2024, 9800000, 5),
  ('Suzuki Cultus', 'Car', 2023, 3600000, 7),
  ('Honda CG 125', 'Bike', 2025, 285000, 18),
  ('Yamaha YBR 125G', 'Bike', 2025, 410000, 12),
  ('Hino 500 Series', 'Truck', 2023, 14500000, 22),
  ('Isuzu NPR', 'Truck', 2024, 9900000, 18)
) AS seed(name, type, year, price_pkr, stock)
WHERE NOT EXISTS (SELECT 1 FROM vehicles);
