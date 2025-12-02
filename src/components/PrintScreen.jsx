import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';

const PrintScreen = ({ onBack }) => {
  const [paperCount, setPaperCount] = useState(0);
  const [color, setColor] = useState('bw'); // 'bw' or 'color'
  const [sidedness, setSidedness] = useState('single'); // 'single' or 'double'
  const [paperSize, setPaperSize] = useState('a4'); // 'a4', 'a5', 'a3'
  const [binding, setBinding] = useState('none');
  const [copies, setCopies] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);

  // Reset binding if effective sheet count is less than 20
  useEffect(() => {
    const effectiveCount = sidedness === 'double' ? Math.ceil(paperCount / 2) : paperCount;
    if (effectiveCount < 20 && (binding === 'spiral' || binding === 'perfect')) {
      setBinding('none');
    }
  }, [paperCount, binding, sidedness]);

  // Pricing Logic from Image
  const getPricePerSheet = (size, colorMode, sideMode) => {
    const prices = {
      a4: {
        bw: { single: 0.8, double: 1 },
        color: { single: 1.0, double: 1.25 }
      },
      a5: {
        bw: { single: 0.5, double: 0.6 },
        color: { single: 0.75, double: 0.8 }
      },
      a3: {
        bw: { single: 2.0, double: 2.5 },
        color: { single: 3.0, double: 4.0 }
      }
    };
    return prices[size]?.[colorMode]?.[sideMode] || 0;
  };

  const getBindingPrice = (type, count, sideMode) => {
    // Calculate effective sheet count for binding (halved if double-sided)
    const effectiveCount = sideMode === 'double' ? Math.ceil(count / 2) : count;

    if (type === 'spiral') {
      if (effectiveCount <= 120) return 15;
      if (effectiveCount <= 180) return 20;
      if (effectiveCount <= 200) return 25;
      return 30;
    }
    const fixedPrices = {
      none: 0,
      staple: 2.00,
      perfect: 20.00 // Updated to 20
    };
    return fixedPrices[type] || 0;
  };

  useEffect(() => {
    const sheetPrice = getPricePerSheet(paperSize, color, sidedness);
    // If double-sided, we use half the number of sheets (rounded up) for printing cost
    const effectiveSheetCount = sidedness === 'double' ? Math.ceil(paperCount / 2) : paperCount;
    const printingCost = sheetPrice * effectiveSheetCount;
    const bindingCost = getBindingPrice(binding, paperCount, sidedness);
    const total = (printingCost + bindingCost) * copies;
    setTotalPrice(total);
  }, [paperCount, color, sidedness, paperSize, binding, copies]);

  // Dynamic Preview Renderer
  const renderPreview = () => {
    const getBindingVisual = () => {
      switch (binding) {
        case 'spiral':
          return (
            <div className="binding-visual spiral">
              {[...Array(10)].map((_, i) => <div key={i} className="coil"></div>)}
            </div>
          );
        case 'staple':
          return (
            <div className="binding-visual staple">
              <div className="staple-pin top"></div>
              <div className="staple-pin bottom"></div>
            </div>
          );
        case 'perfect':
          return <div className="binding-visual perfect"></div>;
        default:
          return null;
      }
    };

    return (
      <div className={`preview-sheet ${paperSize} ${color} ${binding}`}>
        {getBindingVisual()}
        <div className="preview-content">
          <div className="preview-line title"></div>
          <div className="preview-line"></div>
          <div className="preview-line"></div>
          <div className="preview-line"></div>
          <div className="preview-line half"></div>
        </div>
      </div>
    );
  };

  const handlePrintPrice = () => {
    setShowReceipt(true);
  };

  const handleNewOrder = () => {
    setShowReceipt(false);
    setPaperCount(0);
    setBinding('none');
  };

  if (showReceipt) {
    return (
      <div className="receipt-screen flex-center">
        <div className="receipt-card">
          <div className="receipt-header">
            <img src={logo} alt="Logo" className="receipt-logo" />
            <h2>إيصال طباعة</h2>
            <p>ALL IN ONE</p>
          </div>
          <div className="receipt-body">
            <div className="receipt-row">
              <span>حجم الورق:</span>
              <span>{paperSize.toUpperCase()}</span>
            </div>
            <div className="receipt-row">
              <span>عدد الورق:</span>
              <span>{paperCount}</span>
            </div>
            <div className="receipt-row">
              <span>اللون:</span>
              <span>{color === 'bw' ? 'أبيض وأسود' : 'ألوان'}</span>
            </div>
            <div className="receipt-row">
              <span>النوع:</span>
              <span>{sidedness === 'single' ? 'وجه واحد' : 'وجهين'}</span>
            </div>
            {binding !== 'none' && (
              <div className="receipt-row">
                <span>التغليف:</span>
                <span>{binding === 'spiral' ? 'سلك' : binding === 'staple' ? 'تدبيس' : 'تجليد'}</span>
              </div>
            )}
            <div className="receipt-divider"></div>
            <div className="receipt-row total">
              <span>السعر:</span>
              <span>{totalPrice.toFixed(2)} ج.م</span>
            </div>
            <p className="instruction">يرجى التوجه للكاشير لإتمام عملية الشراء</p>
          </div>
          <div className="receipt-actions">
            <button onClick={() => window.print()} className="print-btn">طباعة الإيصال</button>
            <button onClick={handleNewOrder} className="new-btn">طلب جديد</button>
          </div>
        </div>
        <style>{`
          .receipt-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .receipt-card {
            background: white;
            padding: 2.5rem;
            border-radius: 16px;
            width: 450px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.2);
            animation: slideUp 0.4s ease-out;
          }
          .receipt-logo { width: 60px; border-radius: 12px; margin-bottom: 1rem; }
          .receipt-header h2 { color: var(--color-brand-red); margin-bottom: 0.2rem; font-weight: 800; }
          .receipt-body { margin: 2rem 0; text-align: right; }
          .receipt-row { display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.1rem; color: var(--color-text-primary); }
          .receipt-divider { height: 2px; background: #f0f0f0; margin: 1.5rem 0; }
          .total { font-weight: 800; font-size: 1.5rem; color: var(--color-brand-red); }
          .instruction { text-align: center; margin-top: 2rem; font-size: 0.9rem; color: var(--color-text-secondary); background: #f9f9f9; padding: 0.5rem; border-radius: 8px; }
          .receipt-actions { display: flex; gap: 1rem; justify-content: center; }
          .print-btn { background: var(--color-brand-black); color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: bold; transition: transform 0.2s; }
          .print-btn:hover { transform: translateY(-2px); }
          .new-btn { background: transparent; border: 2px solid var(--color-brand-black); padding: 1rem 2rem; border-radius: 12px; font-weight: bold; transition: background 0.2s; }
          .new-btn:hover { background: #f5f5f5; }
          
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media print {
            body * { visibility: hidden; }
            .receipt-card, .receipt-card * { visibility: visible; }
            .receipt-card { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none; }
            .receipt-actions { display: none; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="print-screen">
      <nav className="navbar">
        <div className="nav-brand">
          <img src={logo} alt="One Store Logo" className="nav-logo" />
          <span className="brand-name">One Store</span>
        </div>
        <div className="nav-caption">ALL IN ONE</div>
        <div className="nav-controls">
          <button onClick={onBack} className="back-btn">← عودة</button>
        </div>
      </nav>

      <div className="print-content container">
        <h2 className="section-title">الطباعة الورقية</h2>

        <div className="main-layout">
          {/* Combined Card: Options & Preview */}
          <div className="combined-card">
            {/* Left Side: Options */}
            <div className="col-options">
              <div className="option-group extra-compact">
                <label>عدد الورق</label>
                <div className="counter-control large simple-input">
                  <input
                    type="number"
                    min="0"
                    value={paperCount}
                    onChange={(e) => setPaperCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="count-input"
                    placeholder="أدخل عدد الورق"
                  />
                </div>
              </div>

              <div className="option-group extra-compact">
                <label>لون الطباعة</label>
                <div className="toggle-options">
                  <button
                    className={`toggle-btn ${color === 'bw' ? 'active' : ''}`}
                    onClick={() => setColor('bw')}
                  >
                    أبيض وأسود
                  </button>
                  <button
                    className={`toggle-btn ${color === 'color' ? 'active' : ''}`}
                    onClick={() => setColor('color')}
                  >
                    ألوان
                  </button>
                </div>
              </div>

              <div className="option-group extra-compact">
                <label>نوع الطباعة</label>
                <div className="toggle-options">
                  <button
                    className={`toggle-btn ${sidedness === 'single' ? 'active' : ''}`}
                    onClick={() => setSidedness('single')}
                  >
                    وجه واحد
                  </button>
                  <button
                    className={`toggle-btn ${sidedness === 'double' ? 'active' : ''}`}
                    onClick={() => setSidedness('double')}
                  >
                    وجهين
                  </button>
                </div>
              </div>

              <div className="option-group">
                <label>حجم الورق</label>
                <div className="grid-options landscape-grid">
                  {['a4', 'a5', 'a3'].map(size => (
                    <button
                      key={size}
                      className={`grid-btn landscape ${paperSize === size ? 'active' : ''}`}
                      onClick={() => setPaperSize(size)}
                    >
                      <span className="icon landscape-icon">📄</span>
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label>نوع التغليف</label>
                <div className="grid-options binding-grid">
                  {[
                    { id: 'none', label: 'بدون', icon: '❌' },
                    { id: 'staple', label: 'تدبيس', icon: '📎' },
                    { id: 'spiral', label: 'سلك', icon: '➰' },
                    { id: 'perfect', label: 'تجليد', icon: '📖' }
                  ].map(opt => {
                    const effectiveCount = sidedness === 'double' ? Math.ceil(paperCount / 2) : paperCount;
                    const isDisabled = effectiveCount < 20 && (opt.id === 'spiral' || opt.id === 'perfect');
                    return (
                      <button
                        key={opt.id}
                        className={`grid-btn ${binding === opt.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                        onClick={() => {
                          if (isDisabled) {
                            alert("تغليف السلك او التجليد يجب ان يكون عدد الورق اكثر من 20 ورقة");
                          } else {
                            setBinding(opt.id);
                          }
                        }}
                      >
                        <span className="icon">{opt.icon}</span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side: Preview */}
            <div className="col-preview">
              <div className="option-group extra-compact">
                <label>عدد النسخ</label>
                <div className="counter-control">
                  <button onClick={() => setCopies(Math.max(1, copies - 1))}>-</button>
                  <span>{copies}</span>
                  <button onClick={() => setCopies(copies + 1)}>+</button>
                </div>
              </div>

              <div className={`preview-container ${paperSize === 'a3' ? 'a3-container' : ''}`}>
                {renderPreview()}
              </div>
            </div>
          </div>

          {/* Column 3: Price Details */}
          <div className="col-price">
            <div className="price-card">
              <h3>تفاصيل السعر</h3>
              <div className="price-details-list">
                <div className="price-row">
                  <span>سعر الورق ({color === 'bw' ? 'أبيض وأسود' : 'ألوان'}):</span>
                  <span>{getPricePerSheet(paperSize, color, sidedness).toFixed(2)} ج.م</span>
                </div>
                <div className="price-row">
                  <span>عدد الورق ({paperSize.toUpperCase()}):</span>
                  <span>{sidedness === 'double' ? Math.ceil(paperCount / 2) : paperCount}</span>
                </div>
                {binding !== 'none' && (
                  <div className="price-row">
                    <span>سعر التغليف ({binding === 'spiral' ? 'سلك' : binding === 'staple' ? 'تدبيس' : 'تجليد'}):</span>
                    <span>{getBindingPrice(binding, paperCount, sidedness).toFixed(2)} ج.م</span>
                  </div>
                )}
                <div className="price-row">
                  <span>النسخ:</span>
                  <span>{copies}</span>
                </div>
              </div>

              <div className="price-divider"></div>

              <div className="total-section">
                <span className="total-label">الإجمالي</span>
                <span className="total-amount">{totalPrice.toFixed(2)} ج.م</span>
              </div>

              <button className="add-cart-btn full-width" onClick={handlePrintPrice}>
                طباعة السعر
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .print-screen {
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
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-brand, .nav-controls { flex: 1; }
        .nav-controls { display: flex; justify-content: flex-end; }
        .nav-brand { display: flex; align-items: center; }

        .nav-logo {
          height: 50px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .brand-name {
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--color-brand-black);
          letter-spacing: 1px;
          margin-right: 1rem;
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

        .back-btn {
          background: white;
          border: 1px solid #eee;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: bold;
          transition: all 0.2s;
        }
        .back-btn:hover { background: #f5f5f5; }

        .print-content {
          flex: 1;
          padding: 2rem 0;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--color-brand-black);
          font-weight: 800;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 1fr 350px; /* 2 Columns: Main Content (Options+Preview) and Price */
          gap: 2rem;
          align-items: start;
        }

        /* Column Styles */
        .combined-card {
          background: white;
          padding: 1.5rem; /* Reduced padding from 2rem */
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem; /* Reduced gap */
        }

        .col-options, .col-preview {
          display: flex;
          flex-direction: column;
          gap: 0.5rem; /* Reduced gap from 0.8rem */
        }

        .col-price {
          display: flex;
          flex-direction: column;
        }

        .option-group {
          /* Removed card styles */
          padding: 0;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        .option-group.extra-compact {
          padding: 0.5rem; /* Further reduced */
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .option-group.extra-compact label {
          margin-bottom: 0;
          min-width: 80px;
        }

        .option-group.extra-compact .toggle-options,
        .option-group.extra-compact .counter-control {
          flex: 1;
        }

        .option-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 1rem;
          color: var(--color-brand-black);
          font-size: 1.1rem;
        }

        .counter-control {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: #f8f9fa;
          padding: 0.5rem;
          border-radius: 12px;
        }

        .counter-control.simple-input {
            padding: 0;
            background: transparent;
        }

        .count-input {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #eee;
            border-radius: 12px;
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
            outline: none;
            transition: border-color 0.3s;
        }

        .count-input:focus {
            border-color: var(--color-brand-red);
        }

        .counter-control button {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          background: white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          font-weight: bold;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .counter-control button:hover {
          background: var(--color-brand-red);
          color: white;
        }

        .counter-control span {
          font-size: 1.5rem;
          font-weight: bold;
          min-width: 40px;
          text-align: center;
        }

        .toggle-options {
          display: flex;
          background: #f8f9fa;
          padding: 0.3rem;
          border-radius: 12px;
          gap: 0.3rem;
        }

        .toggle-btn {
          flex: 1;
          padding: 0.8rem;
          border: none;
          border-radius: 10px;
          background: transparent;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
        }

        .toggle-btn.active {
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          color: var(--color-brand-red);
        }

        .grid-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
        }

        .grid-options.landscape-grid {
            grid-template-columns: repeat(3, 1fr);
        }

        .grid-options.binding-grid {
            grid-template-columns: repeat(4, 1fr); /* Force 4 columns */
            gap: 0.5rem; /* Smaller gap */
        }

        .grid-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.6rem; /* Reduced padding */
          border: 2px solid transparent;
          background: #f8f9fa;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          gap: 0.3rem;
          font-weight: bold;
          font-size: 0.85rem; /* Smaller font */
        }

        .binding-grid .grid-btn {
            padding: 0.4rem; /* Even smaller for binding */
            font-size: 0.75rem;
        }

        .grid-btn.landscape {
            flex-direction: row;
            padding: 1.2rem;
        }

        .grid-btn:hover {
          background: #ffebee;
        }

        .grid-btn.active {
          background: #ffebee;
          border-color: var(--color-brand-red);
          color: var(--color-brand-red);
        }

        .grid-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: #eee;
        }

        .icon { font-size: 1rem; } /* Smaller icons */
        .landscape-icon { font-size: 0.9rem; }

        /* Preview Styles */
        .preview-container {
          background: #333;
          border-radius: 20px;
          padding: 1rem; /* Reduced padding */
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px; /* Reduced min-height further */
          height: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          overflow: hidden;
        }

        .preview-sheet {
          background: white;
          width: 210px;
          height: 297px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: all 0.5s ease;
          display: flex;
          flex-direction: column;
          padding: 20px;
          transform: scale(0.8); /* Reduced A4 size */
        }

        .preview-sheet.a5 { transform: scale(0.6); } /* Smaller A5 */
        .preview-sheet.a3 { 
            transform: scale(1.1) rotate(90deg); /* Slightly larger than A4, fits in preview */
            transform-origin: center center;
        }

        .preview-sheet.bw .preview-line { background: #ddd; }
        .preview-sheet.bw .preview-line.title { background: #333; }
        
        .preview-sheet.color .preview-line { background: #e3f2fd; }
        .preview-sheet.color .preview-line.title { background: #2196f3; }

        .preview-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }

        .preview-line {
          height: 10px;
          border-radius: 5px;
          width: 100%;
        }

        .preview-line.title {
          height: 20px;
          width: 60%;
          margin-bottom: 10px;
        }

        .preview-line.half { width: 50%; }

        .binding-visual {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          padding: 10px 0;
        }

        .binding-visual.spiral { left: -15px; }

        .coil {
          width: 20px;
          height: 20px;
          border: 3px solid #555;
          border-radius: 50%;
          margin: 2px 0;
          background: #333;
        }

        .binding-visual.staple {
          left: 5px;
          justify-content: space-between;
          padding: 30px 0;
          height: 100%;
          width: 10px;
        }

        .staple-pin {
          width: 4px;
          height: 20px;
          background: #888;
          border-radius: 2px;
        }

        .binding-visual.perfect {
          left: 0;
          width: 15px;
          background: linear-gradient(90deg, #ccc, #eee, #ccc);
          border-right: 1px solid #bbb;
        }

        .preview-sheet.spiral, .preview-sheet.perfect { padding-left: 35px; }

        .preview-label {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          background: var(--color-brand-red); /* Changed to brand color */
          padding: 0.2rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          white-space: nowrap;
          font-size: 0.9rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        /* Price Card Styles (Column 3) */
        .price-card {
          background: white;
          padding: 1rem; /* Reduced padding */
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          height: fit-content; /* Allow height to shrink */
          display: flex;
          flex-direction: column;
        }

        .price-card h3 {
          margin-bottom: 1rem; /* Reduced margin */
          color: var(--color-brand-black);
          text-align: center;
          font-weight: 800;
        }

        .price-details-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.8rem; /* Reduced gap */
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          color: var(--color-text-secondary);
          font-size: 1rem;
        }

        .price-divider {
          height: 2px;
          background: #f0f0f0;
          margin: 1.5rem 0;
        }

        .total-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .total-label {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--color-brand-black);
        }

        .total-amount {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--color-brand-red);
        }

        .add-cart-btn {
          background: var(--color-brand-black);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          transition: all 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          border: none;
          cursor: pointer;
        }

        .add-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .add-cart-btn.full-width {
          width: 100%;
        }

        /* Tablet Portrait (768px and below) */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.75rem 1rem;
          }
          
          .nav-logo {
            height: 40px;
          }
          
          .brand-name {
            font-size: 1rem;
          }
          
          .nav-caption {
            font-size: 1.2rem;
          }
          
          .section-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }
          
          .main-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .combined-card {
            padding: 1rem;
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .price-card {
            padding: 1rem;
          }
          
          .preview-container {
            min-height: 180px;
          }
          
          .option-group label {
            font-size: 1rem;
          }
        }

        /* Tablet Landscape (769px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .navbar {
            padding: 1rem 1.5rem;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .main-layout {
            grid-template-columns: 1fr 300px;
            gap: 1.5rem;
          }
          
          .combined-card {
            padding: 1.25rem;
            gap: 1.25rem;
          }
          
          .preview-container {
            min-height: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintScreen;
