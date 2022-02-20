import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../AccountContext';
import { approvePayment, unlockPayment, withdrawDepositor, withdrawBeneficiary } from '../../actions/dashboard';
import './dashboard.css';
import EscrowItem from './EscrowItem';

const Dashboard = () => {
    const { currentAccount } = useContext(AccountContext);
    const { escrowData, setEscrowData } = useContext(AccountContext);
    const { isMining, setIsMining } = useContext(AccountContext);
    const [user, setUser] = useState("");
    const [displayData, setDisplayData] = useState([]);

    const updateDisplay = (value) => {
        if(value === "all") {
            setUser("");
            setDisplayData([...escrowData]);
        } else if(value === "depositor") {
            const data = escrowData.filter(item => item.depositor === currentAccount);
            setDisplayData(data);
            setUser("depositor");
        } else if(value === "beneficiary") {
            const data = escrowData.filter(item => item.beneficiary === currentAccount);
            setDisplayData(data);
            setUser("beneficiary");
        } else if(value === "arbiter") {
            const data = escrowData.filter(item => item.arbiter === currentAccount);
            setDisplayData(data);
            setUser("arbiter");
        }
    }

    const handleClick = (e) => {
        const value = e.target.value;
        updateDisplay(value);
    }

    const handleApprove = (e) => {
        setIsMining(true);
        const id = e.target.value;
        const promise = new Promise(resolve => resolve(approvePayment(id)));
        promise.then(data => {
            const newArray = data.map(item => item);
            console.log("new array: ", newArray);
            setUser("arbiter");
            setIsMining(false);
            setEscrowData(newArray);
        });
    }

    const handleUnlock = (e) => {
        setIsMining(true);
        const id = e.target.value;
        const promise = new Promise(resolve => resolve(unlockPayment(id)));
        promise.then(data => {
            const newArray = data.map(item => item);
            console.log("new array: ", newArray);
            setUser("arbiter");
            setIsMining(false);
            setEscrowData(newArray);
        });
    }

    const handleWithdrawDepositor = async (e) => {
        const id = e.target.value;
        setIsMining(true);
        const promise = new Promise(resolve => resolve(withdrawDepositor(id)));
        promise.then(data => {
            const newArray = data.map(item => item);
            console.log("new array: ", newArray);
            setUser("depositor");
            setIsMining(false);
            setEscrowData(newArray);
        });
    }

    const handleWithdrawBeneficiary = async (e) => {
        setIsMining(true);
        const id = e.target.value;
        console.log(id);
        const promise = new Promise(resolve => resolve(withdrawBeneficiary(id)));
        promise.then(data => {
            const newArray = data.map(item => item);
            console.log("new array: ", newArray);
            setUser("beneficiary");
            setIsMining(false);
            setEscrowData(newArray);
        });
    }

    useEffect(() => {
            setDisplayData([...escrowData]);
    }, [escrowData]);

    return (
        <div className='dashboard'>
            <div className='container'>
                <div className='dashboard-views'>
                    <ul className='dashboard-options'>
                        <li className='option-item'>
                            <button className='option-btn' autoFocus={user===""} value='all' onClick={handleClick}>View All</button>
                        </li>
                        <li className='option-item'>
                            <button className='option-btn' autoFocus={user==="depositor"} value='depositor' onClick={handleClick}>Depositor Dashboard</button>
                        </li>
                        <li className='option-item'>
                            <button className='option-btn' autoFocus={user==="beneficiary"} value='beneficiary' onClick={handleClick}>Beneficiary Dashboard</button>
                        </li>
                        <li className='option-item'>
                            <button className='option-btn' autoFocus={user==="arbiter"} value='arbiter' onClick={handleClick}>Arbiter Dashboard</button>
                        </li>
                    </ul>
                    <div className='dashboard-content'>
                        {displayData.map((item) => {
                            return <EscrowItem 
                                        user = {user}
                                        account = {currentAccount}
                                        id = {item.id}
                                        depositor = {item.depositor}
                                        beneficiary = {item.beneficiary}
                                        arbiter = {item.arbiter}
                                        amount = {item.amount}
                                        isUnlocked = {item.isUnlocked}
                                        isApproved = {item.isApproved}
                                        isActive = {item.isActive}
                                        handleApprove = {handleApprove}
                                        handleUnlock = {handleUnlock}
                                        handleWithdrawDepositor = {handleWithdrawDepositor}
                                        handleWithdrawBeneficiary = {handleWithdrawBeneficiary}
                                    />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;