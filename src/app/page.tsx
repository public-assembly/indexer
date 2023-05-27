'use client';

import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import { useCreationEvents } from '../hooks/useCreationEvents';

export default function Page() {
  const { provider } = useAuth();

  // @ts-ignore
  const { creationEvents } = useCreationEvents(provider);

  console.log('creationEvents', creationEvents);

  return (
    <div className='pl-4 pt-20 flex flex-col space-y-2'>
      <div>{'Someone turn me into an indexer :)'}</div>
      <Link
        className='text-green-300 hover:underline'
        href='https://github.com/public-assembly/indexer'
      >
        Link to repo
      </Link>
    </div>
  );
}
