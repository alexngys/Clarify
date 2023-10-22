import axios from 'axios';

export async function getSoliditySourceCode(contractAddress: string) {
  const url = `https://api-sepolia.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const response = await axios.get(url);

  const contract = response.data.result[0].SourceCode
  return contract;
}
