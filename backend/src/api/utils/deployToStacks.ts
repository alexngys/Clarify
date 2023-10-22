import {
    makeContractDeploy,
    broadcastTransaction,
    TxBroadcastResultOk,
    TxBroadcastResultRejected,
    AnchorMode,
    makeRandomPrivKey,
    privateKeyToString,
  } from '@stacks/transactions';

import { StacksTestnet } from '@stacks/network';

const network = new StacksTestnet();

const clarityCode = `(define-public (write-message (message (string-utf8 500)))
(begin
    (print message)
    (ok "Message printed")
)
)`;

export async function deployToStacks(clarityCode: string) {
    const contractName = 'hello-stacks';

    const deployTx = await makeContractDeploy({
        contractName,
        codeBody: clarityCode,
        senderKey: '5ce02957bf820067e43ae0503b5547e90474242ba610c301ca8122baf593064b',
        network,
        anchorMode: AnchorMode.Any
    });

    const result = await broadcastTransaction(deployTx, network);

    if ((result as TxBroadcastResultOk).txid) {
        console.log('Transaction ID:', (result as TxBroadcastResultOk).txid);
    } else {
        console.log('Error:', (result as TxBroadcastResultRejected).error);
    }
}