import type { UIMessage } from 'ai';
import { Greeting } from './greeting';
import { memo } from 'react';
import type { Vote } from '@/lib/db/schema';
import equal from 'fast-deep-equal';
import type { UseChatHelpers } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { useMessages } from '@/hooks/use-messages';
import { PreviewMessage, ThinkingMessage } from './message';

interface MessagesProps {
  chatId: string;
  status: UseChatHelpers['status'];
  votes: Array<Vote> | undefined;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers['setMessages'];
  reload: UseChatHelpers['reload'];
  isReadonly: boolean;
  isArtifactVisible: boolean;
}

function PureMessages({
  chatId,
  status,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
}: MessagesProps) {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  } = useMessages({
    chatId,
    status,
  });

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 relative"
    >
      {messages.length === 0 && <Greeting />}

      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          chatId={chatId}
          message={message}
          isLoading={status === 'streaming' && messages.length - 1 === index}
          vote={
            votes
              ? votes.find((vote) => vote.messageId === message.id)
              : undefined
          }
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          requiresScrollPadding={
            hasSentMessage && index === messages.length - 1
          }
        />
      ))}

      {status === 'submitted' &&
        messages.length > 0 &&
        messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

      <motion.div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />
    </div>
  );
}

// Memoize the PureMessages component to optimize performance
export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  // If both previous and next props have isArtifactVisible as true, skip re-rendering
  if (prevProps.isArtifactVisible && nextProps.isArtifactVisible) return true;

  // If the status prop has changed, re-render the component
  if (prevProps.status !== nextProps.status) return false;

  // If both status props are truthy, re-render the component
  if (prevProps.status && nextProps.status) return false;

  // If the length of the messages array has changed, re-render the component
  if (prevProps.messages.length !== nextProps.messages.length) return false;

  // If the contents of the messages arrays are different, re-render the component
  if (!equal(prevProps.messages, nextProps.messages)) return false;

  // If the contents of the votes props are different, re-render the component
  if (!equal(prevProps.votes, nextProps.votes)) return false;

  // If none of the above conditions are met, skip re-rendering
  return true;
});
