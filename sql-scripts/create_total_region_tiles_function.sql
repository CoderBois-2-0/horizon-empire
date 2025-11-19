CREATE OR REPLACE FUNCTION total_region_tiles(p_region_id varchar(36))
RETURNS integer AS $$
DECLARE 
    v_total_tiles int;
BEGIN
    SELECT COUNT(*) INTO v_total_tiles
    FROM tiles
    WHERE region_id = p_region_id;

    RETURN v_total_tiles;
END;
$$ LANGUAGE plpgsql;









