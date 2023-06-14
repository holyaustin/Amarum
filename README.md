# Amarum : A Paywall Video Dataset Marketplace  with a DAO

A DApp to allow the user(host) to mint moments as NFT using the contracts deployed on FVM

![Amarum](https://bafkreihqvhqlk4j5ea4hky3fmk24cj6xhw2rhgbkfcbg6fktlkprbec7gm.ipfs.nftstorage.link/)

## Introduction

Amarum is a Data DAO video project with the aim of helping creators publish exciting video datasets while getting rewarded for that. The datasets upon submission is curated and stored on filecoin SPs through data deals that are established by the DAO. The DAO has the responsibility of storing these datasets and making money from the marketplace paywall. The accrued income is distributed both to DAO members and some kept in the DAO treasury. DAO members can use the Huddle01 video streaming feature to have meetings and record presentation and mint them while storing the Video files on IPFS and Metadata on Filecoin Blockchain.
Contents can also be streamed live through Huddle01 Live Presentation SDK streams. We use the open zeppelin ERC721 standard, Files are store to IPFS / Filecoin using NFT.Storage and  file metadata URI stored on Filecoin Hyperspace Testnet which is FEVM . Upon retrieval, . Lighthouse was used to used for encryption and most important, the Access control of Light hoise was used to grant access to member with the membership NFT, Huddle for conference meeting and XMTP for chat and interaction.

## Web 3.0 technologies Used

Frontend: NextJS, postcss, tailwindcss, Theme

Web3 technologies: LightHouse, Huddle01,  IPFS/filecoin, Livepeer (livepeer.js), Web3Modal,  Filecoin (Hyperspace),
Backend: Solidity, Node.js

Blockchain deployed to:  Filecoin (Calibration) Testnet

## Description

This project was made using several technologies. The front-end was designed using a server-side-rendering javascript tech known as NextJS. the latest version of Next was used because of how fast it was to build the project.  IPFS / Filecoin's NFT.Storage was used to store user's video on their decentralized storage. videos of various news can be viewed on demand. They can share these Videos to anyone through a sharing mechansism that is easy to copy out the sharing IPFS URL. Huddle01 for video streaming ND CONFERENCE MEETING. Huddle01 was used for conference meeting.

The smart contract uses ERC-721 specification to hold metadata URI, ethers.js was used to interact with the smart contract. The contract was deployed to Filecoin Hyperspace blockchain. The entire project demo was hosted to Vercel.

## Live DApp hosted on

Live Dapp on Vercel: - <https://mominter.vercel.app/>

  Filecoin (calibration) Testnet deployed Address = "0x4e75D8F85ED40aA3f73fB751b1Dfa07DEFe09C94"

  <https://calibration.filfox.info/en/address/0x4e75D8F85ED40aA3f73fB751b1Dfa07DEFe09C94>

 Youtube video link: <https://youtu.be/kZvxCGMPci8>

## Getting Started

First, run the development server:

```text
clone the repo https://github.com/holyaustin/Mominter.git
# next is to 
npm install
# then
npm run dev
# or
yarn dev
```

Open [http://localhost:3016](http://localhost:3016) with your browser to see the result.

## How to run this project locally

Try running some of the following tasks:

Fork this repo using

git clone <https://github.com/holyaustin/Mominter.git>

cd soldier-ant-colony

npx hardhat node

npx hardhat run scripts/deploy.js --network localhost

npm run build

## How to deploy to Filecoin  blockchain, update hardhat.config

npx hardhat run scripts/deploy.js --network testnet

## Connect with me and send me a mail

E-mail - <holyaustin@yahoo.com>

stay connected on twitter @holyaustin

<https://live-par-1-abr-cdn.livepush.io/live_abr_cdn/emaIqCGoZw-6/index.m3u8>

<https://calibration.filfox.info/en/address/0xa6d6f4556b022c0c7051d62e071c0acece5a1228>

LightHouse API - 1eceb394-fc75-43cf-83b6-546c9c13da57

Huddle01 - eee33ed8308ea7f4814202f6fee8c936c80d2f9f03d480b069f13974fe349e21
