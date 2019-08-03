import {SHA256} from "crypto-js";

export class Block {
    constructor(previousHash: string, timestamp: BigInt, data: string, nonce: BigInt) {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = nonce;

        this.hash = this.calculateHash();
    }

    readonly previousHash: string;
    readonly timestamp: BigInt;
    readonly data: string;
    readonly hash: string;

    nonce: BigInt;

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }
}
