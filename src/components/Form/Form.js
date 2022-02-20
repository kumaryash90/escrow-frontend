import React, { useContext, useState } from 'react';
import { AccountContext } from '../../AccountContext';
import { createEscrow } from '../../actions/dashboard';
import './form.css';

const Form = (props) => {
    const { currentAccount } = useContext(AccountContext);
    const { escrowData, setEscrowData } = useContext(AccountContext);
    const { isMining, setIsMining } = useContext(AccountContext);
    const [formData, setFormData] = useState({
        beneficiary: "",
        arbiter: "",
        amount: ""
    });
    

    const handleSubmit = () => {
        setIsMining(true);
        const promise = new Promise(resolve => resolve(createEscrow({ ...formData, depositor: currentAccount })));
        promise.then(data => {
            const newArray = escrowData.map(item => item);
            newArray.push(data);
            console.log("new array: ", newArray);
            setEscrowData(newArray);
            console.log("updated escrow data: ", escrowData);
            setIsMining(false);
            clear();
        });
    }

    const clear = () => {
        setFormData({
            beneficiary: "",
            arbiter: "",
            amount: ""
        });
    }

    return (
        <div className='form'>
            <div className='container'>
                <div className='form-views'>
                    <div className='form-elements'>
                        <label className='form-label'>
                            Beneficiary:
                            <input type="text" className='form-input' placeholder='hex address' value={formData.beneficiary} onChange={e => setFormData({...formData, beneficiary: e.target.value})}/>
                        </label>
                        <label className='form-label'>
                            Arbiter:
                            <input type="text" className='form-input' placeholder='hex address' value={formData.arbiter} onChange={e => setFormData({...formData, arbiter: e.target.value})}/>
                        </label>
                        <label className='form-label'>
                            Amount:
                            <input type="text" className='form-input' placeholder='in ETH (min 0.01)' value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})}/>
                        </label>
                        <button className='form-btn-submit' onClick={handleSubmit}>Create</button>
                        <button className='form-btn-reset' onClick={clear}>Reset</button>
                    </div>
                    <div className={`form-overlay ${!currentAccount && 'form-overlay-visible'}`}>
                        <button className='form-btn-submit overlay-btn' onClick={props.connectWallet}>Connect Metamask Wallet</button>
                    </div>
                    <div className='info-section'>
                        <h1>About</h1>
                    </div>
                    <div className={`form-overlay ${isMining && 'form-overlay-visible'}`}>
                        <p className='overlay-status'>Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;