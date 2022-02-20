import { ethers } from "ethers";
import artifact from "../artifacts/Escrow.json";

//const ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ADDRESS = '0x2ABf435ADA1b070B324311aE8849181cB2B86Bdc';
let provider;

const syncData = async () => {
    try {
        const escrowData = [];
        const { ethereum } = window;
        if(!ethereum) {
            alert("no ethereum object found.. please install metamask");
            return;
        } 
        provider = new ethers.providers.Web3Provider(ethereum);
        const escrow = new ethers.Contract(ADDRESS, artifact.abi, provider);
    
        const id = (await escrow.id()).toNumber()
        console.log("balance of escrow: ", (await provider.getBalance(escrow.address)).toString());
    
            for(let i = escrowData.length; i < id; i++) {
                const payment = await escrow.payments(i);
                const paymentObj = {
                    id: i,
                    amount: payment[0].toString(),
                    arbiter: payment[1].toLowerCase(),
                    depositor: payment[2].toLowerCase(),
                    beneficiary: payment[3].toLowerCase(),
                    isApproved: payment[4],
                    isUnlocked: payment[5],
                    isActive: payment[6],
                }
                escrowData.push(paymentObj);
            }
            return escrowData;
    } catch (error) {
        if(!window.ethereum) {
            alert("please install metamask");
        } else if(window.ethereum.network !== "4") {
            alert("please connect on rinkeby");
        } else {
            console.log(error);
        }
        return;
    }
}

export const getEscrowData = async () => {
    try {
        const data = await syncData();
        return data;
    } catch (error) {
        
    }
}

export const createEscrow = async (formData) => {
    try {
        const { ethereum } = window; 
        if(ethereum) {
            const signer = provider.getSigner();
            const escrowContract = new ethers.Contract(ADDRESS, artifact.abi, signer);
    
            let tx = await escrowContract.createPayment(formData.arbiter, formData.beneficiary, {
                value: ethers.utils.parseEther(formData.amount)
            });
            await tx.wait();
            console.log("txn: ", tx.hash);
    
            const id = await escrowContract.id();
            console.log("id count: ",id.toString());
            const data = await syncData();
            return data[id.toNumber() - 1];
        }
    } catch (error) {
        
    }
}

export const approvePayment = async (id) => {
    try {
        const signer = provider.getSigner();
        const escrowContract = new ethers.Contract(ADDRESS, artifact.abi, signer);
    
        let tx = await escrowContract.approvePayment(id);
        await tx.wait();
        console.log("txn: ", tx.hash);
        const data = await syncData();
        return data;
    } catch (error) {
        
    }
}

export const unlockPayment = async (id) => {
    try {
        const signer = provider.getSigner();
        const escrowContract = new ethers.Contract(ADDRESS, artifact.abi, signer);
    
        let tx = await escrowContract.unlockPayment(id);
        await tx.wait();
        console.log("txn: ", tx.hash);
        const data = await syncData();
        return data;
    } catch (error) {
        
    }
}

export const withdrawDepositor = async (id) => {
    try {
        const signer = provider.getSigner();
        const escrowContract = new ethers.Contract(ADDRESS, artifact.abi, signer);
    
        let tx = await escrowContract.withdrawDepositor(id);
        await tx.wait();
        console.log("txn: ", tx.hash);
        const data = await syncData();
        return data;
    } catch (error) {
        
    }
}

export const withdrawBeneficiary = async (id) => {
    try {
        const signer = provider.getSigner();
        const escrowContract = new ethers.Contract(ADDRESS, artifact.abi, signer);
    
        let tx = await escrowContract.withdrawBeneficiary(id);
        await tx.wait();
        console.log("txn: ", tx.hash);
        const data = await syncData();
        return data;
    } catch (error) {
    
    }
}