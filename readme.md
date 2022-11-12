# KOLLEK-API
## API to mint, claim, verify and lookup NFTs

For the running app check https://kollek.me/

For the UI source check https://github.com/kuyawa/kollek

## Instructions

Clone the repo and install all the modules first

`> npm install`

## Testing

If you want to run tests, add your wallet key to env vars

`> export MINTERKEY=sYOURKEY123456789`
`> npm test`

## Methods

Include kollek-api.js in your project

`const Kollek = require('./kollek-api.js')`

Initialize Kollek with your private key

`const kollek = new Kollek(process.env.MINTERKEY)`

### Mint an event

```
let event = {
	eventid: 12345678,
	name: 'Soccer Game',
	info: 'Titans vs Olympics',
	description: 'Match of the week between rival high schools in Miami',
	startdate: '2022-11-20 17:30',
	enddate: null,
	expiry: null,
	isvirtual: false,
	location: 'Olympic Heights, Miami FL',
	website: 'http://kuyawa.net',
	uri: 'https://ipfs.io/ipfs/bafybeibzetds44cuulfcgkoj2c4hopypewzpk7bpb2kzbavrpoarko2lby/kuyawa.jpg',
	quantity: 1000,
	private: false
}

let tokenId = await kollek.mintNFT(event)
console.log('TokenId:', tokenId)
```

### Mint an NFT for an account, destin must set NFTokenMinter

```
let tokenId = await kollek.mintNFT(event, account)
console.log('TokenId:', tokenId)
```

### Bulk mint NFTs

```
let tokens = await kollek.bulkMintNFT(event, 10)
console.log('Tokens:', tokens)
```

### Claim an NFT creating a sell offer, account must accept sell offer

```
let claim = await kollek.claimNFT(tokenId, account)
console.log('Claim:', claim)

```

### Verify NFT belongs to account based on signature

```
let isValid = await kollek.verifyNFT(account, tokenId, signature)
console.log('Valid:', isValid)
```

### Lookup accounts that have the same event NFT

```
let list = await kollek.lookupNFT(eventId)
console.log('Accounts', list)
```

