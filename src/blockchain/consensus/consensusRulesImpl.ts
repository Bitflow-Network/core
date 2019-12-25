import {ConsensusRules} from "./consensusRules";
import {Block} from "../primitives/block";

export class ConsensusRulesImpl implements ConsensusRules {
    isBlockValid(newBlock: Block, previousBlock: Block): boolean {
        return false;
    }
}
