import {Block} from "../primitives/block";

export interface NodeService {
    getBlockTemplate(): Block;
}
