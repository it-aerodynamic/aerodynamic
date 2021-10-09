import React, { useState } from 'react';
import Head from 'next/head';
import emailjs from 'emailjs-com';

import styles from '../styles/contact.module.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const templateParams = { 
      from_name: name, 
      email, 
      phone, 
      message 
    };
  };

  return (
    <>
      <Head>
        <title>Contact us - Aerodynamic</title>
        <meta name="description" content="This is the page description" />
      </Head>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContainer}>
          <h1>Contact support</h1>
          <ul className={styles.contactDetails}>
            <li><strong>AERODYNAMIC PTY LTD</strong></li>
            <li>+61 3 8331 2900</li>
            <li>31 McGregors Drive</li>
            <li>Keilor Park VIC 3042 </li>
            <li>AUSTRALIA</li>
          </ul>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input 
              id='name'
              name='name'
              type='text' 
              placeholder='Name'
              onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)} 
            />
             <label htmlFor='email'>Email:</label>
            <input 
              id='email'
              name='email'
              type='email' 
              placeholder='Email' 
              onChange={(event: React.FormEvent<HTMLInputElement>) => setEmail(event.currentTarget.value)} 
            />
             <label htmlFor='phone'>Phone:</label>
            <input 
              id='phone'
              name='phone'
              type='tel' 
              placeholder='Phone'
              onChange={(event: React.FormEvent<HTMLInputElement>) => setPhone(event.currentTarget.value)} 
            />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              rows={4}
              onChange={( event: React.ChangeEvent<HTMLTextAreaElement>): void => setMessage(event.target.value)}
              placeholder="Let us know what you need help with..."
            />
            <button className={styles.submit} type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
)};

export default Contact;
