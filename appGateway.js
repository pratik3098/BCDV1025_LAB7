'use strict'
const { Gateway } = require('fabric-network')
const utils=require("./utils.js")
const orgId='Org1'

module.exports=async function(){
   
    const ccp = utils.buildCCPOrg(orgId); 
    console.log(ccp)


    const wallet = await utils.buildWallet(); 

    

}


console.log(module.exports())