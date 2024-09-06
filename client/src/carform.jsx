import React, { useState } from 'react';
import styles from './CarForm.module.css';

const CarForm = () => {
  const [carInfo, setCarInfo] = useState({
    make: '',
    model: '',
    year: '',
    issue: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Car Information Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="make">Make:</label>
          <input
            type="text"
            id="make"
            name="make"
            value={carInfo.make}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={carInfo.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={carInfo.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="issue">What's wrong with the car?</label>
          <textarea
            id="issue"
            name="issue"
            value={carInfo.issue}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {submitted && (
        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Car Issue Summary</h3>
          <p>Make: {carInfo.make}</p>
          <p>Model: {carInfo.model}</p>
          <p>Year: {carInfo.year}</p>
          <p>Issue: {carInfo.issue}</p>
        </div>
      )}
    </div>
  );
};

export default CarForm;
