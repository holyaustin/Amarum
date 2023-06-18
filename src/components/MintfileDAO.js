/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Polybase } from "@polybase/client";
import { Database } from "@tableland/sdk";
import SpheronClient, { ProtocolEnum } from "@spheron/storage"; 
import axios from 'axios'
import { rgba } from 'polished';
import { Wallet, providers } from "ethers";

import 'dotenv/config';
import AmarumNFT from "../../artifacts/contracts/Amarum.sol/AmarumNFT.json";
import { AmarumAddress } from "../../config";
const APIKEY = [process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY];

const MintFile = () => {
  const navigate = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadedFile2, setUploadedFile2] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "",  total: "",  category: "sport",  description: "" });
   
  const handleFileUpload = (event) => {
    console.log("Sample for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const handleFileUpload2 = (event) => {
    console.log("Dataset for upload selected...");
    setUploadedFile2(event.target.files[0]);
  };

  const uploadDataSet = async (inputFile, inputFile2) => {
    console.log("upload dataset");
    const { name, total, category, description } = formInput;
    console.log("form input");
    console.log("name", name);
    console.log("total", total);
    console.log("category", category);
    console.log("description", description);

    if (!name || !total || !category || !description || !inputFile || !inputFile2) return;
    console.log("form input22"); 
    const nftStorage = new NFTStorage({ token: APIKEY, });
     console.log("NFT.storage");
    try {
      console.log("Trying to upload file to ipfs");
      setTxStatus("Uploading Article to IPFS");
      console.log("close to metadata");
      const metaData = await nftStorage.store({
        name: name,
        description: description,
        image: inputFile,
        properties: {
          category, // category
          total,
          image2: inputFile2
        },
      });
      console.log("metadata is: ", { metaData });
      setMetaDataURl(metaData.url);
      return metaData;
      
    } catch (error) {
      setErrorMessage("Could store file to NFT.Storage - Aborted file upload.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus("Adding transaction to Filecoin Calibration.");

     const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const connectedContract = new ethers.Contract(AmarumAddress, AmarumNFT.abi, provider.getSigner());
      console.log("Connected to contract", AmarumAddress);
      console.log("IPFS blockchain uri is ", metadata.url);

      const mintNFTTx = await connectedContract.createToken(metadata.url);
      console.log("File successfully created and added to Blockchain");
      await mintNFTTx.wait();
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Calibration.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    console.log("image ipfs path is", imgViewString);
    setImageView(imgViewString);
   setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://calibration.filfox.info/en/tx/${mintNFTTx.hash}`);
    setTxStatus("Dataset submission was successfully!");
    console.log("Dataset submission completed");
  };

  const mintNFTFile = async (e, uploadedFile, uploadedFile2) => {
    e.preventDefault();
    // 1. upload File content via NFT.storage
    const metaData = await uploadDataSet(uploadedFile, uploadedFile2);

    // 2. Mint a NFT Filecoin Chain
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
    previewNFT(metaData, mintNFTTx);

    //4. Mint Reward
    // mintReward();

    //5. navigate("/explore");
   navigate.push('/dashboard');
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    console.log("urlArray = ", urlArray);
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    console.log("ipfsGateWayURL = ", ipfsGateWayURL)
    return ipfsGateWayURL;
  };

  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-pink-100 text-xl text-center text-black font-bold pt-10 pb-1">
        <h1> Mint DAO Token for Governance</h1>
        <h4 className="text-pink-100"> Minimum of 100 Needed to be minted</h4>
      </div>
      <div className="flex justify-center bg-pink-100">
        <div className="w-1/2 flex flex-col pb-12 ">
        <input
            placeholder="Enter number of token you want to mint"
            className="mt-3 border rounded p-2 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />

          <button type="button" onClick={(e) => mintNFTFile(e, uploadedFile, uploadedFile2)} className="font-bold mt-20 bg-red-700 text-white text-2xl rounded p-4 shadow-lg">
            Mint DAO Token
          </button>
        </div>
      </div>
    </Box>

  );
};
export default MintFile;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};
