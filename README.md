We're gonna make our own Assembly Press (AP) indexer by listening to press creation events using `src/hooks/useCreationEvents`, pushing historical events to Arweave, and then updating the list every time new events are published.

The code for pushing to Bundlr comes from Nader's recent [tutorial](https://github.com/dabit3/nextjs-route-handlers-permanent-file-storage). All the dependencies are installed, just need to copy over the API code.

Also the `useCreationEvents` hook isn't working correctly yet, this is now using viem event filtering which I haven't figured out yet (it's close).

Lastly, /create allows you to create ERC721 + ERC1155 Press contracts, which I just upgraded + deployed new versions of to provide an informative creation event to the factories which was missing before.
