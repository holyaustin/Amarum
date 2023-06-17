/** @jsxRuntime classic */
/** @jsx jsx */
import {
  jsx,
  Box,
  Flex,
  Text,
  Input,
  Label,
  Button,
  Select,
  Heading,
  Container,
} from 'theme-ui';
import { useState, useEffect } from 'react';
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import { useRouter } from 'next/router'
import { rgba } from 'polished';
import Image from '../components/image';
import ConnectWallet from "../components/ConnectWalletMember";
import ConnectWallet2 from "../components/ConnectWalletRegister";
import { Database } from "@tableland/sdk";
import { NonceManager } from "@ethersproject/experimental";

async function connectDatabase() {
  // Establish a connection with the database
  const db = new Database();
  // Return the database instance
  return db;
}

const Banner = () => {
  console.log("Enter Function Banner");
  const navigate = useRouter();
  const [signer, setSigner] = useState();
  const [database, setDatabase] = useState();
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "",  twitter: "",  email: "" });

  async function connectSigner() {
    console.log("Connect signer")
    if (!signer) {
      const { ethereum } = window;
      try {
        if (!ethereum) {
          //sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Also demonstrates the nonce manager usage
        const baseSigner = accounts[0];;
        //const signer = new NonceManager(baseSigner);
        const signer = accounts[0];
        //console.log("Etherum signer is", signer)
        setSigner(accounts[0]);
        //navigate.push('/explore')
        return signer
      } catch (error) {
        console.error(error);
      }
    }

   }
   
  async function handleConnect() {
    // Connect a signer
    console.log("Handle Connect")
    const { name, twitter, email } = formInput;
    if (!name || !twitter || !email ) return;
    try {
    const signer = await connectSigner();
    console.log("Signer is", signer)
    setSigner(signer);
    // Connect and interact with the database
    const database = await connectDatabase(signer);
    setDatabase(database);
    console.log("database is ", database)
    const db  = database
    
    const prefix = "amarum_table";
    const  tableName = "amarum_table_314159_222"; //create.txn.name; // e.g., my_sdk_table_80001_311
/**
    const { meta: create } = await db
      .prepare(`CREATE TABLE ${prefix} (u_wallet text primary key, u_name text, u_email text, u_twitter text);`)
      .run();
 

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    const  tableName = "amarum_table_314159_222"; //create.txn.name; // e.g., my_sdk_table_80001_311
    console.log(tableName);
    console.log("record is",signer, name, email, twitter);
 */
    // Insert a row into the table with an `INSERT INTO` statement
        const { meta: insert } = await db
       
        .prepare(`INSERT INTO ${tableName} (u_wallet, u_name, u_email, u_twitter) VALUES (?, ?, ?, ?);`)
        .bind( `${signer}`, `${name}`, `${email}`, `${twitter}` )
        .run();
       
/**   
        const sqlstmt = db.prepare(
          `INSERT INTO ${tableName} (u_wallet, u_name, u_email, u_twitter) VALUES (${signer}, ${name}, ${email},  ${twitter})`
        )
        console.log(sqlstmt)
        console.log("outside the sql insert")

        // Wait for transaction finality
        await sqlstmt.run();
*/
        // Perform a read query, requesting `all` rows from the table
      const { results } = await db.prepare(`SELECT * FROM ${tableName};`).raw();
      console.log(results);
    } catch (error) {
      console.log("Error Uploading Content", error);
    }
 }
 
  return (
    <Box as="section" id="home" sx={styles.section}>
      <Container>
        <Box sx={styles.grid}>
          <Box as="form" sx={styles.domainCard}>
            <Heading className="text-center text-blue-500"> Membership</Heading>
            
            <div style={{fontSize: '18px', marginRight: '0.5rem', fontWeight: 'bold'}} className="text-justify font-mono">
              <p>
              Become a DAO Member by obtaining your membership NFT. Start registering with the form. Already a Member, Access DAO Dashbaord using with Access Dashboard button.
              </p>
              <br />
            </div>
            <div className="flex justify-center gap-4">
            <div className="mr-5"><ConnectWallet /></div>
            
          </div>
       
            <Text as="p" sx={styles.note} style={{color:`red`, fontSize: '18px', marginRight: '0.5rem', fontWeight: 'bold'}}>
            Home for video datasets...
            </Text>
           
          </Box>
          {/** Register 
          <Box as="figure" sx={styles.illustration}>
            <Image src="/images/live4.png" loading="lazy" alt="video conferencing" />
          </Box>
          */}

<Box as="form" sx={styles.domainCard}>
    <Heading className="text-center text-blue-500"> Register</Heading>
            {/**
            <div style={{fontSize: '18px', marginRight: '0.5rem', fontWeight: 'bold'}} className="text-justify font-mono">
              <p>
              Become a DAO Member by obtaining your membership NFT. Start registering with the form. Already a Member, Access DAO Dahbaord using with Access Dashboard button.
              </p>
              <br />
            </div>
            <div className="flex justify-center gap-4">
            <div className="mr-5"><ConnectWallet2 /></div>
            <div> <ConnectWallet2 /></div>
          </div>
       
            <Text as="p" sx={styles.note} style={{color:`red`, fontSize: '18px', marginRight: '0.5rem', fontWeight: 'bold'}}>
            Home for video datasets...
            </Text>
            */}

      <div className="flex justify-center">
        <div className="w-full flex flex-col pb-12">
        <input
            placeholder="Enter your Name"
            className="mt-3 border-4 border-black rounded p-2 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
        <input
            placeholder="Enter your Email"
            className="mt-3 border-4 border-black rounded p-2 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, email: e.target.value })}
          />
          <input
            placeholder="Twitter Handle"
            className="mt-3 border rounded p-2 text-xl border-4 border-black "
            onChange={(e) => updateFormInput({ ...formInput, twitter: e.target.value })}
          />

          <br />

          <button type="button" onClick={async () => handleConnect()} className="font-bold mt-2 bg-red-700 text-white text-2xl rounded p-4 shadow-lg">
            Register
          </button>
        </div>
        </div>

          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  section: {
    backgroundColor: 'primary',
    FontFace: '',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, null],
  },
  grid: {
    gap: ['30px 60px', null, null, null, '30px 40px', '30px 60px'],
    display: 'grid',
    minHeight: [null, null, null, null, null, '66vh', '81vh'],
    alignItems: 'center',
    gridTemplateColumns: [
      '1fr',
      null,
      null,
      null,
      'repeat(2, 1fr)',
      '510px 1fr',
    ],
  },
  domainCard: {
    background: 'white',
    boxShadow: '0px 24px 50px rgba(54, 91, 125, 0.05)',
    textAlign: 'justify',
    borderRadius: 10,
    p: ['30px 25px 50px', null, null, '40px 40px 60px'],
    m: [null, null, null, '0 auto', 'unset'],
    maxWidth: [null, null, null, 480, 'none'],
    h2: {
      fontWeight: 700,
      fontSize: [8, null, null, 10, 9, 14],
      lineHeight: 1.36,
      letterSpacing: 'heading',
      color: 'textSecondary',
      mb: [5, null, null, 7, 8],
    },
  },
  inputGroup: {
    alignItems: 'center',
    border: (theme) => `1px solid ${theme.colors.borderColor}`,
    borderRadius: 5,
    px: [3, null, null, 6],
    input: {
      border: 0,
      borderRadius: 0,
      fontSize: [1, null, null, 2],
      minHeight: [45, null, null, 60],
      p: 0,
      ':focus': {
        boxShadow: 'none',
      },
      '::placeholder': {
        fontSize: '15px',
        lineHeight: 1.33,
        color: rgba('#02073E', 0.4),
      },
      ':-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
      },
    },
    select: {
      border: 0,
      color: 'textSecondary',
      fontWeight: 500,
      fontSize: [0, null, null, '15px'],
      lineHeight: 1.33,
      letterSpacing: 'heading',
      minHeight: [45, null, null, 60],
      minWidth: [60, null, null, 75],
      p: 0,
      textTransform: 'uppercase',
      ':focus': {
        outline: 0,
      },
      '+ svg': {
        color: '#A6A8BB',
        height: 40,
        width: 40,
      },
    },
  },
  submit: {
    fontSize: [1, null, null, 6],
    mt: [4],
    minHeight: [45, null, null, 60],
    width: '100%',
  },
  note: {
    fontStyle: 'italic',
    fontSize: [0, null, null, '15px'],
    lineHeight: 1.33,
    textAlign: 'center',
    color: rgba('#02073E', 0.5),
    mt: [4],
  },
};
