CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    tamname VARCHAR(255) NOT NULL,
    tamposhl DOUBLE PRECISION
);

CREATE TABLE savesoperations(
    id SERIAL PRIMARY KEY,
    typeTam VARCHAR(255) NOT NULL,
    tamposhl DOUBLE PRECISION NOT NULL,
    ss DOUBLE PRECISION NOT NULL,
    transprashdogra DOUBLE PRECISION NOT NULL,
    transprashposlegra DOUBLE PRECISION NOT NULL,
    weightprod DOUBLE PRECISION NOT NULL,
    itogss DOUBLE PRECISION NOT NULL,
    itogssperweight DOUBLE PRECISION NOT NULL
);

INSERT INTO products (tamname, tamposhl) VALUES
    ('I. Живые животные; продукты животного происхождения', 5.00),
    ('II. Продукты растительного происхождения', 5.00),
    ('III. Жиры и масла животного или растительного происхождения и продукты их расщепления', 5.00),
    ('IV. Готовые пищевые продукты; алкогольные и безалкогольные напитки', 5.50),
    ('V. Минеральные продукты', 5.00),
    ('VI. Продукция химической и связанных с ней отраслей промышленности', 5.50),
    ('VII. Пластмассы и изделия из них; каучук, резина и изделия из них', 0.00),
    ('VIII. Необработанные шкуры, выделанная кожа, натуральный мех и изделия из них', 0.00),
    ('IX. Древесина и изделия из нее; древесный уголь', 10.00),
    ('X. Масса из древесины или из других волокнистых целлюлозных материалов', 7.50),
    ('XI. Текстильные материалы и текстильные изделия', 5.00),
    ('XII. Обувь, головные уборы, зонты, солнцезащитные зонты', 3.00),
    ('XIII. Изделия из камня, гипса, цемента', 10.00),
    ('XIV. Жемчуг природный или культивированный, драгоценные или полудрагоценные камни', 10.00),
    ('XV. Недрагоценные металлы и изделия из них', 5.00),
    ('XVI. Машины, оборудование и механизмы; электротехническое оборудование', 5.00),
    ('XVII. Средства наземного транспорта, летательные аппараты', 15.00),
    ('XVIII. Инструменты и аппараты оптические', 7.50),
    ('XIX. Оружие и боеприпасы; их части и принадлежности', 15.00),
    ('XX. Разные промышленные товары', 0.00),
    ('XXI. Произведения искусства, предметы коллекционирования и антиквариат', 0.00);

CREATE OR REPLACE FUNCTION calculate_itogssperweight()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.weightprod <> 0 THEN
        NEW.itogssperweight := NEW.itogss / NEW.weightprod;
    ELSE
        NEW.itogssperweight := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER update_itogssperweight
BEFORE INSERT OR UPDATE ON savesoperations
FOR EACH ROW
EXECUTE FUNCTION calculate_itogssperweight();

CREATE OR REPLACE FUNCTION check_duplicate()
RETURNS TRIGGER AS $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM savesoperations
    WHERE typeTam = NEW.typeTam
    AND tamposhl = NEW.tamposhl
    AND ss = NEW.ss
    AND transprashdogra = NEW.transprashdogra
    AND transprashposlegra = NEW.transprashposlegra
    AND weightprod = NEW.weightprod
    AND itogss = NEW.itogss
    AND itogssperweight = NEW.itogssperweight
    AND id <> NEW.id;
    IF duplicate_count > 0 THEN
        RAISE NOTICE 'Duplicate record found';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER prevent_duplicate
BEFORE INSERT OR UPDATE ON savesoperations
FOR EACH ROW
EXECUTE FUNCTION check_duplicate();

CREATE VIEW products_view AS
SELECT id, tamname, tamposhl
FROM products;