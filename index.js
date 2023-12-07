// Creates a class called Character, constructor then creates an object within the class
class Character {
    constructor(name, archetype) {
      this.name = name;
      this.archetype = archetype;
    }
  
    // Describe function generates a text representation of the character
    // This encapsulates the process of generating a description of the character
    describe() {
      return `${this.name} is a ${this.archetype}`;
    }
  }
  
  // Creates a class called Party, constructor functions as it does above
  class Party {
    constructor(name) {
      this.name = name;
      this.characters = []; // This is a blank array that will store characters added to the party
    }
  
    // Adds a new character to the party, instanceof checks that character is in Character class
    // and if it is, it is then pushed to the array, otherwise it fails
    addCharacter(character) {
      if (character instanceof Character) {
        this.characters.push(character);
      } else {
        throw new Error(`You can only add an instance of Character. Argument is not a character: ${character}`);
      }
    }
  
    // Describe function creates a text representation of the party
    describe() {
      return `${this.name} has ${this.characters.length} characters.`;
    }
  }
  
  // Creates a class called Menu
  class Menu {
    constructor() {
      this.parties = []; // A blank array to store different parties
      this.selectedParty = null; // Manages one party at a time
    }
  
    // Entry point to the application
    start() {
      let selection = this.showMainMenuOptions();
      while (selection !== '0') {
        switch (selection) {
          case '1':
            this.createParty();
            break;
          case '2':
            this.viewParty();
            break;
          case '3':
            this.deleteParty();
            break;
          case '4':
            this.displayParties();
            break;
          default:
            selection = '0';
        }
        selection = this.showMainMenuOptions();
      }
      alert('Farewell, traveler!');
    }
  
    // Displays main menu options and accepts input from user
    showMainMenuOptions() {
      return prompt
(`0) exit
  1) Set forth, adventurers! (create a new party)
  2) view a party
  3) delete a party
  4) display all parties`);
    }
  
    // Displays party menu options and gathers user input
    showPartyMenuOptions(partyInfo) {
      return prompt
      (`0) back
  1) add a new character
  2) delete a character
  ${partyInfo}`);
    }
  
    // Display names of all parties
    displayParties() {
      let partyString = '';
      for (let i = 0; i < this.parties.length; i++) {
        partyString += i + ') ' + this.parties[i].name + '\n';
      }
      alert(partyString);
    }
  
    // Creates a new party and add it to the parties array
    createParty() {
      let name = prompt('Enter a name for the new party: ');
      this.parties.push(new Party(name));
    }
  
    // View details of a selected party
    // These if statements check for the validity of the index and generates a list if
    // the index is not negative or otherwise invalid (ie exceeds the amount indexes)
    viewParty() {
      let index = prompt("Enter the index of the party that you want to view:");
      if (index > -1 && index < this.parties.length) {
        this.selectedParty = this.parties[index];
        let description = 'Party Name: ' + this.selectedParty.name + '\n';
        description += ' ' + this.selectedParty.describe() + '\n ';
        for (let i = 0; i < this.selectedParty.characters.length; i++) {
          description += i + ') ' + this.selectedParty.characters[i].describe() + '\n';
        }
        let selection1 = this.showPartyMenuOptions(description);
        switch (selection1) {
          case '1':
            this.createCharacter();
            break;
          case '2':
            this.deleteCharacter();
        }
      }
    }
  
    // Deletes a selected party
    deleteParty() {
      let index = prompt('Enter the index of the party that you wish to TPK (if you are sure): ');
      if (index > -1 && index < this.parties.length) {
        this.parties.splice(index, 1);
      }
    }
  
    // Create a new character and add it to the selected party
    createCharacter() {
      let name = prompt('Enter name for new character: ');
      let archetype = prompt('Enter archetype for new character: ');
      this.selectedParty.addCharacter(new Character(name, archetype));
    }
  
    // Delete a selected character from the party
    deleteCharacter() {
      let index = prompt('Enter the index of the character that you wish for rocks to fall on: ');
      if (index > -1 && index < this.selectedParty.characters.length) {
        this.selectedParty.characters.splice(index, 1);
      }
    }
  }
  
  // Instantiate and creates the menu
  let menu = new Menu();
  menu.start();
  