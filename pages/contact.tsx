import { Alert } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from 'emailjs-com';
import Head from 'next/head';
import React, { useState } from 'react';
import classNames from 'classnames';

import Loading from '../components/loading';
import styles from '../styles/contact.module.css';

interface IAlert {
  title: string;
  body: string;
  type: string;
};

interface IFormInput {
  name: string;
  email: string;
  message: string;
  phone: string;
};

const Contact = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [alertData, setAlertData] = useState<IAlert>({
    title: "",
    body: "",
    type: ""
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const templateParams = {
      from_name: data.name, 
      email: data.email, 
      phone: data.phone, 
      message: data.message 
    };
    setIsEmailSending(true);
    try {
      await emailjs.send("service_vxl4dav","template_0fy8w7q", templateParams, 'user_bjW4JVzeTgrgn6XrnBr7j');
      setIsEmailSending(false);
      setShowAlert(true);
      setAlertData({
        title: 'Success!',
        body: 'You have successfully sent us an email!',
        type: 'success'
      })
      
    } catch (err){
      setIsEmailSending(false);
      setShowAlert(true);
      setAlertData({
        title: 'Something has gone wrong.',
        body: 'Please try again soon!',
        type: 'danger'
      })
    }
  };
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
          <Alert show={showAlert} transition={true} variant={alertData.type} onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>{alertData.title}</Alert.Heading>
            <p className={styles.alertBody}>{alertData.body}</p>
          </Alert>
          {isEmailSending ? <Loading /> : (
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputWrapper}>
                <label htmlFor='name'>Name:</label>
                <input 
                  className={classNames({ [styles.inputError]: errors.name })}
                  id="name" {...register("name", { required: "required", maxLength: 20 })} 
                  placeholder="Name" 
                />
                {errors.name && <span className={styles.error} role="alert">{errors.name.message}</span>}
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor='email'>Email:</label>
                <input
                  className={classNames({ [styles.inputError]: errors.email })}
                  id="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format"
                    }
                  })}
                  type="email"
                  placeholder="Email"
                />
                {errors.email && <span className={styles.error} role="alert">{errors.email.message}</span>}
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor='phone'>Phone:</label>
                <input 
                  className={classNames({ [styles.inputError]: errors.phone })}
                  id="phone" 
                  type='tel' 
                  placeholder="Phone"
                  {...register("phone", { required: "required", maxLength: 20 })} 
                />
                {errors.phone && <span className={styles.error} role="alert">{errors.phone.message}</span>}
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="message">Message:</label>
                <textarea 
                  {...register("message", { required: "required", maxLength: 20 })} 
                  className={classNames({ [styles.inputError]: errors.message })}
                  id="message" 
                  rows={4} 
                  placeholder="Let us know what you need help with..." 
                />
                {errors.message && <span className={styles.error} role="alert">{errors.message.message}</span>}
              </div>
              <button className={styles.submit} type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    </>
)};

export default Contact;
