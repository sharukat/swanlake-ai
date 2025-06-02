CREATE TABLE observers (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    UNIQUE (first_name, last_name)
);

CREATE TABLE birds (
    id INTEGER PRIMARY KEY,
    observer_id INTEGER NOT NULL,
    observed_date TEXT NOT NULL,
    latitude TEXT NOT NULL,
    longitude TEXT NOT NULL,
    image_url TEXT,
    common_name TEXT NOT NULL,
    scientific_name TEXT,
    bird_count INTEGER NOT NULL,
    bird_behavior TEXT,
    observation_note TEXT,
    CONSTRAINT  fk_observers
        FOREIGN KEY (observer_id)
        REFERENCES observers(id)
)

CREATE TABLE trees (
    id INTEGER PRIMARY KEY,
    observer_id INTEGER NOT NULL,
    observed_date TEXT NOT NULL,
    latitude TEXT NOT NULL,
    longitude TEXT NOT NULL,
    image_url TEXT,
    common_name TEXT NOT NULL,
    scientific_name TEXT,
    tree_type TEXT NOT NULL,
    tree_height DECIMAL(5, 2),
    trunk_diameter DECIMAL(5, 2),
    tree_crown_shape TEXT,
    tree_condition TEXT,
    fruits_nuts_presence TEXT,
    tree_bark_characteristics TEXT,
    leaf_needle_note TEXT,
    observation_note TEXT,
    CONSTRAINT  fk_observers
        FOREIGN KEY (observer_id)
        REFERENCES observers(id)
)

CREATE TABLE plants (
    id INTEGER PRIMARY KEY,
    observer_id INTEGER NOT NULL,
    observed_date TEXT NOT NULL,
    latitude TEXT NOT NULL,
    longitude TEXT NOT NULL,
    image_url TEXT,
    common_name TEXT NOT NULL,
    scientific_name TEXT,
    plant_type TEXT NOT NULL,
    plant_stage TEXT NOT NULL,
    plant_condition TEXT NOT NULL,
    plant_height DECIMAL(5, 2),
    flower_color TEXT,
    leaf_shape TEXT,
    observation_note TEXT,
    CONSTRAINT  fk_observers
        FOREIGN KEY (observer_id)
        REFERENCES observers(id)
)

CREATE TABLE waterquality (
    id INTEGER PRIMARY KEY,
    observer_id INTEGER NOT NULL,
    observed_date TEXT NOT NULL,
    latitude TEXT NOT NULL,
    longitude TEXT NOT NULL,
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
    CONSTRAINT  fk_observers
        FOREIGN KEY (observer_id)
        REFERENCES observers(id)
)