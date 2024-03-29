-- Aşağıdaki sorgu senaryolarını dvdrental örnek veri tabanı üzerinden gerçekleştiriniz.

-- 1. film tablosunda bulunan title ve description sütunlarındaki verileri sıralayınız.
SELECT title, description FROM film;

-- 2. film tablosunda bulunan tüm sütunlardaki verileri film uzunluğu (length) 60 dan büyük veya eşit olanlarından küçük olana kadar sıralayınız.
SELECT * FROM film WHERE length >= 60;

-- 3. film tablosunda bulunan tüm sütunlardaki verileri rental_rate 0.99 VE replacement_cost 12.99 VEYA 28.99 olma koşullarıyla sıralayınız.
SELECT * FROM film WHERE rental_rate = 0.99 AND (replacement_cost = 12.99 OR replacement_cost = 28.99);

-- 4. customer tablosunda bulunan first_name sütunundaki değeri 'Mary' olan müşterinin last_name sütunundaki değerini sıralayınız.
SELECT last_name FROM customer WHERE first_name = 'Mary';


-- 5. film tablosundaki uzunluğu(length) 50 den büyük olmayıp aynı zamanda rental_rate değeri 2.99 veya 4.99 olmayan verileri sıralayınız.
SELECT * FROM film WHERE length <= 50 AND NOT (rental_rate = 2.99 OR rental_rate = 4.99);


-- PostgreSQL Installation Steps
--https://www.postgresql.org/download/

-- Sample Database [dvdrental]
-- https://www.postgresqltutorial.com/wp-content/uploads/2019/05/dvdrental.zip