'use client'
// @ts-nocheck

import { ConnectKitButton } from 'connectkit';
import { useAuth } from '../../hooks/useAuth';
import { shortenAddress } from '../../utils/shortenAddress';
import { useState } from 'react';
import Link from 'next/link';

export const Connect = () => {
  const { address, logout } = useAuth();
  const [showDisconnect, setShowDisonnect] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const user = address ? address : null;

  const handleShowDisconnect = () => {
    setShowDisonnect(!showDisconnect);
  };

  const handleLogout = () => {
    setShowDisonnect(!showDisconnect);
    logout();
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const canAccess = true

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <>
            {!isConnected ? (
              <button className="text-white hover:font-bold" onClick={show}>
                {"connect"}
              </button>
            ) : (
              <div className="text-white flex flex-row flex-wrap border-black">
                {showDisconnect ? (
                  <div className="w-full flex flex-row justify-end">
                    <button className="hover:font-bold w-fit flex flex-row pb-2" onClick={handleLogout}>
                      {"disconnect"}
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-white flex flex-row w-full justify-end space-x-2">
                  {canAccess && (
                    <>
                      {showOptions && (
                        <>
                          <Link href="/create" className="text-white hover:font-bold">
                            create
                          </Link>
                          <Link href="/manage" className="text-white hover:font-bold">
                            manage
                          </Link>
                        </>
                      )}
                      &nbsp;
                      <button className="text-white hover:font-bold" onClick={toggleOptions}>
                        {showOptions ? '–' : '+'}
                      </button>
                      &nbsp;
                    </>
                  )}
                  <button className="text-white w-fit flex flex-row hover:font-bold" onClick={handleShowDisconnect}>
                    {shortenAddress(user)}
                  </button>
                </div>
              </div>
            )}
          </>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default Connect;