
-- 1. test veritabanınızda employee isimli sütun bilgileri id(INTEGER), name VARCHAR(50), birthday DATE, email VARCHAR(100) olan bir tablo oluşturalım.
CREATE TABLE employee (
    id INTEGER,
    name VARCHAR(50),
    birthday DATE,
    email VARCHAR(100)
);

-- 2. Oluşturduğumuz employee tablosuna 'Mockaroo' servisini kullanarak 50 adet veri ekleyelim.
INSERT INTO employee (id, name, birthday, email) VALUES (1, 'Goddart', '2021-02-26', 'gconan0@constantcontact.com');
INSERT INTO employee (id, name, birthday, email) VALUES (2, 'Clevey', '2006-07-26', 'cfulleylove1@reddit.com');
INSERT INTO employee (id, name, birthday, email) VALUES (3, 'Nelli', '1990-09-07', 'nallman2@sitemeter.com');
INSERT INTO employee (id, name, birthday, email) VALUES (4, 'Reilly', '2000-11-05', 'rbagg3@tripadvisor.com');
INSERT INTO employee (id, name, birthday, email) VALUES (5, 'Jacobo', '2005-02-16', 'jkidner4@hibu.com');
INSERT INTO employee (id, name, birthday, email) VALUES (6, 'Mellicent', '2012-03-07', 'mpooly5@pcworld.com');
INSERT INTO employee (id, name, birthday, email) VALUES (7, 'Jesus', '2004-02-14', 'jbennington6@stanford.edu');
INSERT INTO employee (id, name, birthday, email) VALUES (8, 'Marita', '2021-12-26', 'mmcgrann7@samsung.com');
INSERT INTO employee (id, name, birthday, email) VALUES (9, 'Eugenie', '2021-07-16', 'emcdonogh8@ed.gov');
INSERT INTO employee (id, name, birthday, email) VALUES (10, 'Alanah', '2011-05-31', 'ajeannaud9@pinterest.com');

-- 3. Sütunların her birine göre diğer sütunları güncelleyecek 5 adet UPDATE işlemi yapalım.
UPDATE employee SET name = 'Godart', birthday = '2021-02-26', email = 'gconan99@contact.com' WHERE id = 1 RETURNING*;
UPDATE employee SET email = 'bkubickak@jimdo.com' WHERE id = 2 RETURNING*;
UPDATE employee SET birthday = '1975-03-10' WHERE name = 'Nelli' RETURNING*;
UPDATE employee SET name = 'Spagetti' WHERE name LIKE 'R%' RETURNING*;
UPDATE employee SET email = 'jacobo@hibu.com' WHERE birthday = '2005-02-16' RETURNING*;

-- 4. Sütunların her birine göre ilgili satırı silecek 5 adet DELETE işlemi yapalım.
DELETE FROM employee WHERE name = 'Mellicent' RETURNING*;
DELETE FROM employee WHERE id = 7 RETURNING*;
DELETE FROM employee WHERE email = 'jbennington6@stanford.edu' RETURNING*;
DELETE FROM employee WHERE name = 'Eugenie' RETURNING*;
DELETE FROM employee WHERE birthday = '2011-05-31' RETURNING*;