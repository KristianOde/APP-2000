import React, { useState, useEffect } from 'react'
import Header from './Components/Header'
import GameInterface from './Components/GameInterface'
import Toolbar from './Components/Toolbar'
import nor from './Data/LanguageFiles/nor.json'
import eng from './Data/LanguageFiles/eng.json'

const App = () => {
  const [chosenLanguage, setChosenLanguage] = useState(eng)
  const [miscStats, setMiscStats] = useState([])
  //const inputRef = useRef()
  //const [mounted, setMounted] = useState(false)

  const handleLanguageChange = () => {
    if (chosenLanguage === eng) {
      setChosenLanguage(nor)
    }
    else {
      setChosenLanguage(eng)
    }
  }

  useEffect(() => {
    // if (!mounted) {
    //   setMiscStats({
    //     ...miscStats,
    //       gold: Math.floor(Math.random() * 9999)
    //   })
    //   setMounted(true)
    //   }
    setMiscStats({
      ...miscStats,
      gold: Math.floor(Math.random() * 9999)
    })
  }, [setMiscStats])
  
  return (
    <div className="App">
      {/* <Header onClick={handleLanguageChange}/> */}
      <GameInterface 
        chosenLanguage={chosenLanguage}
        miscStats={miscStats}
      />
      <Toolbar handleLanguageChange={handleLanguageChange}/>
    </div>
  );
}

export default App