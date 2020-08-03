
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

// ADDING RESET BUTTON

    var reset = document.createElement('button');
    reset.className = 'button';
    reset.textContent = 'reset';

    reset.addEventListener('click', (e) => {
      if(player1.lives < 4 || player2.lives < 4) {
        player1.lives = 4
        player2.lives = 4

        const live1 = document.getElementById(`ships_player1`); 
        live1.innerHTML = player1.lives;

        const live2 = document.getElementById(`ships_player2`); 
        live2.innerHTML = player2.lives
      } 

    });

    const buttons = document.getElementById('buttons'); // This element is global variable, so there is no need to select it again for the 'new' button
    buttons.appendChild(reset);

// PRINCIPAL FUNCTION THAT MAKES THE GAME WORK

  const initializeBoard = (id, player, opponent) => { //This function makes everything work
    const board = document.getElementById(`board_player${id}`); 

    //Place boats randomly
    while(player.ships < 4) {
        const x = Math.floor(Math.random() * 4);
        const y = Math.floor(Math.random() * 4);

        if (player.board[x][y] == 0) {
            player.board[x][y] = 1;
            player.ships += 1;
        }
    }

    //const lives = document.querySelectorAll(`#ship_player${id}`).innerHTML = player.lives; // Select the 'Lives' html element and display the number of lives on the page
    //lives.innerHTML = player.lives;

    for (var x = 0; x < 4; x++) { // Creates the board

        const li = document.createElement('li'); //creating childs for the list (board)

        for (var y = 0; y < 4; y++) {
            const cell = document.createElement('div');
            cell.className = 'square'; // adding css properties to make it look like a square
            cell.textContent = `${x},${y}`//: ${player.board[x][y]}`; // saves the coordinates as a string value 'x,y' and if you uncomment the last piece of code it show if there is a ship inside the cell (a number 1)
            cell.value = player.board[x][y]; // state of the cell
            cell.x = x;
            cell.y = y;

            //This function adds the click event to each cell
            cell.addEventListener('click', (e) => {
              if (!player.playing){
                  return;
              }

              let cell = e.target; // get element clicked 
              console.log( cell.textContent) // display the coordinates in the console
              //cell.style.visibility = 'hidden';
              cell.style.background ="pink"; // Change the color of the cell when it's clicked
              
              if (e.target.value == 1) { // if the cell that is clicked contains a ship (a number 1) 
                  player.ships -= 1; // The number of ships decreases
                  player.lives -= 1; // The number of lives decreases
                  const lives = document.getElementById(`ships_player${id}`); 
                  lives.innerHTML = player.lives; // Display the number of lives on the page  
               } 

                player.playing = false;  
                opponent.playing = true;
               
                const turn = document.getElementById('turn_player');
                turn.innerHTML = opponent.name; // Display who's turn is

                // Display who is the winner based on the number of lives of the opponent
                if (opponent.lives === 0) { 
                  turn.innerHTML = `Congratulations ${player.name} ,you WON!!!`;
                } else {
                  return;
                }

                if (player.lives === 0) {
                  turn.innerHTML = `Congratulations ${opponent.name} ,you WON!!!`;
                } else {
                  return;
                }

                console.log(e.targeted); //Show in the console the coordinates of the cell that was clicked
            });

            li.appendChild(cell); // adding each cell into the row number x

            reset.addEventListener('click', () => { // Turn the color of the cell back to black when the ''reset'' button is clicked
            cell.style.background ="black"; 
            });

        }

        board.appendChild(li); // adding each row into the board

    }

  };


// OBJECTS THAT STORE THE PLAYERS'S DATA

  const player1 = {
    name:'',
    lives: 4,
    ships: 0,
    playing: true,
    board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  };
    
  const player2 = {
    name:'',
    lives: 4,
    ships: 0,
    playing: false,
    board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  };

//CALLING THE MAIN FUNCTION TO MAKE THE GAME WORK
  initializeBoard( 1, player1, player2);
  initializeBoard( 2, player2, player1);

// ASK FOR THE NAME OF THE PLAYERS
  player1.name = prompt('Player 1');
  player2.name = prompt('Player 2');

  const name = document.getElementById('name_player1');
  name.innerHTML = player1.name;

  const name2 = document.getElementById('name_player2');
  name2.innerHTML = player2.name;

  const turn = document.getElementById('turn_player');
  turn.innerHTML = player1.name;

  const lives = document.getElementById('ships_player1');
  lives.innerHMTL = player1.lives;

// ADDING THE 'new' BUTTON

  const newGame = document.createElement('button'); // Creates the element 'button' on the DOM
  newGame.className = 'button';
  newGame.textContent = 'New';

  newGame.addEventListener('click', (e) => {
    window.location.reload(true); // This line of code refreshes the page, which is basically what the 'New' button does.
  });

  buttons.appendChild(newGame); 
