import {NodeService} from "../node/nodeService";

export class Miner {
    constructor(nodeService: NodeService) {
        this.nodeService = nodeService;
    }

    nodeService: NodeService;

    searchForBlock(difficulty: number) {
        const template = this.nodeService.getBlockTemplate();
        let hash = '';
        let nonce = 0n;

        while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            template.nonce  = nonce;
            nonce += 1n;
            hash = template.calculateHash();
            console.log(`Tried Nonce (${nonce}): ${hash}`);
        }

        console.log("BLOCK MINED: ", template);
    }
}
