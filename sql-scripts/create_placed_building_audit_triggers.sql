CREATE OR REPLACE FUNCTION insert_audit_for_placed_building()
   RETURNS TRIGGER as $$
   DECLARE
     a_action_type placed_building_action_type;
     v_user_id VARCHAR(36);
BEGIN
   SELECT id into v_user_id from users 
       INNER JOIN cities ON cities.id = NEW.city_id 
       INNER JOIN users ON users.id = cities.user_id;

   INSERT INTO audit_placed_building (id, user_id, building_id, action_type)
       VALUES (gen_random_uuid(), v_user_id, NEW.building_id, a_action_type);

   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER audit_placed_building_insert
    AFTER INSERT ON placed_buildings
    FOR EACH ROW
    EXECUTE FUNCTION insert_audit_for_placed_building("create");

CREATE OR REPLACE TRIGGER audit_placed_building_delete
    AFTER DELETE ON placed_buildings
    FOR EACH ROW
    EXECUTE FUNCTION insert_audit_for_placed_building("remove");







