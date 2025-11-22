CREATE ROLE app_read WITH LOGIN PASSWORD '<password>';
GRANT readonly TO app_read;

REVOKE SELECT ON TABLE public.audit_placed_building FROM app_read;

CREATE ROLE app_write WITH LOGIN PASSWORD '<password>';
GRANT readwrite TO app_write;

REVOKE SELECT ON TABLE public.audit_placed_building FROM app_write;
