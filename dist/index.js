"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const ws_1 = __importDefault(require("ws"));
//combine the output from AMM, CLMM, and Jupiter
//parse swap, create, remove, transfer calls accurately (show all AMM keys too)
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const wsClient = new ws_1.default("wss://methodical-long-dust.solana-mainnet.quiknode.pro/870f16040a2c16cfd4b5217a6d6e0f28fc1a6438/");
        const connection = new web3_js_1.Connection("https://methodical-long-dust.solana-mainnet.quiknode.pro/870f16040a2c16cfd4b5217a6d6e0f28fc1a6438/");
        connection.onLogs(new web3_js_1.PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"), (logs, ctx) => __awaiter(this, void 0, void 0, function* () {
            console.log(logs);
        }));
        //   wsClient.onopen = async function (ev) {
        //     const subscribeMsg = {
        //       id: 1,
        //       jsonrpc: "2.0",
        //       method: "blockSubscribe",
        //       params: [
        //         {
        //           mentionsAccountOrProgram:
        //             "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
        //         },
        //         {
        //             maxSupportedTransactionVersion: 0,
        //         }
        //       ],
        //     };
        //     wsClient.send(JSON.stringify(subscribeMsg));
        //   };
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
    });
}
main().then((v) => console.log(v)).catch((error) => console.log(error));
