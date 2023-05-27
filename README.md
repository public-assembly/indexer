Were gonn make our own ap-indexer by listening to press creation events using src/hooks/useCreationEvents, pushing historical events to arweave, and then updating the list every time new events are published

The code for pushing to bundlr comes from Nader's recent [tutorial](https://github.com/dabit3/nextjs-route-handlers-permanent-file-storage). All the dep's are installed, just need to copy over the api code.

Also the useCreationEvents hook isn't working correctly yet, this is now using viem event filtering which I haven't figured out yet (it's close)

Lastly, /create allows you to create ERC721 + ERC1155 Press contracts, which I just upgraded + deployed new versions of to provide an informative creation event to the factories which was missing before.

I'm getting a build error so this isn't on vercel yet, but will be soon 