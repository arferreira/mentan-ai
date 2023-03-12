import type { NextApiRequest, NextApiResponse } from 'next';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface Product {
  title: string;
}

interface ApiResponse {
  products: Product[];
}

export default async function generateProduct(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const firstPrompt = `As a digital marketing specialist, create for me 1 attractive and communicative e-book or digital infoproduct title that applies the unique mechanism in the ${req.body.prompt} niche. Consider the needs and interests of the target audience and compellingly highlight the unique benefits of the product.`;

  try {
    if (!configuration.apiKey) {
      throw new Error('Missing OpenAI API key');
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: firstPrompt,
      temperature: 0.6,
      max_tokens: 1100,
    });

    const response = completion.data.choices[0].text?.trim() ?? '';
    console.log(response);
    const productsTitleList = response.split(',');
    const productListObjects: Product[] = productsTitleList.map((title) => ({
      title,
    }));
    console.log(productsTitleList);

    res.status(200).json({ products: productListObjects });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
