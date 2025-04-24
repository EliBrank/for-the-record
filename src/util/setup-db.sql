-- SQLite Setup Script for Music Collection Database

-- Drop tables if they exist
DROP TABLE IF EXISTS release_artist;
DROP TABLE IF EXISTS release;
DROP TABLE IF EXISTS cover_art;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS format;

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Create the format table
CREATE TABLE format (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
);

-- Create the artist table
CREATE TABLE artist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Create the cover_art table
CREATE TABLE cover_art (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    is_default INTEGER DEFAULT 0
);

-- Create the release table
CREATE TABLE release (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    release_year INTEGER,
    format_id INTEGER,
    musicbrainz_id TEXT,
    cover_art_id INTEGER,
    FOREIGN KEY (format_id) REFERENCES format(id),
    FOREIGN KEY (cover_art_id) REFERENCES cover_art(id)
);

-- Create the release_artist junction table
CREATE TABLE release_artist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    release_id INTEGER,
    artist_id INTEGER,
    is_primary INTEGER DEFAULT 1,
    FOREIGN KEY (release_id) REFERENCES release(id),
    FOREIGN KEY (artist_id) REFERENCES artist(id),
    UNIQUE (release_id, artist_id)
);

-- Insert formats data
INSERT INTO format (name, description) VALUES
('LP', 'Long Play Album - 12" vinyl record'),
('2xLP', 'Double LP Album'),
('EP', 'Extended Play - Typically 4-6 tracks'),
('7"', 'Seven-inch single'),
('12"', 'Twelve-inch single'),
('2x12"', 'Double twelve-inch record');

-- Insert default cover art
INSERT INTO cover_art (file_path, width, height, is_default) VALUES
('/assets/images/default.jpg', 500, 500, 1);

-- Insert selected album covers
INSERT INTO cover_art (file_path, width, height, is_default) VALUES
('/assets/images/St_Vincent--Strange_Mercy.jpg', 500, 500, 0),
('/assets/images/Bjork--Vespertine.jpg', 500, 500, 0),
('/assets/images/Daft_Punk--Discovery.jpg', 500, 500, 0),
('/assets/images/SZA--Ctrl.jpg', 500, 500, 0),
('/assets/images/Cloud_Nothings--Attack_on_Memory.jpg', 500, 500, 0),
('/assets/images/100_Gecs--1000_Gecs.jpg', 500, 500, 0),
('/assets/images/Todd_Terje--It''s_Album_Time.jpg', 500, 500, 0),
('/assets/images/The_Postal_Service--Give_Up.jpg', 500, 500, 0),
('/assets/images/Bjork--Homogenic.jpg', 500, 500, 0),
('/assets/images/Mr_Twin_Sister--Mr_Twin_Sister.jpg', 500, 500, 0),
('/assets/images/M83--Before_the_Dawn_Heals_Us.jpg', 500, 500, 0),
('/assets/images/Anderson_Paak--Bubblin.jpg', 500, 500, 0),
('/assets/images/Weatherday--Come_in.jpg', 500, 500, 0),
('/assets/images/MIA--Kala.jpg', 500, 500, 0),
('/assets/images/Yaeji--What_We_Drew.jpg', 500, 500, 0);

-- Insert artists
INSERT INTO artist (name) VALUES
('St. Vincent'),
('Björk'),
('Daft Punk'),
('SZA'),
('Cloud Nothings'),
('100 Gecs'),
('Todd Terje'),
('The Postal Service'),
('Mr Twin Sister'),
('M83'),
('Anderson .Paak'),
('Weatherday'),
('M.I.A.'),
('Yaeji'),
('Joe Hisaishi'),
('Royal Philharmonic Orchestra');

-- Insert releases
INSERT INTO release (title, release_year, format_id, cover_art_id) VALUES
('Strange Mercy', 2011, 1, 2),
('Vespertine', 2022, 2, 3),
('Discovery', 2014, 2, 4),
('Ctrl', 2017, 2, 5),
('Attack On Memory', 2012, 1, 6),
('1000 Gecs', 2020, 1, 7),
('It''s Album Time', 2014, 5, 8),
('Give Up', 2019, 1, 9),
('Homogenic', 2022, 1, 10),
('Mr Twin Sister', 2014, 1, 11),
('Before The Dawn Heals Us', 2022, 2, 12),
('Bubblin', 2019, 4, 13),
('Come In', 2022, 2, 14),
('Kala', 2021, 1, 15),
('What We Drew 우리가 그려왔던', 2021, 1, 16);

-- Link artists to releases
INSERT INTO release_artist (release_id, artist_id, is_primary) VALUES
(1, 1, 1),  -- Strange Mercy - St. Vincent
(2, 2, 1),  -- Vespertine - Björk 
(3, 3, 1),  -- Discovery - Daft Punk
(4, 4, 1),  -- Ctrl - SZA
(5, 5, 1),  -- Attack On Memory - Cloud Nothings
(6, 6, 1),  -- 1000 Gecs - 100 Gecs
(7, 7, 1),  -- It's Album Time - Todd Terje
(8, 8, 1),  -- Give Up - The Postal Service
(9, 2, 1),  -- Homogenic - Björk
(10, 9, 1), -- Mr Twin Sister - Mr Twin Sister
(11, 10, 1), -- Before The Dawn Heals Us - M83
(12, 11, 1), -- Bubblin - Anderson .Paak
(13, 12, 1), -- Come In - Weatherday
(14, 13, 1), -- Kala - M.I.A.
(15, 14, 1); -- What We Drew - Yaeji
