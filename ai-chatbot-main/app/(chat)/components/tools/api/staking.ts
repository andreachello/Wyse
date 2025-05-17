import { tool } from 'ai';
import { z } from 'zod';

export const staking = tool({
    description: 'Show staking component',
    parameters: z.object({

    }),
    execute: async ({ }) => {
        // const response = await fetch(
        //     `https://dummyjson.com/users/8`,
        // );

        // const userData = await response.json();
        return "How much";
    },
});
