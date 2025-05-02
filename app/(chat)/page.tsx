import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';

export default async function Page() {
  // Try to get session but don't require it
  const session = await auth().catch(() => null);
  
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  // Use a guest session if no authenticated session exists
  const userSession = session || {
    user: {
      id: `guest-${generateUUID()}`,
      name: 'Guest User',
      email: `guest-${Date.now()}@example.com`,
      image: null
    },
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
  };

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialVisibilityType="private"
          isReadonly={false}
          session={userSession}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie.value}
        initialVisibilityType="private"
        isReadonly={false}
        session={userSession}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
