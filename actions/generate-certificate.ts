import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, courseName, date } = req.body;

  if (!name || !courseName || !date) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const response = await axios.post(
      'https://api.bannerbear.com/v2/images',
      {
        template: 'N1qMxz5v6mdO5eQ4ko', // Replace with your Bannerbear template ID
        modifications: [
          { name: 'title', text: 'Sikhley' },
          { name: 'subtitle', text: 'Certificate of Completion' },
          { name: 'awardee_name', text: name },
          { name: 'details', text: 'This certificate recognizes the completion of the course.' },
          { name: 'course', text: courseName },
          { name: 'date', text: date },
        ],
      },
      {
        headers: {
          Authorization: `Bearer YOUR_BANNERBEAR_API_KEY`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ imageUrl: response.data.image_url });
  } catch (error) {
    console.error('Error generating certificate image:', error);
    res.status(500).json({ message: 'Failed to generate certificate image' });
  }
}
