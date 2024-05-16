import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(req, res) {
  const form = formidable({ 
    uploadDir: "./public/uploads",
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    console.log('Fields:', fields); // Log fields untuk debugging
    console.log('Files:', files); // Log files untuk debugging
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).json({ error: "Error parsing the files" });
      return;
    }
    const { title, description } = fields;
    const file = files.file[0]; // Ambil file pertama dari array
    if (!file) {
      console.error('No file uploaded');
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const data = {
      title: fields.title[0], // Ambil elemen pertama dari array
      description: fields.description[0], // Ambil elemen pertama dari array
      src: `/uploads/${path.basename(file.filepath)}`,
    };

    try {
      const video = await prisma.video.create({ data });
      res.status(200).json(video);
    } catch (error) {
      console.error('Error creating video:', error);
      res.status(500).json({ error: "Failed to create video" });
    }
  });
}

