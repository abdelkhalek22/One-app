import React, { useState } from 'react';
import { educationalLevels, subjects, teachers, bookTypes, getBookDetails } from '../data/books';
import logo from '../assets/logo.jpg';

const BookingScreen = ({ onBack }) => {
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [showReceipt, setShowReceipt] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    const isSelectionComplete = selectedLevel && selectedSubject && selectedTeacher && selectedType;

    // Calculate progress based on filled fields
    const filledFieldsCount = [selectedLevel, selectedSubject, selectedTeacher, selectedType].filter(Boolean).length;
    const progressPercentage = (filledFieldsCount / 4) * 100;

    const handleCheckAvailability = () => {
        if (isSelectionComplete) {
            const details = getBookDetails(selectedLevel, selectedSubject, selectedTeacher, selectedType);
            setCurrentBook(details);
        }
    };

    React.useEffect(() => {
        handleCheckAvailability();
    }, [selectedLevel, selectedSubject, selectedTeacher, selectedType]);

    const handleReserve = () => {
        if (customerName && phoneNumber && !phoneError) {
            // Save to local storage
            const savedCustomers = JSON.parse(localStorage.getItem('customers') || '{}');
            savedCustomers[phoneNumber] = customerName;
            localStorage.setItem('customers', JSON.stringify(savedCustomers));

            setShowReceipt(true);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleNewOrder = () => {
        setShowReceipt(false);
        setSelectedLevel('');
        setSelectedSubject('');
        setSelectedTeacher('');
        setSelectedType('');
        setCustomerName('');
        setCustomerName('');
        setPhoneNumber('');
        setPhoneError('');
        setCurrentBook(null);
    };

    const handleLevelChange = (e) => {
        setSelectedLevel(e.target.value);
        setSelectedSubject('');
        setSelectedTeacher('');
        setSelectedType('');
        setCurrentBook(null);
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        setSelectedTeacher('');
        setSelectedType('');
        setCurrentBook(null);
    };

    const handleTeacherChange = (e) => {
        setSelectedTeacher(e.target.value);
        setSelectedType('');
        setCurrentBook(null);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        const val = e.target.value;
        // Allow only numbers
        if (!/^\d*$/.test(val)) return;

        setPhoneNumber(val);

        // Egyptian phone validation
        const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;

        if (val.length > 0) {
            if (!egyptianPhoneRegex.test(val)) {
                setPhoneError('رقم الهاتف غير صحيح (يجب أن يبدأ بـ 010, 011, 012, 015 ويتكون من 11 رقم)');
            } else {
                setPhoneError('');
                // Check local storage
                const savedCustomers = JSON.parse(localStorage.getItem('customers') || '{}');
                if (savedCustomers[val]) {
                    setCustomerName(savedCustomers[val]);
                }
            }
        } else {
            setPhoneError('');
        }
    };

    if (showReceipt && currentBook) {
        return (
            <div className="receipt-screen flex-center">
                <div className="receipt-card">
                    <div className="receipt-header">
                        <img src={logo} alt="Logo" className="receipt-logo" />
                        <h2>إيصال حجز</h2>
                        <p>ALL IN ONE</p>
                    </div>
                    <div className="receipt-body">
                        <div className="receipt-row">
                            <span>الاسم:</span>
                            <span>{customerName}</span>
                        </div>
                        <div className="receipt-row">
                            <span>رقم الهاتف:</span>
                            <span>{phoneNumber}</span>
                        </div>
                        <div className="receipt-divider"></div>
                        <div className="receipt-row">
                            <span>المرحلة:</span>
                            <span>{selectedLevel}</span>
                        </div>
                        <div className="receipt-row">
                            <span>المادة:</span>
                            <span>{selectedSubject}</span>
                        </div>
                        <div className="receipt-row">
                            <span>المدرس:</span>
                            <span>{selectedTeacher}</span>
                        </div>
                        <div className="receipt-row">
                            <span>النوع:</span>
                            <span>{selectedType}</span>
                        </div>
                        <div className="receipt-divider"></div>
                        <div className="receipt-row total">
                            <span>السعر:</span>
                            <span>{currentBook.price} ج.م</span>
                        </div>
                        <p className="instruction">
                            {currentBook.isAvailable
                                ? 'يرجى التوجه للكاشير للدفع واستلام المذكرة'
                                : 'يرجى التوجه للكاشير للدفع، والاستلام غداً'}
                        </p>
                    </div>
                    <div className="receipt-actions">
                        <button onClick={handlePrint} className="print-btn">طباعة الإيصال</button>
                        <button onClick={handleNewOrder} className="new-btn">حجز جديد</button>
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
          }
          .receipt-card {
            background: white;
            padding: 2.5rem;
            border-radius: var(--radius-lg);
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
        <div className="booking-screen">
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

            <div className="booking-content container">
                {!showReceipt && (
                    <div className="stepper-wrapper">
                        <div className="stepper-header">
                            <span>خطوة {filledFieldsCount === 0 ? 1 : filledFieldsCount} من 4: {
                                filledFieldsCount === 0 ? 'اختر المرحلة' :
                                    filledFieldsCount === 1 ? 'اختر المادة' :
                                        filledFieldsCount === 2 ? 'اختر المدرس' :
                                            filledFieldsCount === 3 ? 'اختر النوع' : 'مراجعة وحجز'
                            }</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${Math.max(5, progressPercentage)}%` }}></div>
                        </div>
                    </div>
                )}

                <h2 className="section-title">حجز المذكرات والكتب</h2>

                <div className="filters-grid">
                    <div className="form-group">
                        <label>المرحلة الدراسية</label>
                        <div className="select-wrapper">
                            <select value={selectedLevel} onChange={handleLevelChange}>
                                <option value="">اختر المرحلة</option>
                                {educationalLevels.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                            <span className="select-icon">▼</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>اسم المادة</label>
                        <div className="select-wrapper">
                            <select
                                value={selectedSubject}
                                onChange={handleSubjectChange}
                                disabled={!selectedLevel}
                            >
                                <option value="">اختر المادة</option>
                                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <span className="select-icon">▼</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>اسم المدرس</label>
                        <div className="select-wrapper">
                            <select
                                value={selectedTeacher}
                                onChange={handleTeacherChange}
                                disabled={!selectedSubject}
                            >
                                <option value="">اختر المدرس</option>
                                {teachers.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <span className="select-icon">▼</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>نوع الكتاب/المذكرة</label>
                        <div className="select-wrapper">
                            <select
                                value={selectedType}
                                onChange={handleTypeChange}
                                disabled={!selectedTeacher}
                            >
                                <option value="">اختر النوع</option>
                                {bookTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <span className="select-icon">▼</span>
                        </div>
                    </div>
                </div>

                <div className="details-section">
                    {currentBook ? (
                        <div className="book-card">
                            <div className="book-info">
                                <h3>{currentBook.title}</h3>
                                <p>{currentBook.description}</p>
                                <div className="status-badge" data-available={currentBook.isAvailable}>
                                    {currentBook.isAvailable ? 'متوفر' : 'غير متوفر'}
                                </div>
                            </div>
                            <div className="book-price">
                                <span className="price-tag">{currentBook.price} ج.م</span>
                                <div className="customer-inputs">
                                    <input
                                        type="text"
                                        placeholder="اسم الطالب الثلاثي"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="customer-input"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="رقم الهاتف (01xxxxxxxxx)"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        className={`customer-input ${phoneError ? 'error' : ''}`}
                                        maxLength="11"
                                    />
                                    {phoneError && <span className="error-msg">{phoneError}</span>}
                                </div>
                                <button
                                    onClick={handleReserve}
                                    disabled={!customerName || !phoneNumber || !!phoneError}
                                    className="reserve-btn"
                                >
                                    {currentBook.isAvailable ? 'طلب واستلام من الكاشير' : 'حجز واستلام غداً'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">👆</div>
                            <p>يرجى اختيار جميع البيانات لإظهار التفاصيل</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .booking-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
          padding-bottom: 2rem;
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
          margin-bottom: 2rem;
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

        .section-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--color-brand-black);
          font-weight: 800;
        }

        .stepper-wrapper {
          width: 100%;
          max-width: 800px;
          margin: 0 auto 2rem auto;
        }

        .stepper-header {
          font-weight: bold;
          color: var(--color-text-secondary);
          margin-bottom: 0.5rem;
          text-align: right;
          direction: rtl;
        }

        .progress-bar {
          height: 6px;
          background: #e0e0e0;
          border-radius: 3px;
          width: 100%;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-brand-red);
          transition: width 0.3s ease;
        }
        
        
        .filters-grid { 
          display: grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap: 2rem; 
          margin-bottom: 3rem; 
        }
        
        .form-group { display: flex; flex-direction: column; gap: 0.8rem; }
        .form-group label { font-weight: 700; color: var(--color-text-primary); font-size: 1.1rem; }
        
        .select-wrapper {
          position: relative;
        }

        .select-wrapper select {
          width: 100%;
          padding: 1rem 1.5rem;
          padding-left: 3rem; /* Padding for icon */
          border: 2px solid #eee;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-family: inherit;
          background: white;
          appearance: none;
          transition: all 0.3s;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .select-wrapper select:focus {
          border-color: var(--color-brand-red);
          box-shadow: 0 0 0 4px rgba(211, 47, 47, 0.1);
        }

        .select-wrapper select:disabled {
          background: #f9f9f9;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .select-icon {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
          pointer-events: none;
          font-size: 0.8rem;
        }

        .details-section { margin-top: 2rem; }
        
        .book-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-right: 6px solid var(--color-brand-red);
          animation: slideUp 0.3s ease-out;
        }

        .book-info h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .book-info p { color: var(--color-text-secondary); }

        .status-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 30px;
          font-size: 0.9rem;
          margin-top: 1rem;
          font-weight: bold;
        }
        .status-badge[data-available="true"] { background: #e8f5e9; color: #2e7d32; }
        .status-badge[data-available="false"] { background: #ffebee; color: #c62828; }

        .book-price { text-align: left; display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-end; }
        .price-tag { font-size: 2.5rem; font-weight: 800; color: var(--color-brand-red); }
        
        .reserve-btn {
          background: var(--color-brand-black);
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: bold;
          transition: all 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .reserve-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .reserve-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

        .customer-inputs {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            width: 100%;
            margin-bottom: 1rem;
        }

        .customer-input {
            padding: 0.8rem 1.2rem;
            border: 2px solid #eee;
            border-radius: 12px;
            font-size: 1rem;
            width: 100%;
            transition: all 0.3s;
            text-align: right;
        }

        .customer-input:focus {
            border-color: var(--color-brand-red);
            outline: none;
            box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
        }

        .customer-input.error {
            border-color: #c62828;
            background-color: #ffebee;
        }

        .error-msg {
            color: #c62828;
            font-size: 0.8rem;
            margin-top: -0.5rem;
            text-align: right;
        }

        .empty-state {
          text-align: center;
          padding: 4rem;
          background: white;
          border-radius: var(--radius-lg);
          color: var(--color-text-secondary);
          border: 2px dashed #eee;
        }
        .empty-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }
      `}</style>
        </div>
    );
};

export default BookingScreen;
