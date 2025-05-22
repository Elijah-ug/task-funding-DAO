import React from 'react';
import ConnectWallet from './ConnectWallet';
import TaskForm from './TaskForm';
import TasksList from './TasksList';
import WalletProvider from './WalletProvider';

const Container = () => {
    return (
        <div className='text-center'>
            <ConnectWallet />
            <TaskForm />
            <TasksList />
            <WalletProvider/>
        </div>
    );
}

export default Container;
