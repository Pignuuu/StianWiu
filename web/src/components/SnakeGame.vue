<template>
  <div class="gameWindow">
    <div class="gameTable" v-if="this.playing">
      <div class="gameRow" v-for="(row, index) in gameTable" :key="index">
        <div class="gameCell" v-for="(cell, index) in row" :key="index">
          <div v-if="cell === 1" class="active"></div>
          <div v-else-if="cell === 2" class="apple"></div>
          <div v-else></div>
        </div>
      </div>
    </div>
    <div class="startScreen" v-else>
      <h1>Snake</h1>
      <span v-if="this.score !== 0">Score: {{ this.score }}</span>
      <button @click="this.startGame(400)">Easy</button>
      <button @click="this.startGame(300)">Normal</button>
      <button @click="this.startGame(100)">Hard</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SnakeGame",
  data() {
    return {
      score: 0,
      gameTable: [],
      direction: "right",
      increase: false,
      playing: false,
      snakeBody: [
        {
          x: 0,
          y: 0,
        },
      ],
      apple: {
        x: 0,
        y: 0,
      },
      movesQueue: [],
    };
  },
  methods: {
    createGameTable() {
      for (let i = 0; i < 15; i++) {
        this.gameTable.push([]);
        for (let j = 0; j < 15; j++) {
          this.gameTable[i].push(0);
        }
      }
    },
    spawnApple() {
      // Get random x and y, but if the cell is already occupied, get new ones
      let x = Math.floor(Math.random() * 15);
      let y = Math.floor(Math.random() * 15);

      while (this.gameTable[y][x] !== 0) {
        x = Math.floor(Math.random() * 15);
        y = Math.floor(Math.random() * 15);
      }

      this.apple.x = x;
      this.apple.y = y;
      this.gameTable[y][x] = 2;
    },
    async moveSnake() {
      // First we need to see what the next cell is using the direction and the head of the snake.
      const x = this.snakeBody[0].x;
      const y = this.snakeBody[0].y;
      // Check if this is the last cell in the snake
      // This is the head of the snake, for right now we will skip adding coliision detection for the head. Just make it move.
      // Get the next cell based on the direction

      // Game is a 15 x 15 grid, if the next cell is outside of the grid, the game is over
      if (x == 14 && this.direction === "right") {
        this.gameOver();
      } else if (x == 0 && this.direction === "left") {
        this.gameOver();
      } else if (y == 14 && this.direction === "down") {
        this.gameOver();
      } else if (y == 0 && this.direction === "up") {
        this.gameOver();
      }

      const nextCell = await this.getNextCell(x, y, this.direction);

      // remove tail if we are not increasing
      if (!this.increase) {
        const tail = this.snakeBody.pop();
        this.gameTable[tail.y][tail.x] = 0;
      } else {
        this.increase = false;
      }
      // Check if the next cell is the tail
      // If it is, the game is over
      if (this.gameTable[nextCell.y][nextCell.x] === 1) {
        this.gameOver();
      }
      // Add the next cell to the snakeBody
      this.snakeBody.unshift(nextCell);
      // Add the next cell to the gameTable
      this.gameTable[nextCell.y][nextCell.x] = 1;
      // Check if the next cell is the apple
      if (nextCell.x === this.apple.x && nextCell.y === this.apple.y) {
        // Increase the score
        this.score++;
        this.spawnApple();
        this.increase = true;
      }
    },
    async getNextCell(x, y, direction) {
      // Get the next cell based on the direction
      if (direction === "right") {
        x++;
      } else if (direction === "left") {
        x--;
      } else if (direction === "up") {
        y--;
      } else if (direction === "down") {
        y++;
      }
      return {
        x,
        y,
      };
    },
    async gameOver() {
      this.playing = false;
    },
    async startGame(delay) {
      this.gameTable = [];
      this.createGameTable();
      this.snakeBody = [
        {
          x: 0,
          y: 0,
        },
      ];
      this.gameTable[0][0] = 1;
      this.playing = true;
      this.direction = "right";
      this.score = 0;
      this.spawnApple();
      this.movesQueue = [];
      let game = setInterval(() => {
        if (this.movesQueue.length !== 0) {
          this.direction = this.movesQueue.shift();
        }
        this.moveSnake();

        if (!this.playing) {
          clearInterval(game);
        }
      }, delay);
    },
  },
  async mounted() {
    document.addEventListener("keydown", (e) => {
      // Use queue so that the player can change direction multiple times before the snake moves
      // Make it work with both arrow keys and WASD
      if (
        e.key === "ArrowRight" ||
        (e.key === "d" && this.direction !== "left")
      ) {
        this.movesQueue.push("right");
      } else if (
        e.key === "ArrowLeft" ||
        (e.key === "a" && this.direction !== "right")
      ) {
        this.movesQueue.push("left");
      } else if (
        e.key === "ArrowUp" ||
        (e.key === "w" && this.direction !== "down")
      ) {
        this.movesQueue.push("up");
      } else if (
        e.key === "ArrowDown" ||
        (e.key === "s" && this.direction !== "up")
      ) {
        this.movesQueue.push("down");
      }
    });
  },
};
</script>

<style scoped lang="scss">
.gameWindow {
  background-color: #6a50e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .gameTable {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #6a50e9;
    height: 100%;
    width: 100%;

    .gameRow {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      .gameCell {
        display: flex;
        justify-content: center;
        align-items: center;
        // Using sass change the height and width based on the size of gamewindow
        height: 100%;
        width: 100%;

        background-color: #6a50e9;
        border: 1px solid #e5a4f4;

        div {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .startScreen {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1,
    span {
      text-align: center;
    }

    button {
      background-color: #6a50e9;
      border: 3px solid #e5a4f4;
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
      font-size: 20px;
      color: #e5a4f4;
    }

    button:hover {
      background-color: #e5a4f4;
      color: #6a50e9;
      cursor: pointer;
    }
  }
}

.active {
  background-color: #e5a4f4;
}

.apple {
  background-color: #5335e7;
}
</style>
