import { NodeService } from './nodeService';
import moment = require('moment');
import { P2PServer } from '../p2p/p2pServer';
import {BlockFound, Message} from "../messages/message";
import math = require("mathjs");
import {ConsensusError} from "../models/errors/consensusError";
import {Blockchain} from "../blockchain/primitives/blockchain";
import {Block} from "../blockchain/primitives/block";

export class Node implements NodeService {
  constructor() {
    this.blockchain = new Blockchain();
    this.p2p = new P2PServer();
  }

  readonly blockchain: Blockchain;
  readonly p2p: P2PServer;



  getDifficulty() {
    return 3;
  }

  async start() {
    return this.p2p.start();
  }

  // mempool

  getBlockTemplate(): Block {
    // Pull data from mempool
    const latest = this.blockchain.getLatestBlock();
    const template = new Block(latest.hash, moment().valueOf(), '', math.bignumber(0));
    return template;
  }

  private sendMessage(message: Message): Promise<void> {
    return this.p2p.sendMessage(message);
  }

  async submitBlock(block: Block): Promise<void> {
    // Run through consensus
    const isNewBlockValid = this.blockchain.isBlockValid(block);

    if(isNewBlockValid) {
      await this.sendMessage(new BlockFound(block));
    } else {
      throw new ConsensusError("Block invalid");
    }
  }
}
