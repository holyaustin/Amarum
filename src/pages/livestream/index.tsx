import React from 'react';
import { jsx, Box } from 'theme-ui';
import Head from 'next/head';
import Link from 'next/link';
import styles from "../../styles/Livestream.module.css";


export default function Home() {
  return (
    <Box as="section"  sx={styles2.section}>
    <div className='bg-neutral-50 px-8'>
      <Head>
        <title>Amarum :: Livestream</title>
        <meta name='description' content='Generated by create next app' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Create New Livestreams </h1>

        <div className={styles.grid}>
        <Link href='livestream/createStream'>
            <a className={styles.card}>
              <h2>Create a new Live Stream &rarr;</h2>
              <p>Create a live stream using software like OBS</p>
              <p>Input the displayed parameters into OBS setting</p>
              <p>Start streaming and watch your stream transcoded by livepeer.</p>
            </a>
          </Link>


          <Link href='livestream/getStream'>
            <a className={styles.card}>
              <h2>Get a stream by Id &rarr;</h2>
              <p>Gets a specific stream by Id</p>
              <p>Enter a stream by Id and fetch video of that stream</p>
            </a>
          </Link>

          <Link href='livestream/getStreams'>
            <a className={styles.card}>
              <h2>Get All streams &rarr;</h2>
              <p>Gets all streams from the account</p>
            </a>
          </Link>

{/**
          <Link href='livestream/getSession'>
            <a className={styles.card}>
              <h2>Get Session By Id &rarr;</h2>
              <p>Get a session of a stream</p>
            </a>
          </Link>

          <Link href='livestream/getSessions'>
            <a className={styles.card}>
              <h2>Get Session By Stream Id &rarr;</h2>
              <p>Get a session of a stream with the stream Id</p>
            </a>
          </Link>
         */}
        </div>
      </main>


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
