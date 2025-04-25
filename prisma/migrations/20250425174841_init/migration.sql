-- CreateTable
CREATE TABLE "Format" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Release" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER,
    "format_id" INTEGER NOT NULL,
    "musicbrainz_id" TEXT,
    "cover_art_id" INTEGER NOT NULL,
    CONSTRAINT "Release_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "Format" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Release_cover_art_id_fkey" FOREIGN KEY ("cover_art_id") REFERENCES "CoverArt" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReleaseArtist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "release_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,
    CONSTRAINT "ReleaseArtist_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "Release" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReleaseArtist_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CoverArt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_path" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "is_default" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Format_name_key" ON "Format"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Release_cover_art_id_key" ON "Release"("cover_art_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseArtist_release_id_artist_id_key" ON "ReleaseArtist"("release_id", "artist_id");
