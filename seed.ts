import { prisma } from '../lib/prisma';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');
  // Create users and profiles
  const users = [];
  for (let i = 0; i < 10; i++) {
    const email = `user${i}@example.com`;
    const password = await bcrypt.hash('password', 10);
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role: i === 0 ? 'ADMIN' : 'USER',
        profile: {
          create: {
            username: `user${i}`,
            bio: faker.lorem.sentence(),
            location: faker.location.city(),
            artist: i < 3,
          },
        },
      },
    });
    users.push(user);
  }
  // Create tracks
  const tracks = [];
  for (let i = 0; i < 12; i++) {
    const uploader = users[i % users.length];
    const track = await prisma.track.create({
      data: {
        uploaderId: uploader.id,
        title: `Track ${i + 1}`,
        genre: 'Pop',
        url: `seed-track-${i}.mp3`,
        plays: faker.number.int({ min: 0, max: 100 }),
      },
    });
    tracks.push(track);
  }
  // Create playlists
  for (let i = 0; i < 5; i++) {
    const owner = users[i % users.length];
    const playlist = await prisma.playlist.create({
      data: {
        ownerId: owner.id,
        title: `Playlist ${i + 1}`,
        isPublic: true,
      },
    });
    // add tracks to playlist
    await prisma.playlistTrack.createMany({
      data: tracks.slice(i, i + 3).map((t, index) => ({ playlistId: playlist.id, trackId: t.id, position: index })),
    });
  }
  // Create listings
  for (let i = 0; i < 8; i++) {
    const seller = users[i % users.length];
    await prisma.listing.create({
      data: {
        sellerId: seller.id,
        title: `Listing ${i + 1}`,
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 5, max: 50, precision: 0.01 }),
        category: i % 3 === 0 ? 'DIGITAL' : i % 3 === 1 ? 'PHYSICAL' : 'SERVICE',
      },
    });
  }
  // Create follows
  for (let i = 0; i < 30; i++) {
    const follower = users[faker.number.int({ min: 0, max: users.length - 1 })];
    const following = users[faker.number.int({ min: 0, max: users.length - 1 })];
    if (follower.id !== following.id) {
      await prisma.follow.create({ data: { followerId: follower.id, followingId: following.id } }).catch(() => {});
    }
  }
  // Conversations and messages
  const conversation = await prisma.conversation.create({ data: {} });
  await prisma.conversationParticipant.createMany({
    data: users.slice(0, 2).map((u) => ({ conversationId: conversation.id, userId: u.id })),
  });
  await prisma.message.createMany({
    data: [
      { conversationId: conversation.id, senderId: users[0].id, content: 'Hello there!' },
      { conversationId: conversation.id, senderId: users[1].id, content: 'Hi, welcome to StageDive!' },
    ],
  });
  console.log('Seeding complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});