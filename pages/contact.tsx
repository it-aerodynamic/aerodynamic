import { startCase } from 'lodash/fp';
import React, { useState } from 'react';
import Head from 'next/head';

import styles from '../styles/contact.module.css';

const formFields = [
  { type: 'text', name: "name" },
  { type: 'email', name: "email" },
  { type: 'tel', name: "phone" },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const data = { name, email, message };
    const rawData = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data)});
    const formData = await rawData.json();    
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
          <form onSubmit={handleSubmit} className={styles.form}>
            {formFields.map(({ type, name }) => {
              return (
                <React.Fragment key={name}>
                  <label htmlFor={name}>{startCase(name)}:</label>
                  <input 
                    id={name} 
                    type={type} 
                    placeholder={startCase(name)} 
                    onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)} 
                  />
                </React.Fragment>
              );
            })}

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
