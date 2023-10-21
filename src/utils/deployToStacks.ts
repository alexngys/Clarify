import {
    makeContractDeploy,
    broadcastTransaction,
    TxBroadcastResultOk,
    TxBroadcastResultRejected,
    AnchorMode,
    makeRandomPrivKey,
    privateKeyToString,
} from '@stacks/transactions';

import { readFileSync } from 'fs';

import { StacksTestnet } from '@stacks/network';

const network = new StacksTestnet();

export async function deployToStacks(clarityCode: string) {
    const contractName = 'hello-stacks';

    console.log("Generating tx")
    console.log(`Code: ${clarityCode}`)
    console.log("TEst")

    const deployTx = await makeContractDeploy({
        contractName,
        codeBody: readFileSync('./hello-world.clar').toString(),
        senderKey: '5ce02957bf820067e43ae0503b5547e90474242ba610c301ca8122baf593064b',
        network,
        anchorMode: AnchorMode.Any
    });

    console.log("Broadcasting tx")

    const result = await broadcastTransaction(deployTx, network);

    console.log("Tx broadcasted")

    if ((result as TxBroadcastResultOk).txid) {
        console.log('Transaction ID:', (result as TxBroadcastResultOk).txid);
    } else {
        console.log('Error:', (result as TxBroadcastResultRejected).error);
    }
}