<template>
  <div class="game-container">
    <h1 class="game-title">Tic Tac Toe</h1>
    <div class="grid">
      <div v-for="(cell, index) in board" :key="index" class="cell" :class="{ taken: cell }" @click="handleClick(index)">
        {{ cell }}
      </div>
    </div>
    <button class="btn reset-btn mt-3" @click="resetGame">Reiniciar</button>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      board: Array(9).fill(null),
      currentPlayer: "X",
      gameActive: true,
    };
  },
  computed: {
    winningCombinations() {
      return [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
      ];
    },
  },
  methods: {
    handleClick(index) {
      if (!this.gameActive || this.board[index]) return;

      this.board[index] = this.currentPlayer;

      if (this.checkWinner()) {
        this.gameActive = false;
        this.showWinnerMessage(`${this.currentPlayer} ha ganado 🥳`);
      } else if (this.board.every(cell => cell)) {
        this.gameActive = false;
        this.showWinnerMessage("¡Es un empate! 🤝");
      } else {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      }
    },
    checkWinner() {
      return this.winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
          this.board[a] &&
          this.board[a] === this.board[b] &&
          this.board[a] === this.board[c]
        );
      });
    },
    showWinnerMessage(message) {
      Swal.fire({
        title: message,
        icon: "success",
        iconColor: "var(--dark-gray)",
        background: "var(--matcha-green)",
        color: "var(--dark-gray)",
        confirmButtonColor: "var(--button-green)",
        customClass: {
          popup: "custom-swal-popup",
        },
        confirmButtonText: "Reiniciar",
      }).then(() => this.resetGame());
    },


    resetGame() {
      this.board = Array(9).fill(null);
      this.currentPlayer = "X";
      this.gameActive = true;
    },
  },
};
</script>

<style>
:root {
  --matcha-green: #c8d5b9;
  --light-gray: #f2f2f2;
  --dark-gray: #6c757d;
  --hover-gray: #e0e0e0;
  --button-green: #8aa399;
}

body {
  background-color: var(--light-gray);
  font-family: Arial, sans-serif;
}

.game-container {
  max-width: 350px;
  margin: 40px auto;
  text-align: center;
  background-color: var(--matcha-green);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.game-title {
  margin-bottom: 20px;
  color: var(--dark-gray);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.cell {
  width: 100%;
  aspect-ratio: 1;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--light-gray);
  border: 2px solid var(--dark-gray);
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.1s;
}

.cell:hover {
  background-color: var(--hover-gray);
  transform: scale(1.05);
}

.cell.taken {
  cursor: not-allowed;
  background-color: var(--hover-gray);
}

.reset-btn {
  background-color: var(--button-green);
  border: none;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: var(--dark-gray);
}
</style>
