import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface SuccessResponse {
  introduction: string;
}

interface ErrorResponse {
  message: string;
}

enum HttpStatus {
  Ok = 200,
  InternalServerError = 500,
}

export default async function generateIntroduction(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
): Promise<void> {
  try {
    const body = req.body;

    const BLACK_BOX_URL = process.env?.BLACK_BOX_URL;

    if (!BLACK_BOX_URL) {
      return res
        .status(HttpStatus.InternalServerError)
        .json({ message: 'Missing required environment variable' });
    }

    const url = `${BLACK_BOX_URL}generate-introduction`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(url, body, config);
      console.log(response.data.introduction);
      return res
        .status(HttpStatus.Ok)
        .json({ introduction: response.data.introduction });
    } catch (error: any) {
      console.error(error);
      return res
        .status(HttpStatus.InternalServerError)
        .json({ message: `Failed to generate introduction: ${error.message}` });
    }
  } catch (error: any) {
    console.error(error);
    return res.status(HttpStatus.InternalServerError).json({
      message: `Internal server error: ${error.message}`,
    });
  }
}
