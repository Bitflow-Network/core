import {Block} from "../blockchain/primitives/block";

export class Message {
}

export class BlockFound extends Message {
    constructor(block: Block) {
        super();
        this.block = block;
    }

    readonly block: Block;

    toJSON() {
        return {
            type: 'BlockFound',
            block: this.block
        }
    }
}
