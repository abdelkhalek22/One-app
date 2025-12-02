import React from 'react';
import logo from '../assets/logo.jpg';

const PrintOptionsScreen = ({ onSelectOption, onBack }) => {
  return (
    <div className="selection-screen">
      <nav className="navbar">
        <div className="nav-brand">
          <img src={logo} alt="One Store Logo" className="nav-logo" />
          <span className="brand-name">One Store</span>
        </div>
        <div className="nav-controls">
          <button onClick={onBack} className="back-btn">← عودة</button>
        </div>
      </nav>

      <div className="selection-content container">
        <h2 className="section-title">اختر نوع الطباعة</h2>

        <div className="cards-container">
          <div className="selection-card" onClick={() => onSelectOption('paper-print')}>
            <div className="card-icon">📄</div>
            <h3>طباعة ورقية</h3>
            <p>طباعة المستندات، المذكرات، والملفات الشخصية</p>
            <span className="card-arrow">←</span>
          </div>

          <div className="selection-card" onClick={() => onSelectOption('advanced-print')}>
            <div className="card-icon">🎨</div>
            <h3>طباعة متقدمة</h3>
            <p>استيكر، كروت شخصية، شهادات، كارنيهات</p>
            <span className="card-arrow">←</span>
          </div>
        </div>
      </div>

      <style>{`
        .selection-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
          display: flex;
          flex-direction: column;
        }

        .navbar {
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-logo {
          height: 40px;
          border-radius: 8px;
        }

        .brand-name {
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--color-brand-black);
          letter-spacing: 1px;
        }

        .back-btn {
          background: white;
          border: 1px solid #eee;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: bold;
          transition: all 0.2s;
        }
        .back-btn:hover { background: #f5f5f5; }

        .selection-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-bottom: 4rem;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--color-brand-black);
          font-weight: 800;
        }

        .cards-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .selection-card {
          background: white;
          padding: 3rem;
          border-radius: 24px;
          width: 350px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }

        .selection-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(211, 47, 47, 0.1);
          border-color: rgba(211, 47, 47, 0.1);
        }

        .card-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }

        .selection-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-brand-black);
        }

        .selection-card p {
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .card-arrow {
          display: inline-block;
          font-size: 1.5rem;
          color: var(--color-brand-red);
          transition: transform 0.3s ease;
        }

        .selection-card:hover .card-arrow {
          transform: translateX(-5px);
        }
      `}</style>
    </div>
  );
};

export default PrintOptionsScreen;
