'use client'

import { useAuth } from '../hooks/useAuth'
import { useCreationEvents } from '../hooks/useCreationEvents'

export function Page() {

  const { provider } = useAuth()

  // @ts-ignore
  const { creationEvents } = useCreationEvents(provider)

  console.log("creationEvents", creationEvents)

  return (
    <div className='pl-4 pt-20 flex flex-col space-y-2'>
      <div>
      {"Someone turn me into an indexer :)"}
      </div>
      <a className="text-green-300 hover:underline" href="https://github.com/public-assembly/indexer">
        Link to repo
      </a>
    </div>
  )
}

export default Page
