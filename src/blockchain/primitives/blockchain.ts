import { Block } from './block';
import * as moment from 'moment';
import math = require("mathjs");
import {ConsensusRules} from "../consensus/consensusRules";
import {ConsensusRulesImpl} from "../consensus/consensusRulesImpl";

export class Blockchain {
  constructor() {
    this.chain = [Blockchain.createGenesisBlock()];
    this.consensusRules = new ConsensusRulesImpl();
  }

  private readonly consensusRules: ConsensusRules;
  chain: Block[];

  static createGenesisBlock() {
    return new Block('', moment().valueOf(), 'Genesis block', math.bignumber(0));
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  isBlockValid(block: Block) {
    return this.consensusRules.isBlockValid(block, this.getLatestBlock());
  };
}
