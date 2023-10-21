import {
  makeContractDeploy,
  broadcastTransaction,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
  AnchorMode,
  makeRandomPrivKey,
  privateKeyToString,
} from "@stacks/transactions";

export async function deployToStacks(clarityCode: string) {
  const contractName = "hello-stacks";

  console.log("Generating tx");
  console.log(`Code: ${clarityCode}`);
  console.log("Test");

  const deployTx = await makeContractDeploy({
    contractName,
    codeBody: clarityCode,
    senderKey:
      "5ce02957bf820067e43ae0503b5547e90474242ba610c301ca8122baf593064b",
    network: "testnet",
    anchorMode: AnchorMode.Any,
  });

  console.log("Broadcasting tx");

  const result = await broadcastTransaction(deployTx, "testnet");

  console.log("Tx broadcasted");

  if ((result as TxBroadcastResultOk).txid) {
    console.log("Transaction ID:", (result as TxBroadcastResultOk).txid);
    const res = (result as TxBroadcastResultOk).txid;
    return res;
  } else {
    console.log("Error:", (result as TxBroadcastResultRejected).error);
    const res = (result as TxBroadcastResultRejected).error;
    return res;
  }
}
