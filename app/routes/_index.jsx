import Spline from '@splinetool/react-spline';
import React, { Suspense, useEffect, useState } from 'react';

export default function Index() {
  const [carga, setCarga] = useState(false);

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const phraseOutput = document.querySelector('.phrase-output'),
        phrases = [
          'carving pumpkins',
          'hanging decorations',
          'filling goody bags',
          'preparing costume',
          'calibrating spook-o-meter',
          'contacting spirits',
          'raising undead',
        ],
        phraseDelay = 1700,
        displayPhrases = () => {
          let delay = 0;
          phrases.forEach((phrase) => {
            setTimeout(() => (phraseOutput.textContent = phrase), delay);
            delay += phraseDelay;
          });
        };

      displayPhrases();

      setInterval(displayPhrases, phrases.length * phraseDelay);
    });
  }, []);
  function handleCarga() {
    setTimeout(() => {
      setCarga(true);
    }, 30000);
  }
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }} className='parent'>
      <h1 className='title'>Altar de Muertos Ti</h1>

      <div className={carga && 'd-none'}>
        <img className='velas' src='/images/velas.svg' alt='' />
        <img className='picado' src='/images/Papel_Picado.svg' alt='' />
        <img className={'loader'} src='/images/Loader.gif' alt='' />
      </div>
      <Spline
        className={'d-block'}
        onLoad={() => handleCarga()}
        scene='https://draft.spline.design/rNP9kusZwYxf7q4g/scene.splinecode'
      />
    </div>
  );
}
