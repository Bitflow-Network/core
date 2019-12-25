import { SHA256 } from 'crypto-js';
import { Miner } from './mining/miner';
import { Node } from './node/node';
import { logger } from './util/log';

logger.info('Starting Node');
const node = new Node();

const p = (async () => {
  await node.start();
})();

const mine = true;
if (mine) {
  logger.info('Starting Miner');
  const miner = new Miner(node);

  logger.info('Beginning Mining');
  miner.searchForBlock();
}
