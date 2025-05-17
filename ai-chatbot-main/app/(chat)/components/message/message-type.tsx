'use client';

import cx from 'classnames';
import { cn, sanitizeText } from '@/lib/utils';
import { MessageEditor } from './message-editor';
import { MessageReasoning } from './message-reasoning';
import { DocumentToolCall, DocumentToolResult } from '@/app/(chat)/components/tools/components/document/document';
import { PencilEditIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Weather } from '@/app/(chat)/components/tools/components/weather';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { DocumentPreview } from '../preview/document-preview';
import { Skeleton } from '@/components/ui/skeleton';
import { Markdown } from '@/app/(chat)/components/text-block/markdown';
import AmountSelection from '../tools/components/selection-ui/AmountSelection';


export const MessageType = ({
    message,
    isLoading,
    mode,
    isReadonly,
    setMode,
    setMessages,
    reload,
}: any) => {
    return (
        <>
            {
                message.parts?.map((part, index) => {
                    const { type } = part;
                    const key = `message-${message.id}-part-${index}`;

                    if (type === 'reasoning') {
                        return (
                            <MessageReasoning
                                key={key}
                                isLoading={isLoading}
                                reasoning={part.reasoning}
                            />
                        );
                    }

                    if (type === 'text') {
                        return (
                            <TextMessage
                                key={key}
                                mode={mode}
                                isReadonly={isReadonly}
                                setMode={setMode}
                                message={message}
                                part={part}
                                setMessages={setMessages}
                                reload={reload}
                            />
                        )
                    }

                    if (type === 'tool-invocation') {
                        return (
                            <ToolInvocation
                                key={part.toolInvocation.toolCallId}
                                part={part}
                                isReadonly={isReadonly}
                            />
                        )
                    }
                })
            }
        </>
    )
}

const ToolInvocation = ({
    part,
    isReadonly,
}: any) => {
    const { toolInvocation } = part;
    const { toolName, toolCallId, state } = toolInvocation;

    if (state === 'call') {
        const { args } = toolInvocation;

        return (
            <div
                className={cx({
                    skeleton: ['getWeather'].includes(toolName),
                })}
            >
                {toolName === 'getWeather' ? (
                    <Weather />
                ) : toolName === 'createDocument' ? (
                    <DocumentPreview isReadonly={isReadonly} args={args} />
                ) : toolName === 'updateDocument' ? (
                    <DocumentToolCall
                        type="update"
                        args={args}
                        isReadonly={isReadonly}
                    />
                ) : toolName === 'requestSuggestions' ? (
                    <DocumentToolCall
                        type="request-suggestions"
                        args={args}
                        isReadonly={isReadonly}
                    />
                ) : toolName === 'getUsers' ? (
                    <UserList userData={null} />

                ) : toolName === 'stakingAmount' ? (
                    // <UserList userData={result} />
                    <AmountSelection />
                ) :
                    null}
            </div>
        );
    }

    if (state === 'result') {
        const { result } = toolInvocation;

        return (
            <div key={toolCallId}>
                {toolName === 'getWeather' ? (
                    <Weather weatherAtLocation={result} />
                ) : toolName === 'createDocument' ? (
                    <DocumentPreview
                        isReadonly={isReadonly}
                        result={result}
                    />
                ) : toolName === 'updateDocument' ? (
                    <DocumentToolResult
                        type="update"
                        result={result}
                        isReadonly={isReadonly}
                    />
                ) : toolName === 'requestSuggestions' ? (
                    <DocumentToolResult
                        type="request-suggestions"
                        result={result}
                        isReadonly={isReadonly}
                    />
                ) : toolName === 'getUsers' ? (
                    <UserList userData={result} />
                ) : toolName === 'staking' ? (
                    // <UserList userData={result} />
                    <AmountSelection />
                ) : (
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                )}
            </div>
        );
    }
}

const UserList: React.FC<any> = ({ userData }) => {
    if (!userData) {
        return (
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                <Skeleton className="w-32 h-32 rounded-full mb-4" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-1/2 h-6 mb-2" />
                <Skeleton className="w-1/2 h-6 mb-2" />
                <Skeleton className="w-1/2 h-6 mb-2" />
                <Skeleton className="w-1/2 h-6 mb-2" />
            </div>
        )
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img src={userData.image} alt={`${userData.firstName} ${userData.lastName}`} className="w-32 h-32 rounded-full mb-4" />
            <h2 className="text-xl font-semibold">{`${userData.firstName} ${userData.lastName}`}</h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">{userData.phone}</p>
            <p className="text-gray-600">{`Age: ${userData.age}`}</p>
            <p className="text-gray-600">{`Gender: ${userData.gender}`}</p>
            {/* Add more user details as needed */}
        </div>
    );
};

const TextMessage = ({
    mode,
    isReadonly,
    setMode,
    message,
    part,
    setMessages,
    reload,
}: any) => {
    if (mode === 'view') {
        return (
            <div className="flex flex-row gap-2 items-start">
                {message.role === 'user' && !isReadonly && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                data-testid="message-edit-button"
                                variant="ghost"
                                className="px-2 h-fit rounded-full text-muted-foreground opacity-0 group-hover/message:opacity-100"
                                onClick={() => {
                                    setMode('edit');
                                }}
                            >
                                <PencilEditIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit message</TooltipContent>
                    </Tooltip>
                )}

                <div
                    data-testid="message-content"
                    className={cn('flex flex-col gap-4', {
                        'bg-primary text-primary-foreground px-3 py-2 rounded-xl':
                            message.role === 'user',
                    })}
                >
                    <Markdown>{sanitizeText(part.text)}</Markdown>
                </div>
            </div>
        )
    }

    if (mode === 'edit') {
        return (
            <div className="flex flex-row gap-2 items-start">
                <div className="size-8" />

                <MessageEditor
                    key={message.id}
                    message={message}
                    setMode={setMode}
                    setMessages={setMessages}
                    reload={reload}
                />
            </div>
        )
    }
}