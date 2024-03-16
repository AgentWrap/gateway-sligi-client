const ethers = require('ethers');
const ccipread = require('@chainlink/ethers-ccip-read-provider');
const fs = require('fs');

require('dotenv').config({ path: '.env' });

const erc721Mock = JSON.parse(
  fs.readFileSync(
    'abi/ERC721Mock.json',
    'utf8'
  )
).abi;

const { TOKEN_ADDRESS, PROVIDER_URL, SENDER_ACCOUNT } = process.env;
const provider = new ccipread.CCIPReadProvider(
  new ethers.providers.JsonRpcProvider(PROVIDER_URL)
);
const signer = provider.getSigner(SENDER_ACCOUNT);
const erc721 = new ethers.Contract(TOKEN_ADDRESS, erc721Mock, signer);

async function main() {
  const tokenId = 1;
  console.log(`${await erc721.tokenURI(tokenId)}`);
}

main();
