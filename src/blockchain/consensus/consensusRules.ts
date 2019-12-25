import {Block} from "../primitives/block";

export interface ConsensusRules {
    isBlockValid(newBlock: Block, previousBlock: Block): boolean;
}
