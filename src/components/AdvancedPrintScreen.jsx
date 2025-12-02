import React from 'react';
import logo from '../assets/logo.jpg';
import stickerImg from '../assets/images/mockup sticker.jpg';
import cardImg from '../assets/images/Mockup card one.jpg';
import certificateImg from '../assets/images/mockup Certificate.jpg';
import idImg from '../assets/images/Mockup id.jpg';

const AdvancedPrintScreen = ({ onBack }) => {
  const options = [
    { id: 'sticker', title: 'استيكر', img: stickerImg, desc: 'طباعة ستيكرات بجودة عالية' },
    { id: 'id-card', title: 'كارنيه', img: idImg, desc: 'طباعة كارنيهات بلاستيكية' },
    { id: 'card', title: 'كارت شخصي', img: cardImg, desc: 'كروت شخصية بتصاميم مميزة' },
    { id: 'certificate', title: 'شهادة تقدير', img: certificateImg, desc: 'شهادات تقدير وتخرج فاخرة' }
  ];

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
        <h2 className="section-title">خدمات الطباعة المتقدمة</h2>

        <div className="cards-container">
          {options.map(opt => (
            <div key={opt.id} className="selection-card" onClick={() => alert('قريباً')}>
              <div className="card-image-wrapper">
                <img src={opt.img} alt={opt.title} className="card-image" />
              </div>
              <div className="card-content">
                <h3>{opt.title}</h3>
                <p>{opt.desc}</p>
                <span className="card-arrow">←</span>
              </div>
            </div>
          ))}
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
          align-items: center;
          padding: 2rem 0;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--color-brand-black);
          font-weight: 800;
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.5rem;
          max-width: 1000px;
          width: 95%;
          margin: 0 auto;
          justify-content: center;
        }

        .selection-card {
          background: white;
          padding: 1.2rem;
          border-radius: 20px;
          text-align: right;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          gap: 1.2rem;
          height: 180px; /* Increased height */
        }

        .selection-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(211, 47, 47, 0.1);
          border-color: rgba(211, 47, 47, 0.1);
        }

        .card-image-wrapper {
          width: 160px; /* Increased width */
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .selection-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .selection-card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
          color: var(--color-brand-black);
        }

        .selection-card p {
          color: var(--color-text-secondary);
          margin-bottom: 0.5rem;
          line-height: 1.3;
          font-size: 0.85rem;
        }

        .card-arrow {
          display: inline-block;
          font-size: 1.2rem;
          color: var(--color-brand-red);
          transition: transform 0.3s ease;
          align-self: flex-end;
        }

        .selection-card:hover .card-arrow {
          transform: translateX(-5px);
        }
      `}</style>
    </div>
  );
};

export default AdvancedPrintScreen;
