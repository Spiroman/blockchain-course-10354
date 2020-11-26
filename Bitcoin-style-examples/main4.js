const {Blockchain, Block, Transaction} = require('./Blockchain4.js')
const EC = require('elliptic').ec

const ec = new EC('secp256k1')

const myKey = ec.keyFromPrivate('a81cc68bc79cfb9d140fa67e05f1ac94e8ba66166cf790e3ef0d40c4a3b895a4')

const myWalletAddress = myKey.getPublic('hex')

let spiroCoin = new Blockchain()

const tx1 = new Transaction(myWalletAddress, 'address2', 30)
tx1.signTransaction(myKey)
spiroCoin.addTransaction(tx1)

spiroCoin.minePendingTransaction(myWalletAddress)

const tx2 = new Transaction(myWalletAddress, 'address1', 20)
tx2.signTransaction(myKey)
spiroCoin.addTransaction(tx2)

spiroCoin.minePendingTransaction(myWalletAddress)

console.log('My wallet balance: ' + spiroCoin.getBalanceOfAddress(myWalletAddress))