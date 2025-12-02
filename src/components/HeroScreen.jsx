import React from 'react';
import logo from '../assets/logo.jpg';
import heroIllustration from '../assets/hero-illustration.jpg';

const HeroScreen = ({ onStart }) => {
  return (
    <div className="hero-screen">
      <nav className="navbar">
        <div className="nav-brand">
          <img src={logo} alt="One Store Logo" className="nav-logo" />
        </div>
        <div className="nav-caption">ALL IN ONE</div>
        <div className="nav-spacer"></div>
      </nav>

      <div className="hero-content container">
        <div className="text-section">
          <h1 className="main-title">
            حلولكم الشاملة <br />
            <span className="highlight">للموارد التعليمية</span>
          </h1>

          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">💎</span>
              <span className="feature-text">اسعار تنافسية</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <span className="feature-text">تشكيلة واسعة من الكتب</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🖨️</span>
              <span className="feature-text">طباعات متنوعة و متقدمة</span>
            </div>
          </div>

          <button onClick={onStart} className="start-button">
            ابدأ التصفح
            <span className="arrow">←</span>
          </button>
        </div>

        <div className="image-section">
          <div className="image-wrapper">
            <img src={heroIllustration} alt="Education Concept" className="hero-image" />
            <div className="floating-card card-1">
              <span>⚡ سرعة في الأداء</span>
            </div>
            <div className="floating-card card-2">
              <span>✅ جودة عالية</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-screen {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .navbar {
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-brand, .nav-spacer {
          flex: 1;
        }

        .nav-logo {
          height: 50px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .nav-caption {
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: 2px;
          color: var(--color-brand-black);
          text-transform: uppercase;
          text-align: center;
          flex: 2;
        }

        .hero-content {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
          padding-bottom: 2rem;
        }

        .text-section {
          text-align: right;
          z-index: 10;
        }

        .main-title {
          font-size: 3.5rem;
          line-height: 1.2;
          font-weight: 800;
          color: var(--color-brand-black);
          margin-bottom: 2.5rem;
        }

        .highlight {
          color: var(--color-brand-red);
          position: relative;
          display: inline-block;
        }
        
        .highlight::after {
          content: '';
          position: absolute;
          bottom: 5px;
          right: 0;
          width: 100%;
          height: 15px;
          background: rgba(211, 47, 47, 0.1);
          z-index: -1;
          border-radius: 4px;
        }

        .features-grid {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .feature-item {
          background: white;
          padding: 0.8rem 1.2rem;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.3s ease;
          border: 1px solid rgba(0,0,0,0.03);
        }

        .feature-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .feature-icon {
          font-size: 1.2rem;
        }

        .feature-text {
          font-weight: 700;
          color: var(--color-text-primary);
          font-size: 0.95rem;
        }

        .start-button {
          background: var(--color-brand-red);
          color: white;
          padding: 1.2rem 3rem;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          box-shadow: 0 10px 25px rgba(211, 47, 47, 0.3);
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .start-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 35px rgba(211, 47, 47, 0.4);
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .start-button:hover .arrow {
          transform: translateX(-5px);
        }

        .image-section {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          max-width: 600px;
        }

        .hero-image {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
          animation: float 6s ease-in-out infinite;
        }

        .floating-card {
          position: absolute;
          background: white;
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-brand-black);
          animation: float 5s ease-in-out infinite;
          z-index: 2;
        }

        .card-1 {
          top: 20%;
          right: -20px;
          animation-delay: 1s;
        }

        .card-2 {
          bottom: 20%;
          left: -20px;
          animation-delay: 2s;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }
          
          .text-section {
            text-align: center;
            order: 2;
          }

          .image-section {
            order: 1;
          }

          .features-grid {
            justify-content: center;
          }

          .main-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroScreen;
