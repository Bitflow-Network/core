import { SHA256 } from 'crypto-js';
import {BigNumber} from "mathjs";

export class Block {
  constructor(
    previousHash: string,
    timestamp: number,
    data: string,
    nonce: BigNumber
  ) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.nonce = nonce;

    this.hash = this.calculateHash();
  }

  readonly previousHash: string;
  readonly timestamp: number;
  readonly data: string;
  readonly hash: string;

  nonce: BigNumber;

  calculateHash() {
    return SHA256(
      this.previousHash + this.timestamp + this.data + this.nonce
    ).toString();
  }
}
