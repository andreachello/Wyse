import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../../../../lib/constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  compatibility: 'strict',
  apiKey: process.env.OPENAI_API_KEY,
});

export const myProvider = isTestEnvironment
  ? customProvider({
    languageModels: {
      'chat-model': chatModel,
      'chat-model-reasoning': reasoningModel,
      'title-model': titleModel,
      'artifact-model': artifactModel,
    },
  })
  : customProvider({
    languageModels: {
      'chat-model': openai.chat('gpt-3.5-turbo'),
      'chat-model-reasoning': wrapLanguageModel({
        model: openai.chat('gpt-3.5-turbo'),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
      }),
      'title-model': openai.chat('gpt-3.5-turbo'),
      'artifact-model': openai.chat('gpt-3.5-turbo'),
    },
    imageModels: {
      'small-model': openai.image('dall-e'),
    },
  });
