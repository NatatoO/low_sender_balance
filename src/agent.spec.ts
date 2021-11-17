import {
    createTransactionEvent,
    HandleBlock,
    HandleTransaction
  } from "forta-agent"
  import agent from "./agent"
  
  describe("transaction created agent", () => {
    let handleTransaction: HandleTransaction
  
    const createTxEventToContract= () => createTransactionEvent({
      transaction:{
        hash:"0xb48ff57326966812864ddfbf57e9a5540d334d9f6e7c42804b44bd1d37b63199",
        to:"0x12BB890508c125661E03b09EC06E404bc9289040",
        from:"0xb63021b9d60cc1f9e0acbff066ca6c9d1a57d31d",
        nonce:1,
        gas:"",
        gasPrice:"",
        value:"",
        data:"0xc9c65396000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d56000000000000000000000000549cc5df432cdbaebc8b9158a6bdfe1cbd0ba16d",
        r:"",
        s:"",
        v:""

        
      },
      type:undefined,
      network:undefined,
      receipt: {
        status:true,
        root:"",
        gasUsed:"",
        cumulativeGasUsed:"",
        logsBloom:"",
        logs:{} as any,
        contractAddress:"0x5d2BF248A2a31Da2bdC8FD0b0B6c3ceE71f7175A",
        blockHash:"",
        blockNumber:1,
        transactionHash:"",
        transactionIndex:1

      },
      block:{}as any


    })
  
    beforeAll(() => {
      handleTransaction = agent.handleTransaction
    })
  
    describe("token event", () => {
      it("findings length == 1", async () => {
        const txEvent = createTxEventToContract()
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(1)
      })
  
    })
  })