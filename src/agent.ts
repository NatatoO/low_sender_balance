import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  createTransactionEvent,
  getJsonRpcUrl

} from 'forta-agent'
import Web3 from 'web3';


const abi = require('erc-20-abi')
const web3 = new Web3(getJsonRpcUrl())
const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  if (txEvent.to){
    const contract = new  web3.eth.Contract(abi,txEvent.to)
    let balance:number
    try {
      balance = await contract.methods.balanceOf(txEvent.from).call()
    } catch {
      balance = -1
    }
    if (balance <100 && balance!=-1){
      findings.push(
        Finding.fromObject({
          name: "Low sender balance",
          description: `Sender transfered all tokens`,
                alertId: "FORTA-300",
                severity: FindingSeverity.Info,
                type: FindingType.Info,
                metadata:{
                  balance:`${balance}`
                }
        
              })
             )

    }
  }
  // if (txEvent.transaction.to === PANCAKESWAP_FACTORY_ADDRESS){
  //   const decodedSig:iTxInput = abiDecoder.decodeMethod(txEvent.transaction.data);
  //   if (decodedSig.name ==="createPair"){
  //     findings.push(
  //       Finding.fromObject({
  //         name: "PancakeSwap pool created",
  //         description: `Created pull ${decodedSig.params[0].value}/${decodedSig.params[1].value}`,
  //         alertId: "FORTA-102",
  //         severity: FindingSeverity.Info,
  //         type: FindingType.Info,
  
  //       })
  //      )

  //   }
  // }    
    

  return findings;
}

export default {
  handleTransaction
}