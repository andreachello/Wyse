import React from 'react';
import { Coins, TrendingUp, ArrowRight, Bot } from 'lucide-react';

interface StakingOption {
    name: string;
    apy: number;
    minStake: string;
    tvl: string;
    logo?: string;
    isComingSoon?: boolean;
}

const stakingOptions: StakingOption[] = [
    {
        name: 'Solana (SOL)',
        apy: 7.2,
        minStake: '0.1 SOL',
        tvl: '$245.8M',
        logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
    },
    {
        name: 'Ethereum (ETH)',
        apy: 4.5,
        minStake: '0.01 ETH',
        tvl: '$1.2B',
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
    },
    {
        name: 'USDC',
        apy: 5.8,
        minStake: '100 USDC',
        tvl: '$892.1M',
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png'
    },
    {
        name: 'USDT',
        apy: 5.6,
        minStake: '100 USDT',
        tvl: '$654.3M',
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png'
    }
];

function StakingTable() {
    return (
        <>
            <div className='flex flex-row space-x-2 items-center bg-neutral-100 p-2 w-full rounded-xl border border-neutral-200 shadow-sm mb-2'>
                <Bot />
                <p>Here is a table of best APYs:</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
                <div className="flex flex-col p-3">
                    <p className="text-sm font-medium text-neutral-800">Best Staking APY</p>
                    <p className="text-xs font-medium text-neutral-400">
                        Select an asset to stake your SOL for and stake it
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Asset</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">APY</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">TVL</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Min. Stake</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stakingOptions.map((option) => (
                                <tr
                                    key={option.name}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={option.logo}
                                                alt={option.name}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span className="font-medium text-gray-900 text-sm">{option.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <span className="font-medium text-green-600 text-sm">{option.apy}%</span>
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap text-gray-600 text-sm">
                                        {option.tvl}
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap text-gray-600 text-sm">
                                        {option.minStake}
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <button className="inline-flex items-center justify-center rounded-lg px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                                            Stake
                                            <ArrowRight className="ml-1 w-3 h-3" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}

export default StakingTable;