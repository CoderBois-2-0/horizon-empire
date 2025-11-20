CREATE OR REPLACE PROCEDURE create_city(
  p_map_type map_type, 
  p_map_size map_size, 
  p_user_id VARCHAR(32),
  p_city_name VARCHAR(32)
)
   AS $$
   DECLARE
     v_map_id VARCHAR(36);
     v_region_amount INT;
     v_region_tiles tile_amount[];
     v_region RECORD;
     v_region_tile tile_amount;
BEGIN
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

  -- create tiles, each region should have 10 tiles

  -- create the template for how many tiles of a type there should be
  IF p_map_type = 'forrest' THEN
    v_region_tiles := ARRAY[
      ROW(5, 'grass')::tile_amount, 
      ROW(3, 'water')::tile_amount, 
      ROW(2, 'farmland')::tile_amount
    ];
  ELSIF p_map_type = 'arctic' THEN
    v_region_tiles := ARRAY[
      ROW(6, 'snow')::tile_amount, 
      ROW(3, 'water')::tile_amount, 
      ROW(1, 'rock')::tile_amount
    ];
  ELSIF p_map_type = 'desert' THEN
    v_region_tiles := ARRAY[
      ROW(6, 'sand')::tile_amount, 
      ROW(3, 'rock')::tile_amount, 
      ROW(1, 'water')::tile_amount
    ];
  -- else is bay
  ELSE
    v_region_tiles := ARRAY[
      ROW(6, 'water')::tile_amount, 
      ROW(3, 'sand')::tile_amount, 
      ROW(1, 'rock')::tile_amount
    ];
  END IF;

  -- insert the tiles
  FOR v_region IN SELECT id FROM regions WHERE regions.map_id = v_map_id LOOP
    FOREACH v_region_tile IN ARRAY v_region_tiles LOOP
      INSERT INTO tiles (id, type, region_id) SELECT gen_random_uuid(), v_region_tile.type, v_region.id 
      FROM generate_series(1, v_region_tile.qty);

      -- VALUES (gen_random_uuid(), v_region_tile.type, v_region.id);
    END LOOP;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

