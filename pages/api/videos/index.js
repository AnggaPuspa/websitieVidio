import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const videos = await prisma.video.findMany();
  res.json(videos);
}

