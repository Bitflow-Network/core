import { SHA256 } from 'crypto-js'
import {Node} from "./node/node";
import {Miner} from "./mining/miner";

console.log("Starting Node");
const node = new Node();

console.log("Starting Miner");
const miner = new Miner(node);

console.log("Beginning Mining");
miner.searchForBlock(6);
