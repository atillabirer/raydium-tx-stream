import { Connection, PublicKey, VersionedTransaction } from "@solana/web3.js";
import WebSocket from "ws";
import {SolanaParser} from "@debridge-finance/solana-transaction-parser";
import {BorshCoder, Idl} from "@project-serum/anchor";
import IDL from "./idl.json";
import {decode,encode} from "bs58";
//combine the output from AMM, CLMM, and Jupiter
//parse swap, create, remove, transfer calls accurately (show all AMM keys too)

async function main() {

  const wsClient = new WebSocket(
    "wss://methodical-long-dust.solana-mainnet.quiknode.pro/870f16040a2c16cfd4b5217a6d6e0f28fc1a6438/"
  );
  const connection = new Connection("https://methodical-long-dust.solana-mainnet.quiknode.pro/870f16040a2c16cfd4b5217a6d6e0f28fc1a6438/");

  connection.onLogs(new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"),async (logs,ctx) => {
    console.log(logs);

  })

  wsClient.onopen = async function (ev) {
    const subscribeMsg = {
      id: 1,
      jsonrpc: "2.0",
      method: "blockSubscribe",
      params: [
        {
          mentionsAccountOrProgram:
            "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
            
        },
        {
            maxSupportedTransactionVersion: 0,
        }
      ],
    };

    wsClient.send(JSON.stringify(subscribeMsg));
  };

//   wsClient.onmessage = async function (ev) {
//     const msg = JSON.parse(ev.data.toString());

//     const transactions = msg.params?.result?.value?.block?.transactions;
//     if(transactions) {

//         for(const transaction   of transactions) {
//             //console.log(transaction);
//             const decoded = Buffer.from(transaction.transaction[0],"base64");

//             const vsTx = VersionedTransaction.deserialize(decoded);
//             //console.log(vsTx.signatures);
            
//            try {
//             for(const compiledInstruction of vsTx.message.compiledInstructions) {
//                 const coder = new BorshCoder(IDL as Idl);
//                 console.log(coder.instruction.decode(Buffer.from(compiledInstruction.data),"base58"))
                
//                 // get ammId and read it
//                const ammId = vsTx.message.getAccountKeys({accountKeysFromLookups: transaction.meta.loadedAddresses});
//                console.log(ammId);


//             }
//            } catch (error) {
//             console.log(error)
//             continue;
//            }
//         }
    
//     }
//   };
}

main().then((v) => console.log(v)).catch((error) => console.log(error));
