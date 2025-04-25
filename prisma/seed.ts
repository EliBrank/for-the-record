import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Formats
  const formats = await prisma.format.createMany({
    data: [
      { name: 'LP' },
      { name: '2xLP' },
      { name: 'EP' },
      { name: '7"' },
      { name: '12"' },
      { name: '2x12"' }
    ],
  });

  // Create Cover Art
  const coverArts = await prisma.coverArt.createMany({
    data: [
      { file_path: '/assets/images/default.png', width: 500, height: 500, is_default: true },
      { file_path: '/assets/images/St_Vincent--Strange_Mercy.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Bjork--Vespertine.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Daft_Punk--Discovery.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/SZA--Ctrl.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Cloud_Nothings--Attack_on_Memory.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/100_Gecs--1000_Gecs.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Todd_Terje--It\'s_Album_Time.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/The_Postal_Service--Give_Up.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Bjork--Homogenic.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Mr_Twin_Sister--Mr_Twin_Sister.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/M83--Before_the_Dawn_Heals_Us.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Anderson_Paak--Bubblin.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Weatherday--Come_in.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/MIA--Kala.jpg', width: 500, height: 500 },
      { file_path: '/assets/images/Yaeji--What_We_Drew.jpg', width: 500, height: 500 },
    ],
  });

  // Create Artists
  const artistNames = [
    'St. Vincent', 'Björk', 'Daft Punk', 'SZA', 'Cloud Nothings',
    '100 Gecs', 'Todd Terje', 'The Postal Service', 'Mr Twin Sister',
    'M83', 'Anderson .Paak', 'Weatherday', 'M.I.A.', 'Yaeji',
    'Joe Hisaishi', 'Royal Philharmonic Orchestra'
  ];

  const artists = await Promise.all(artistNames.map(name => prisma.artist.create({
    data: { name }
  })));

  // Create Releases
  const releases = await Promise.all([
    { title: 'Strange Mercy', year: 2011, formatId: 1, coverArtId: 2, artistIndex: 0 },
    { title: 'Vespertine', year: 2022, formatId: 2, coverArtId: 3, artistIndex: 1 },
    { title: 'Discovery', year: 2014, formatId: 2, coverArtId: 4, artistIndex: 2 },
    { title: 'Ctrl', year: 2017, formatId: 2, coverArtId: 5, artistIndex: 3 },
    { title: 'Attack On Memory', year: 2012, formatId: 1, coverArtId: 6, artistIndex: 4 },
    { title: '1000 Gecs', year: 2020, formatId: 1, coverArtId: 7, artistIndex: 5 },
    { title: 'It\'s Album Time', year: 2014, formatId: 5, coverArtId: 8, artistIndex: 6 },
    { title: 'Give Up', year: 2019, formatId: 1, coverArtId: 9, artistIndex: 7 },
    { title: 'Homogenic', year: 2022, formatId: 1, coverArtId: 10, artistIndex: 1 },
    { title: 'Mr Twin Sister', year: 2014, formatId: 1, coverArtId: 11, artistIndex: 8 },
    { title: 'Before The Dawn Heals Us', year: 2022, formatId: 2, coverArtId: 12, artistIndex: 9 },
    { title: 'Bubblin', year: 2019, formatId: 4, coverArtId: 13, artistIndex: 10 },
    { title: 'Come In', year: 2022, formatId: 2, coverArtId: 14, artistIndex: 11 },
    { title: 'Kala', year: 2021, formatId: 1, coverArtId: 15, artistIndex: 12 },
    { title: 'What We Drew 우리가 그려왔던', year: 2021, formatId: 1, coverArtId: 16, artistIndex: 13 },
  ].map(async ({ title, year, formatId, coverArtId, artistIndex }) => {
    const release = await prisma.release.create({
      data: {
        title,
        year,
        format: { connect: { id: formatId } },
        cover_art: { connect: { id: coverArtId } },
        artists: {
          create: {
            artist: { connect: { id: artists[artistIndex].id } }
          }
        }
      }
    });
    return release;
  }));
}

main()
  .then(async () => {
    console.log('Seeding completed.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
