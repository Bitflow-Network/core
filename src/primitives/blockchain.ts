import {Block} from "./block";
import * as moment from "moment";

export class Blockchain {
    constructor() {
        this.chain = [Blockchain.createGenesisBlock()];
    }

    chain: Block[];

    static createGenesisBlock() {
        return new Block("", BigInt(moment().unix()), "Genesis block", 0n);
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1]
    }

}
