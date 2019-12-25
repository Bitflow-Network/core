import { NodeService } from '../node/nodeService';
import { logger } from '../util/log';
import {BlockFound} from "../messages/message";
import math = require("mathjs");
import {Block} from "../blockchain/primitives/block";

export class Miner {
  constructor(nodeService: NodeService) {
    this.nodeService = nodeService;
  }

  private readonly nodeService: NodeService;

  searchForBlock() {
    const self = this;

    const template = this.nodeService.getBlockTemplate();
    let hash = '';
    let nonce = math.bignumber(0);

    const difficulty = this.nodeService.getDifficulty();

    do {
      nonce = nonce.plus(1);
      template.nonce = nonce;
      hash = template.calculateHash();
      logger.debug(`Tried Nonce (${nonce}): ${hash}`);
    } while (hash.substring(0, difficulty) !== new Array(difficulty + 1).join('0'));

    // while (
    //   hash.substring(0, difficulty) !== new Array(difficulty + 1).join('0')
    // ) {
    //   template.nonce = nonce;
    //   nonce = nonce.plus(1);
    //   hash = template.calculateHash();
    //   logger.debug(`Tried Nonce (${nonce}): ${hash}`);
    // }

    const newBlock = new Block(template.previousHash, template.timestamp, template.data, nonce);

    logger.info('BLOCK MINED: ', newBlock);
    self.nodeService.submitBlock(newBlock);
  }
}
