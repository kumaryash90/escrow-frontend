import React, { useContext } from 'react';
import { AccountContext } from '../../AccountContext';
import './header.css';

const Header = () => {
    const { currentAccount, setCurrentAccount } = useContext(AccountContext);
    return (
        <header className='header'>
            <div className='container header-container'>
                <nav className='nav'>
                    <h1>EscrowProject</h1>
                    <p>ACCOUNT:&nbsp;&nbsp;&nbsp;&nbsp;{currentAccount.substr(0,6)}...{currentAccount.substr(38)}</p>
                </nav>
            </div>
        </header>
    );
}

export default Header;