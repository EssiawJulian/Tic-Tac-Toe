/*
This Object Represents a player who's able to make placement.
@param marker The Sign the user chooses to play Tic Toe with. 
@return the makePlacement and checkPlayerWin function are the unlock accessible functions. 
*/
const Player = (marker) => {
  let moveMade = false;

  const checkPlayerWin = (marker) => {
    const board = gameBoard.getBoard();
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winPatterns.some((pattern) =>
      pattern.every((index) => board[index] === marker)
    );
  };

  return { checkPlayerWin, moveMade, marker };
};

const makePlacement = (player, cell, cells) => {
  const index = cell.getAttribute("data-index");
  console.log(index);
  if (gameBoard.getBoard()[index] == "") {
    // Add an event listener to the cell
    if (player.moveMade) return;
    gameBoard.setBoard(index, player.marker);
    cell.textContent = player.marker;
    player.moveMade = true;

    // Check if player wins
    setTimeout(() => {
      if (player.checkPlayerWin(player.marker)) {
        alert(`Player ${player.marker} wins!`);
        gameBoard.resetBoard();
        cells.forEach((cell) => (cell.textContent = ""));
        gameBoard.gameInPlay = false;
        return;
      }

      // Check if the game is a draw
      if (gameBoard.getBoard().every((cell) => cell !== "")) {
        alert("It's a draw!");
        gameBoard.resetBoard();
        cells.forEach((cell) => (cell.textContent = ""));
        gameBoard.gameInPlay = false;
        return;
      }
    }, 10);
  }
};

/*
    The gameBoard module.
    @return Returns a getter method for the board array, a setter method to modify the board, and a reset method to clear the array.
*/
const gameBoard = (() => {
  let marker = ["X", "O"];
  let currentPlayer = Player("O");
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameInPlay = false;
  const getBoard = () => board;
  const setBoard = (index, value) => (board[index] = value);
  const resetBoard = () => (board = ["", "", "", "", "", "", "", "", ""]);
  const setCurrentPlayer = (player) => (currentPlayer = player);
  const getCurrentPlayer = () => currentPlayer;
  return {
    getBoard,
    setBoard,
    resetBoard,
    gameInPlay,
    setCurrentPlayer,
    getCurrentPlayer,
  };
})();


const startGame = () => {
  let cells = document.querySelectorAll(".cell");
  gameBoard.gameInPlay = true;
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (gameBoard.gameInPlay) {
        if (
          gameBoard.getCurrentPlayer().marker == "X" &&
          gameBoard.getCurrentPlayer().moveMade
        ) {
          console.log("Switching to O");
          gameBoard.setCurrentPlayer(Player("O"));
          makePlacement(gameBoard.getCurrentPlayer(), cell, cells);
        } else if (
          gameBoard.getCurrentPlayer().marker == "O" &&
          gameBoard.getCurrentPlayer().moveMade
        ) {
          console.log("Switching to X");
          gameBoard.setCurrentPlayer(Player("X"));
          makePlacement(gameBoard.getCurrentPlayer(), cell, cells);
        } else {
          makePlacement(gameBoard.getCurrentPlayer(), cell, cells);
          gameBoard.getCurrentPlayer().moveMade = true;
        }
      }
    });
  });
};

startGame();
