-- RESET
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS professionals;
DROP TABLE IF EXISTS businesses;
DROP TABLE IF EXISTS users;

-- USERS
CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role VARCHAR(20) NOT NULL
);

-- BUSINESSES
CREATE TABLE businesses (

    id SERIAL PRIMARY KEY,

    user_id INT REFERENCES users(id),

    name VARCHAR(100) NOT NULL,

    category VARCHAR(100),

    city VARCHAR(100),

    description TEXT
);

-- PROFESSIONALS
CREATE TABLE professionals (

    id SERIAL PRIMARY KEY,

    business_id INT REFERENCES businesses(id),

    name VARCHAR(100) NOT NULL,

    specialty VARCHAR(100),

    phone VARCHAR(50),

    image TEXT
);

-- RESERVATIONS
CREATE TABLE reservations (

    id SERIAL PRIMARY KEY,

    user_id INT REFERENCES users(id),

    business_id INT REFERENCES businesses(id),

    professional_id INT REFERENCES professionals(id),

    service VARCHAR(100),

    reservation_date DATE,

    reservation_time TIME,

    status VARCHAR(30),

    payment_status VARCHAR(30)
);