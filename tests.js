// TESTS
let Kollek = require('./api.js')
let kollek = new Kollek(process.env.MINTERKEY)

function preTest(source){
	if(!process.env.MINTERKEY){
		console.log('MINTERKEY env var is required')
		console.log('For minter key use the private key of your account with some funds')
		process.exit(0);
	}
}

function startTest(source){
	let now = new Date()
	console.log(now,source)
	return now
}

function endTest(timer){
	let lapse = new Date() - timer
	console.log('End',lapse, 'millisecs\n')
}

function assert(cond, msg){
	if(!cond){ console.error('> Error:', msg) }
}

function random8(){
	return parseInt(Math.random()*90000000)+10000000
}

// Test Data
let testEvent = {
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

let testMinterKey = process.env.MINTERKEY
let testMinter    = 'rhjqL5YcMBZWQbQmFE9XxQHTWX6qNim3T1'
let testAccount   = 'rBd6iDaL2b6FNgYtZhxLpbAxXHkVCoq567'
let testTokenId   = '000B000074A254BCED2B8E1D5882959CF4FF7B76A2B782E6A050656700000007'
let testSignature = '1200037321EDBDBA1129A32C472C00ECB16DE65718A31D2A57B613DF5C154305B94B9CC243B87440944581C40B9AAD9A6FACC8E8517795C8BC051356035F75150234FD008462613C4B041E8199A4EEB613948DD4B199818CB5313BF24A150E046EBAFD2E51435507'


// Tests
async function testMintEvent(event){
	let timer = startTest(arguments.callee.name)
	let tokenId = await kollek.mintNFT(event)
    console.log('TokenId:', tokenId)
	assert(tokenId!=null, 'Minting event failed')
	endTest(timer)
}

async function testMintNFT(event, account){
	let timer = startTest(arguments.callee.name)
	let tokenId = await kollek.mintNFT(event, account)
    console.log('TokenId:', tokenId)
	assert(tokenId!=null, 'Minting NFT failed')
	endTest(timer)
}

async function testBulkMintNFT(event, qty){
	let timer = startTest(arguments.callee.name)
	let list = await kollek.bulkMintNFT(event, qty)
    console.log('Tokens:', list)
	assert(list?.length==qty, 'Bulk mint failed')
	endTest(timer)
}

async function testClaimNFT(tokenId, account){
	let timer = startTest(arguments.callee.name)
	let claim = await kollek.claimNFT(tokenId, account)
    console.log('Claimed:', claim)
	assert(claim!=null, 'Token could not be claimed')
	endTest(timer)
}

async function testVerifyNFT(account, tokenId, signature){
	let timer = startTest(arguments.callee.name)
	let isValid = await kollek.verifyNFT(account, tokenId, signature)
    console.log('Valid:', isValid)
	assert(isValid, 'Token is not valid')
	endTest(timer)
}

async function testLookupNFT(eventId){
	let timer = startTest(arguments.callee.name)
	let list = await kollek.lookupNFT(eventId)
	console.log('Accounts', list)
	endTest(timer)
}

async function runAllTests(){
	preTest()
	await testMintEvent(testEvent)
	await testMintNFT(testEvent, testAccount)
	await testBulkMintNFT(testEvent, 2)
	await testClaimNFT(testTokenId, testAccount)
	await testVerifyNFT(testAccount, testTokenId, testSignature)
	await testLookupNFT(testEvent.eventid)
}

runAllTests()

// END