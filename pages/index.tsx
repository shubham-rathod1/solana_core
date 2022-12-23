import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import AddressForm from '../components/AddressForm';
import * as Web3 from '@solana/web3.js';

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [isExecutable, setisExecutable] = useState<boolean | undefined>(false);

  // const [connection, setConnection] = useState<{}>({});

  const addressSubmittedHandler = async (address: string) => {
    try {
      setAddress(address);
      const key = new Web3.PublicKey(address);
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
      const bal = await connection.getBalance(key);
      const result = await connection.getAccountInfo(key);
      const exe = result?.executable;
      setisExecutable(exe);
      console.log(isExecutable);
      setBalance(bal / Web3.LAMPORTS_PER_SOL);
    } catch (error) {
      setAddress('');
      setBalance(0);
      alert(error);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>Start Your Solana Journey</p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        {`is Executable? ${isExecutable ? 'yes' : 'Nope'}`}
      </header>
      {/* <footer> */}
      {/* </footer> */}
    </div>
  );
};

export default Home;
