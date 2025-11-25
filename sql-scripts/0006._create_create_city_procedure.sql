CREATE OR REPLACE FUNCTION find_tile_type_id_by_name(p_tile_type_name VARCHAR(10))
RETURNS VARCHAR(36)
AS $$
DECLARE
    v_id VARCHAR(36);
  BEGIN
    SELECT id INTO v_id
    FROM tile_types
    WHERE "name" = p_tile_type_name;

    RETURN v_id;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE create_city(
  p_map_type map_type, 
  p_map_size map_size, 
  p_user_id VARCHAR(36),
  p_city_name VARCHAR(32)
)
AS $$
DECLARE
 v_map_id VARCHAR(36);
 v_region_amount INT;
 v_region RECORD;
 v_region_tile RECORD;
 v_total_tiles_in_region CONSTANT INT = 40;
BEGIN
  CREATE TEMP TABLE temp_tile_type_amount (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,  
    tile_type_id VARCHAR(36)
    -- cant create foriegnkey constrait on non temp table in a temp table
  );
  
  -- create map
  INSERT INTO maps (id, "type", map_size) 
    VALUES (gen_random_uuid(), p_map_type, p_map_size)
    RETURNING id into v_map_id;

  -- create city
  INSERT INTO cities (id, name, user_id, map_id) VALUES (gen_random_uuid(), p_city_name, p_user_id, v_map_id);

  -- create regions
  IF p_map_size = 'small' THEN
    v_region_amount := 10;
  ELSIF p_map_size = 'medium' THEN
    v_region_amount := 20;
  -- else is large
  ELSE
    v_region_amount := 30;
  END IF;

  FOR i IN 1..v_region_amount LOOP
    INSERT INTO regions (id, name, map_id, is_unlocked) VALUES (gen_random_uuid(), 'Region ' || i, v_map_id, FALSE);
  END LOOP;

  -- create tiles, each region should have 42 tiles

  -- create the template for how many tiles of a type there should be
  IF p_map_type = 'forrest' THEN
    INSERT INTO temp_tile_type_amount (quantity, tile_type_id) VALUES 
      ((v_total_tiles_in_region * 0.5)::int, find_tile_type_id_by_name('grass')),
      ((v_total_tiles_in_region * 0.3)::int, find_tile_type_id_by_name('water')),
      ((v_total_tiles_in_region * 0.2)::int, find_tile_type_id_by_name('farmland'));
  ELSIF p_map_type = 'arctic' THEN
    INSERT INTO temp_tile_type_amount (quantity, tile_type_id) VALUES 
      ((v_total_tiles_in_region * 0.6)::int, find_tile_type_id_by_name('snow')),
      ((v_total_tiles_in_region * 0.3)::int, find_tile_type_id_by_name('water')),
      ((v_total_tiles_in_region * 0.1)::int, find_tile_type_id_by_name('rock'));
  ELSIF p_map_type = 'desert' THEN
    INSERT INTO temp_tile_type_amount (quantity, tile_type_id) VALUES 
      ((v_total_tiles_in_region * 0.6)::int, find_tile_type_id_by_name('sand')),
      ((v_total_tiles_in_region * 0.3)::int, find_tile_type_id_by_name('rock')),
      ((v_total_tiles_in_region * 0.1)::int, find_tile_type_id_by_name('water'));
  -- else is bay
  ELSE
    INSERT INTO temp_tile_type_amount (quantity, tile_type_id) VALUES
      ((v_total_tiles_in_region * 0.6)::int, find_tile_type_id_by_name('water')),
      ((v_total_tiles_in_region * 0.3)::int, find_tile_type_id_by_name('sand')),
      ((v_total_tiles_in_region * 0.1)::int, find_tile_type_id_by_name('rock'));
  END IF;

  -- insert the tiles
  FOR v_region IN SELECT id FROM regions WHERE regions.map_id = v_map_id LOOP
    FOR v_region_tile IN SELECT quantity, tile_type_id FROM temp_tile_type_amount LOOP
      INSERT INTO tiles (id, tile_type_id, region_id) SELECT gen_random_uuid(), v_region_tile.tile_type_id, v_region.id 
      -- generate_series will insert 1 to x amount based on the selected quantity
      FROM generate_series(1, v_region_tile.quantity);

      -- VALUES (gen_random_uuid(), v_region_tile.type, v_region.id);
    END LOOP;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

