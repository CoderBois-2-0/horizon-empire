-- Seed data for Horizon Empire (minimal but covers all relations)
-- Assumes tables already created from postgres_schema.sql

INSERT INTO users (id, username, password) VALUES
  ('user-1', 'alice', 'password1'),
  ('user-2', 'bob', 'password2');

INSERT INTO maps (id, map_size, type) VALUES
  ('map-1', 'small', 'forrest'),
  ('map-2', 'medium', 'desert');

INSERT INTO cities (id, name, user_id, map_id) VALUES
  ('city-1', 'Alpha', 'user-1', 'map-1'),
  ('city-2', 'Beta', 'user-2', 'map-2');

INSERT INTO regions (id, name, is_unlocked, map_id) VALUES
  ('region-1', 'Alpha-North', TRUE, 'map-1'),
  ('region-2', 'Alpha-South', FALSE, 'map-1'),
  ('region-3', 'Beta-North', TRUE, 'map-2');

INSERT INTO tile_types (id, name) VALUES
  ('tiletype-grass', 'grass'),
  ('tiletype-rock', 'rock'),
  ('tiletype-water', 'water');

INSERT INTO tiles (id, tile_type_id, region_id) VALUES
  ('tile-1', 'tiletype-grass', 'region-1'),
  ('tile-2', 'tiletype-rock', 'region-1'),
  ('tile-3', 'tiletype-water', 'region-2'),
  ('tile-4', 'tiletype-grass', 'region-3');

INSERT INTO buildings (id, name, type, tiles_used, max_entities) VALUES
  ('building-1', 'House', 'housing', 1, 4),
  ('building-2', 'Factory', 'work', 2, 10);

INSERT INTO resources (id, name) VALUES
  ('res-wood', 'Wood'),
  ('res-stone', 'Stone'),
  ('res-food', 'Food');

INSERT INTO inventories (id, city_id) VALUES
  ('inv-1', 'city-1'),
  ('inv-2', 'city-2');

INSERT INTO inventory_resources (id, inventory_id, resource_id, quantity) VALUES
  ('invr-1', 'inv-1', 'res-wood', 50),
  ('invr-2', 'inv-1', 'res-stone', 30),
  ('invr-3', 'inv-2', 'res-food', 80);

INSERT INTO building_tile_types (id, buiilding_id, tile_type_id) VALUES
  ('btt-1', 'building-1', 'tiletype-grass'),
  ('btt-2', 'building-2', 'tiletype-rock');

INSERT INTO building_resource_costs (id, building_id, resource_id, amount) VALUES
  ('brc-1', 'building-1', 'res-wood', 20),
  ('brc-2', 'building-2', 'res-stone', 40);

INSERT INTO region_resource_costs (id, region_id, resource_id, amount) VALUES
  ('rrc-1', 'region-2', 'res-stone', 15);

INSERT INTO placed_buildings (id, building_id, region_id, city_id) VALUES
  ('pb-1', 'building-1', 'region-1', 'city-1'),
  ('pb-2', 'building-2', 'region-3', 'city-2');

INSERT INTO placed_building_tile_types (id, placed_buiilding_id, tile_type_id, quantity) VALUES
  ('pbt-1', 'pb-1', 'tiletype-grass', 1),
  ('pbt-2', 'pb-2', 'tiletype-rock', 2);

INSERT INTO persons (id, name) VALUES
  ('person-1', 'Eve'),
  ('person-2', 'Mallory');

INSERT INTO jobs (id, name, type, income, placed_building_id, person_id) VALUES
  ('job-1', 'Worker', 'industrial', 100, 'pb-2', 'person-1');

INSERT INTO audit_placed_building (id, user_id, building_id, action_type) VALUES
  ('audit-1', 'user-1', 'pb-1', 'create');
