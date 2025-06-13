import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroBanner.module.css';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className={styles.heroBanner}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Steakz</h1>
        <p className={styles.tagline}>A Cut Above the Rest</p>
        <button
          type="button"
          className={styles.reserveBtn}
          onClick={() => navigate('/reservations')}
          aria-label="Reserve Now"
        >
          Reserve Now
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
