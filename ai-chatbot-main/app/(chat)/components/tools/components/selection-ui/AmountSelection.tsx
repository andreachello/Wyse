'use client'

import React, { FC } from 'react';
import { Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AmountSelectionProps {
    onSelectAmount?: (amount: string) => void;
}

export const AmountSelection: FC<AmountSelectionProps> = ({ onSelectAmount }) => {
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // onSelectAmount(event.target.value);
    };

    return (
        <>
            <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-600 p-4 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-neutral-800 dark:text-white">Amount Selection</p>
                    <p className="text-xs font-medium text-neutral-400 dark:text-neutral-400">
                        Select a starting amount. This will be the starting amount used in the strategy.
                    </p>
                </div>
                <Input variant="function-input" placeholder="Select Amount" onChange={handleAmountChange} />
            </div>
        </>
    );
};

export default AmountSelection;
