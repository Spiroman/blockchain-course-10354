// import { Blockchain, Block } from './Blockchain.js';
const {Blockchain, Block} = require('./Blockchain2.js')

let spiroCoin = new Blockchain()

spiroCoin.addBlock(new Block(1, '12/11/2020', {amount:4}))
spiroCoin.addBlock(new Block(2, '12/11/2020', {amount:8}))


console.log('Blockchain valid: ' + spiroCoin.isChainValid())
// console.log(JSON.stringify(spiroCoin, null, 4));