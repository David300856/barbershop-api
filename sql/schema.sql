CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE businesses(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_businesses(
    user_id INT,
    businesses_id INT,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, businesses_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (businesses_id) REFERENCES businesses(id) ON DELETE CASCADE
);

CREATE TABLE clients(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    businesses_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (businesses_id) REFERENCES businesses(id) 
);

CREATE TABLE services(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    prince DECIMAL(2,3) NOT NULL,
    duration_minutes INT NOT NULL,
    businesses_id INT,
    FOREIGN KEY (businesses_id) REFERENCES businesses(id)
);

CREATE TABLE appointments(
    id SERIAL PRIMARY KEY,
    clients_id INT,
    employees_id INT,
    services_id INT,
    appointments_time TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clients_id) REFERENCES clients(id),
    FOREIGN KEY (employees_id) REFERENCES users(id),
    FOREIGN KEY (services_id) REFERENCES services(id)
);

CREATE TABLE appointments_history(
    id SERIAL PRIMARY KEY,
    appointments_history INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointments_history) REFERENCES appointments(id)
);

CREATE TABLE payments(
    id SERIAL PRIMARY KEY,
    appointments_id INT,
    amount DECIMAL(2,3),
    payments_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointments_id) REFERENCES appointments(id)
);

CREATE TABLE employee_bonus (
    id SERIAL PRIMARY KEY,
    employees_id INT,
    amount DECIMAL(10,2),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employees_id) REFERENCES users(id)
);
