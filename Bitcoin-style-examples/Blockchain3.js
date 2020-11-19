const SHA256 = require('crypto-js/sha256')

class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}

class Block{
    constructor(timestamp, transactions, previousHash=''){
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        return SHA256(
            this.timestamp + 
            JSON.stringify(this.transaction) +
            this.previousHash + 
            this.nonce).toString()
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join('0')){
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log('Block mined ' + this.hash)
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4
        this.pendingTransactions = []
        this.miningReward = 90
    }

    createGenesisBlock(){
        return new Block('01/01/2009', 'Genesis Block', 0)
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }

    minePendingTransaction(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward)
        this.pendingTransactions.push(rewardTx)

        let block = new Block (Date.now(), this.pendingTransactions, this.getLatestBlock().hash)
        block.mineBlock(this.difficulty)

        console.log('Block successfully mined')

        this.chain.push(block)
        this.pendingTransactions=[]
        
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address){
        let balance = 0
        for(const block of this.chain){
            for(const transaction of block.transactions){
                if(transaction.toAddress === address){
                    balance += transaction.amount                    
                }
                if (transaction.fromAddress === address){
                    balance -= transaction.amount                
                }
            }
        }
        return balance
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]
            
            if(currentBlock.hash !== currentBlock.calculateHash() ||
            currentBlock.previousHash !== previousBlock.hash){
                return false
            }
            return true
        }
    }
}

module.exports.Blockchain = Blockchain
module.exports.Block = Block
module.exports.Transaction = Transaction