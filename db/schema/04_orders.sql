-- Drop and recreate Orders table

DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_price INTEGER NOT NULL DEFAULT 0,
  est_prep_time SMALLINT NOT NULL DEFAULT 0,
  actual_prep_time SMALLINT NOT NULL DEFAULT 0,
  status VARCHAR(10) DEFAULT 'open'
);
