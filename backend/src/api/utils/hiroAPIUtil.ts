import axios from 'axios';

export async function getSourceCode(contractAddress: string, contractName: string) {
  const url = `https://api.mainnet.hiro.so/v2/contracts/source/${contractAddress}/${contractName}?proof=0`;
  const response = await axios.get(url);
  return response.data;
}
