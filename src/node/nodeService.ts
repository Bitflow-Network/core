import {Message} from "../messages/message";
import {Block} from "../blockchain/primitives/block";

export interface NodeService {
  getBlockTemplate(): Block;
  getDifficulty(): number;

  submitBlock(block: Block): Promise<void>;
}
