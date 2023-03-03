import type { NextApiRequest, NextApiResponse } from 'next';

import { Configuration, OpenAIApi } from 'openai';
import { useProductCreation } from '~/lib/products/hooks/use-create-product';

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
  const firstPrompt = `Atue como um especialista em marketing digital e crie para mim 10 títulos de e-books ou infoprodutos digitais atraentes e comunicativos que apliquem o mecanismo único no nicho de ${req.body.prompt}. Considere as necessidades e interesses do público-alvo e destaque os benefícios únicos do produto de forma convincente. Certifique-se de incluir uma frase de chamariz atraente para aumentar a taxa de conversão. Após gerar os títulos, separe-os por vírgula sem númerar e me retorne em uma única linha.`;

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
    for (const product of productListObjects) {
      await saveProduct(product);
    }

    res.status(200).json({ products: productListObjects });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
