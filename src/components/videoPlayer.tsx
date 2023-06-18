import React, { useState, useEffect } from 'react';
import { Player } from '@livepeer/react';
import { jsx, Box } from 'theme-ui';
import styles from "../styles/VideoPlayer.module.css"
import { EmbedSDK } from "@pushprotocol/uiembed";

 export default function VideoPlayer() {
  const [account, setAccount] = useState();
  const [haveMetamask, sethaveMetamask] = useState(true);
  // Set the state to get either the playback URL or playback ID
  const [playbackSource, setPlaybackSource] = useState<string>('');
  // Quick verifiation to check if url provided is a playback url
  const playbackurl = '.m3u8';

  useEffect(() => {
    //connectWallet()

    if (account) { // 'your connected wallet address'
      console.log("Detected wallet account is", account);
      EmbedSDK.init({
        headerText: 'Amarum DAO Message Notifications', // optional
        targetID: 'sdk-trigger-id', // mandatory
        appName: 'amarumDAO', // mandatory
        user: account, // mandatory
        chainId: 5, // mandatory
        viewOptions: {
            type: 'sidebar', // optional [default: 'sidebar', 'modal']
            showUnreadIndicator: true, // optional
            unreadIndicatorColor: '#cc1919',
            unreadIndicatorPosition: 'bottom-right',
        },
        theme: 'light',
        onOpen: () => {
          console.log('-> client dApp onOpen callback');
        },
        onClose: () => {
          console.log('-> client dApp onClose callback');
        }
      });
    }


  
    return () => {
      EmbedSDK.cleanup();
    };
  }, []);

  return (
    <Box as="section"  sx={styles2.section}>
    <div className="bg-blue-100 text-xl text-center text-black font-bold pt-5 pb-4">
      <h1 > Video Player powered by Livepeer Studio</h1>
      <h5 className={styles.h5}>Provide a playback URL or playback Id</h5>
    </div>
    <div className="flex justify-center bg-blue-100 p-10">
        <div className="w-1/2 flex flex-col pb-12 mr-15 ">
      <input
        className=" border rounded p-4 w-100 mb-4 text-black"
        type='text'
        value={playbackSource}
        name='playbackSource'
        onChange={(e) => setPlaybackSource(e.target.value)}
      />

      {playbackSource.includes(playbackurl) ? (
        <Player
          src={playbackSource}
          autoPlay={true}
          loop
          muted
        />
      ) : (
        <Player
          playbackId={playbackSource}
          autoPlay={true}
          loop
          muted
        />
      )}
    </div>
<div>
    <div className="bg-blue-100 text-xl text-center text-black font-bold pl-14 pb-4 pt-14">
      
      <h5 className={styles.h5} >Push Protocol Notification</h5>
    </div>
      <div>
    <button id="sdk-trigger-id" className = "align-center font-bold mt-20  bg-red-700 text-white text-2xl rounded p-4 shadow-lg ml-10 pl-10">Push Trigger button</button>
    </div>
  </div>
    </div>
    </Box>
  );
}

const styles2 = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };

