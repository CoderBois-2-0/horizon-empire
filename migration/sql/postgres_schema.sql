-- Create enums expected by the Drizzle schema
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'map_type') THEN
    CREATE TYPE map_type AS ENUM ('forrest', 'arctic', 'desert', 'bay');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'map_size') THEN
    CREATE TYPE map_size AS ENUM ('small', 'medium', 'large');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'building_type') THEN
    CREATE TYPE building_type AS ENUM ('housing', 'work', 'service', 'educational');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_type') THEN
    CREATE TYPE job_type AS ENUM ('office', 'firefighter', 'medical', 'enforcement', 'teacher', 'service', 'industrial');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'placed_building_action_type') THEN
    CREATE TYPE placed_building_action_type AS ENUM ('create', 'remove');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  CONSTRAINT users_username_unique UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS maps (
  id TEXT PRIMARY KEY,
  type map_type NOT NULL,
  map_size map_size NOT NULL
);

CREATE TABLE IF NOT EXISTS cities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  map_id TEXT NOT NULL REFERENCES maps(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS regions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  map_id TEXT NOT NULL REFERENCES maps(id) ON DELETE CASCADE,
  is_unlocked BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS tile_types (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tiles (
  id TEXT PRIMARY KEY,
  tile_type_id TEXT NOT NULL REFERENCES tile_types(id) ON DELETE CASCADE,
  region_id TEXT NOT NULL REFERENCES regions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS buildings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type building_type NOT NULL,
  tiles_used INTEGER NOT NULL,
  max_entities INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inventories (
  id TEXT PRIMARY KEY,
  city_id TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory_resources (
  id TEXT PRIMARY KEY,
  resource_id TEXT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  inventory_id TEXT NOT NULL REFERENCES inventories(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS building_tile_types (
  id TEXT PRIMARY KEY,
  buiilding_id TEXT NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  tile_type_id TEXT NOT NULL REFERENCES tile_types(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS building_resource_costs (
  id TEXT PRIMARY KEY,
  building_id TEXT NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  resource_id TEXT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS region_resource_costs (
  id TEXT PRIMARY KEY,
  region_id TEXT NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  resource_id TEXT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS placed_buildings (
  id TEXT PRIMARY KEY,
  building_id TEXT NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  city_id TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  region_id TEXT NOT NULL REFERENCES regions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS placed_building_tile_types (
  id TEXT PRIMARY KEY,
  placed_buiilding_id TEXT NOT NULL REFERENCES placed_buildings(id) ON DELETE CASCADE,
  tile_type_id TEXT NOT NULL REFERENCES tile_types(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS persons (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type job_type NOT NULL,
  income REAL NOT NULL,
  person_id TEXT REFERENCES persons(id),
  placed_building_id TEXT NOT NULL REFERENCES placed_buildings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_placed_building (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  building_id TEXT NOT NULL REFERENCES placed_buildings(id),
  action_type placed_building_action_type,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);
