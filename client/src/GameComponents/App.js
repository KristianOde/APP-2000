import React, { useState, useEffect } from 'react'
import GameInterface from './Components/GameInterface'
import { useIsMount } from './Components/helper'
import Toolbar from './Components/Toolbar'
import nor from './Data/LanguageFiles/nor.json'
import eng from './Data/LanguageFiles/eng.json'

{/* Kristian START */}

{/* App-komponent. Root-komponent for selve spillet. */}
const App = () => {
  const isMount = useIsMount()
  {/* Her erklæres state og hooks, som vil gjenta seg flere steder 
      gjennom hele koden. En hook er hva som lar deg få tilgang til og 
      oppdatere såkalte state-verdier. En komponent sin state
      inneholder relevante data som for eksempel brukerinfo, hva
      som skal inkluderes i ulike lister o.l.
      chosenLanguage er state-variabelen som avgjør hvilket språk
      applikasjonen skal bruke, setChosenLanguage er funksjonen for å 
      oppdatere verden til denne variabelen. 
      useState(eng) er selve hooken, og her definerer vi at den skal
      starte med eng-objektet lagret i state. Vi kan bruke hva vil som
      parameter i useState, som tallverdier, objekter eller arrays.
      miscStats og setMiscStats fungerer på samme måte som beskrevet
      over, men useState([]) får her en tom array da andre funksjoner
      skal senere fylle state her med tabelldata. */}
  const [chosenLanguage, setChosenLanguage] = useState(eng)
  const [retry, setRetry] = useState(false)

  {/* Funksjon som  håndterer språkbytte */}
  const handleLanguageChange = () => {
    if (chosenLanguage === eng) {
      setChosenLanguage(nor)
    }
    else {
      setChosenLanguage(eng)
    }
  }

  const handleRetry = () => {
    setRetry(true)
    setTimeout(() => {
      setRetry(false)
    }, 500);
  }
  
  {/* Hva komponentfunksjonen returnerer.
      Dette er en samling av HTML-elementer og andre komponenter.
      Det er viktig at komponentnavnene har stor forbokstav for å 
      skille dem fra vanlige HTML-elementer.
      I komponentene sender vi med state-verdiene slik at de kan brukes
      av child components. På denne måten kan man se at React har en 
      'top-down'-dataflyt. */}
  return (
    <div className="App">
      {(!retry) ? 
        <GameInterface 
          chosenLanguage={chosenLanguage}
        />
        : <p>. . .</p>
      }
      <Toolbar 
        handleLanguageChange={handleLanguageChange}
        handleRetry={handleRetry}
      />
    </div>
  )
}

{/* Kristian SLUTT */}

{/**Funksjonen/komponenten som skal eksporteres. Avgjør hva som
    kan importeres inn til andre komponenter. Kan sammenliknes med
    hva som er private og public i andre kodespråk. */}
export default App