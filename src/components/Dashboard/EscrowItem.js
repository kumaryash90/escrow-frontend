import React, { useContext, useEffect } from 'react';
import './escrowItem.css'
import { AccountContext } from '../../AccountContext';

const EscrowItem = (props) => {
    const { escrowData } = useContext(AccountContext);
    
    useEffect(() => {

    }, [escrowData]);

    return (
        <div className='escrow-item'>
            <div className='escrow-headline'>
                <p>Escrow ID: {props.id}</p>
                <p>Amount: {props.amount / (10 ** 18)} eth</p>
                {props.isActive 
                ? (!props.isApproved && !props.isUnlocked ? <p>Approval pending</p> : ((props.isApproved && <p>Payment approved</p>) || (props.isUnlocked && <p>Payment cancelled -- Amount unlocked</p>)))
                : (props.isApproved && <p>Payment completed</p>) || (props.isUnlocked && <p>Payment was cancelled</p>) }
            </div>

            <div className='escrow-members'>
                {(!props.user || (props.user !== "depositor")) && <p>Depositor:&nbsp;&nbsp;&nbsp;&nbsp;{props.depositor.substr(0,6)}...{props.depositor.substr(38)}</p>}
                {(!props.user || props.user !== "beneficiary") && <p>Beneficiary:&nbsp;&nbsp;&nbsp;&nbsp;{props.beneficiary.substr(0,6)}...{props.beneficiary.substr(38)}</p>}
                {(!props.user || props.user !== "arbiter") && <p>Arbiter:&nbsp;&nbsp;&nbsp;&nbsp;{props.arbiter.substr(0,6)}...{props.arbiter.substr(38)}</p>}
            </div>

            <div className='escrow-btns'>
                {props.user === "arbiter" && !props.isUnlocked && !props.isApproved && 
                    <button className='escrow-item-btn' value={props.id} onClick={props.handleApprove}>Approve</button>
                }
                {props.user === "arbiter" && props.isActive && !props.isUnlocked && !props.isApproved && 
                    <button className='escrow-item-btn' value={props.id} onClick={props.handleUnlock}>Unlock</button>
                }
                {props.user === "depositor" && props.isActive && props.isUnlocked &&
                    <button className='escrow-item-btn' value={props.id} onClick={props.handleWithdrawDepositor}>Withdraw</button>
                }
                {props.user === "beneficiary" && props.isActive && props.isApproved &&
                    <button className='escrow-item-btn' value={props.id} onClick={props.handleWithdrawBeneficiary}>Withdraw</button>
                }
            </div>
        </div>     
    );
}

export default EscrowItem;