CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    price NUMERIC(12, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES
    ('Product A', 10.99),
    ('Product B', 25.50),
    ('Product C', 14.75),
    ('Product D', 5.30),
    ('Product E', 22.10),
    ('Product F', 11.45),
    ('Product G', 19.99),
    ('Product H', 7.99),
    ('Product I', 30.00),
    ('Product J', 17.60);