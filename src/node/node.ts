import {NodeService} from "./nodeService";
import {Blockchain} from "../primitives/blockchain";
import {Block} from "../primitives/block";
import moment = require("moment");

export class Node implements NodeService {
    constructor() {
        this.blockchain = new Blockchain();
    }

    blockchain: Blockchain;
    // mempool


    getBlockTemplate(): Block {
        // Pull data from mempool
        const latest = this.blockchain.getLatestBlock();
        const template = new Block(latest.hash, BigInt(moment().unix()), '', 0n);
        return template;
    }
}
