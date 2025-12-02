import React, { useState } from 'react';
import HeroScreen from './components/HeroScreen';
import SelectionScreen from './components/SelectionScreen';
import BookingScreen from './components/BookingScreen';
import PrintScreen from './components/PrintScreen';
import PrintOptionsScreen from './components/PrintOptionsScreen';
import AdvancedPrintScreen from './components/AdvancedPrintScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('hero');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'hero':
        return <HeroScreen onStart={() => setCurrentScreen('selection')} />;
      case 'selection':
        return (
          <SelectionScreen
            onSelectOption={(option) => setCurrentScreen(option)}
            onBack={() => setCurrentScreen('hero')}
          />
        );
      case 'booking':
        return <BookingScreen onBack={() => setCurrentScreen('selection')} />;
      case 'print':
        return (
          <PrintOptionsScreen
            onSelectOption={(option) => setCurrentScreen(option)}
            onBack={() => setCurrentScreen('selection')}
          />
        );
      case 'paper-print':
        return <PrintScreen onBack={() => setCurrentScreen('print')} />;
      case 'advanced-print':
        return <AdvancedPrintScreen onBack={() => setCurrentScreen('print')} />;
      default:
        return <HeroScreen onStart={() => setCurrentScreen('selection')} />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;
