// import { Blockchain, Block } from './Blockchain.js';
const {Blockchain, Block, Transaction} = require('./Blockchain3.js')

let spiroCoin = new Blockchain()

spiroCoin.createTransaction(new Transaction('address1', 'address2', 100))
spiroCoin.createTransaction(new Transaction('address2', 'address1', 50))

console.log('Starting mining');

spiroCoin.minePendingTransaction('Bob')
console.log('Balance of Bob: ', spiroCoin.getBalanceOfAddress('Bob'));

spiroCoin.createTransaction(new Transaction('Bob', 'address1', 50))

spiroCoin.minePendingTransaction('Bob')
console.log('Balance of Bob: ', spiroCoin.getBalanceOfAddress('Bob'));