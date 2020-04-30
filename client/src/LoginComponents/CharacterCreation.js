/**
 * Skrevet av Tommy
 */

import React, { useState } from "react";
import noviceImg from "./resources/novice.jpg";
import sorceressImg from "./resources/sorceress.jpg";
import knightImg from "./resources/Knight.jpg";
import styles from "./styles.module.css";
import { Header, Subheader, Content } from "./components";

// Her er det for å gi dem en unik ID når du velger en klasse
const classTypes = {                                          
  CLASS_SORCERESS: 0,
  CLASS_KNIGHT: 1
};


const CharacterCreation = () => {
  // Fra og med linje 19 til linje 35, så vil det du skriver i felt på karakternavn og klassevalg vise på siden
  const [characterName, setCharacterName] = useState('');   

  const [chosenClass, setChosenClass] = useState(-1);
 
  const characterDisplayName = () => {
    return characterName === '' ? 'New Player' : characterName;
  };

  

  const handleChange = (event) => {
    setCharacterName(event.target.value);
  }
  // Her i fra er dette enkel kode som er synlig med engang i 'appen' (character creation)
	return (                                                  
  <div className={styles.root}>
    <Header>
      Welcome to Dungeon Crawler
    </Header>
    <Header style={{fontSize: '16px' }}>Set a character name and pick a class below!</Header>
    <Content>
      <div className={styles.characterBox} style={{ width: 200, height: 150 }}>
        <img alt="" src={noviceImg} />
      </div>
    </Content>
    <Content>
      <div
        style={{
          margin: "10px auto",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <label style={{ color: "black" }}> Character Name: </label>
        <input
          style={{ marginLeft: "20px" }}
          type="text"
          name="name"
          value={characterName}
		      onChange={handleChange}
        />
      </div>
    </Content>
    <div style={{ margin: "25px auto" }}>
      {characterName === '' && (
        <Header>Select a character name above.</Header>
      )}
      {characterName !== '' && (
        <Header>You've set your character name as <b>{characterDisplayName()}</b></Header>
      )} 
      <Header style={{display: chosenClass === -1 ? "block" : "none"}}> Select a class.</Header> {/*I denne seksjonen her tilkaller jeg valgt klasse og deres ID på OnClick*/}
      <Header style={{display: chosenClass === classTypes.CLASS_SORCERESS ? "block" : "none"}}> You have selected <b>Sorceress</b>.</Header>
      <Header style={{display: chosenClass === classTypes.CLASS_KNIGHT ? "block" : "none"}}> You have selected <b>Knight</b>.</Header>
      <Subheader> ** You cannot change class later on. ** </Subheader>
      <Content>                                   {/*Denne delen er også lett å lese, men her bruker jeg klassebasert arrow function til å hente "classen" du velger. Linje 75 - 96*/}
        <div onClick={() => setChosenClass(classTypes.CLASS_SORCERESS)} className={styles.characterBox}>
          <h2> Sorceress </h2> <img alt="" src={sorceressImg} />
          <header style={{
            fontSize: '20px', 
            position: 'absolute', 
            bottom: '20px', 
            width: '100%',
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'rgb(82, 26, 134)'}}>Sorceress is magic based class</header>
        </div>
        <div onClick={() => setChosenClass(classTypes.CLASS_KNIGHT)} className={styles.characterBox}>
          <h2> Knight </h2> <img alt="" src={knightImg} />
          <header style={{
            fontSize: '20px', 
            position: 'absolute', 
            bottom: '20px', 
            width: '100%',
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'rgb(82, 26, 134)'}}>Knight is a tank-focused class</header>
        </div> {/* På "create" button etter valgt navn og klasse, her tilkaller vi kun til spillet(Game) ved å bruke "replace". Denne delen fikk jeg hjelp av Mikael */}
      </Content>
      <div id="description"> </div>
      <div className={styles.createButton}>
        <button name="Create" type="submit" 
        onClick={() => window.location.replace("https://app2000rpg.herokuapp.com/#/Game")} 
        style={{marginBottom: '4%' }}>
          Create
        </button>
      </div>
    </div>
  </div>
  );
 }


 export default CharacterCreation; 
