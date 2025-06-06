CREATE TABLE observers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_observers_name UNIQUE (first_name, last_name)
);
CREATE INDEX idx_observers_name_reverse ON observers(last_name, first_name);

CREATE TABLE birds (
    id SERIAL PRIMARY KEY,
    observer_id INTEGER NOT NULL,
    observed_date DATE NOT NULL,
    latitude DECIMAL(8,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    image_url TEXT,
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    bird_count INTEGER NOT NULL,
    bird_behavior TEXT,
    observation_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT  fk_birds_observer
        FOREIGN KEY (observer_id)
        REFERENCES observers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE trees (
    id SERIAL PRIMARY KEY,
    observer_id INTEGER NOT NULL,
    observed_date DATE NOT NULL,
    latitude DECIMAL(8,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    image_url TEXT,
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    tree_type TEXT NOT NULL,
    tree_height DECIMAL(5, 2),
    trunk_diameter DECIMAL(5, 2),
    tree_crown_shape TEXT,
    tree_condition TEXT,
    fruits_nuts_presence TEXT,
    tree_bark_characteristics TEXT,
    leaf_needle_note TEXT,
    observation_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT  fk_trees_observer
        FOREIGN KEY (observer_id)
        REFERENCES observers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    observer_id INTEGER NOT NULL,
    observed_date DATE NOT NULL,
    latitude DECIMAL(8,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    image_url TEXT,
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    plant_type TEXT NOT NULL,
    plant_stage TEXT NOT NULL,
    plant_condition TEXT NOT NULL,
    plant_height DECIMAL(5, 2),
    flower_color TEXT,
    leaf_shape TEXT,
    observation_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT  fk_plants_observer
        FOREIGN KEY (observer_id)
        REFERENCES observers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE waterquality (
    id SERIAL PRIMARY KEY,
    observer_id INTEGER NOT NULL,
    observed_date DATE NOT NULL,
    latitude DECIMAL(8,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    image_url TEXT,
    water_temperature DECIMAL(5, 2),
    dissolved_oxygen_mgl DECIMAL(5, 2),
    dissolved_oxygen_percent DECIMAL(5, 2),
    ph DECIMAL(5, 2),
    conductivity DECIMAL(5, 2),
    turbidity DECIMAL(5, 2),
    secchi_depth DECIMAL(5, 2),
    salinity DECIMAL(5, 2),
    observation_note TEXT,
    weather_condition TEXT,
    air_temperature DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT  fk_water_quality_observer
        FOREIGN KEY (observer_id)
        REFERENCES observers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);