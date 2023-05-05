import { defineStore } from "pinia";

export const game = defineStore("counter", {
  state: () => ({
    overallProgress: 0, // общий прогресс
    goals: [25, 50, 100, 200, 500, 1000], //Этапы по очкам
    nextGoal: { index: 0, goal: 25 }, //Следующий этап
    percentOfCurGoal: 0, // % прогресса по достижению след. этапа, начиная с прошлого
    stages: [
      {
        name: "Этап первый",
        id: 1,
        thresholdPoints: 25,
        games: [
          {
            name: "Игра 1.1",
            bestResult: 13,
            isPlayed: true,
          },
        ],
      },
      {
        name: "Этап второй",
        id: 2,
        thresholdPoints: 50,
        games: [
          {
            name: "Игра 2.1",
            bestResult: 54,
            isPlayed: true,
          },
        ],
      },
      {
        id: 3,
        name: "Этап третий",
        thresholdPoints: 100,
        games: [
          {
            name: "Игра 3.1",
            bestResult: 32,
            isPlayed: true,
          },
        ],
      },
      {
        id: 4,
        name: "Этап четвертый",
        thresholdPoints: 200,
        games: [
          {
            name: "Игра 4.1",
            bestResult: 22,
            isPlayed: true,
          },
        ],
      },
      {
        id: 5,
        name: "Этап пятый",
        thresholdPoints: 500,
        games: [
          {
            name: "Игра 5.1",
            bestResult: 12,
            isPlayed: true,
          },
        ],
      },
      {
        id: 6,
        name: "Этап шестой",
        thresholdPoints: 1000,
        games: [
          {
            name: "Игра 6.1",
            bestResult: 82,
            isPlayed: true,
          },
          {
            name: "Игра 6.2",
            bestResult: 32,
            isPlayed: true,
          },
        ],
      },
    ],
  }),
  getters: {},
  actions: {
    // Вымышленная механика игры - для получения очков
    genRandomInt() {
      let res = Math.floor(Math.random() * 26);
      if (this.overallProgress + res >= 1000) {
        return (this.overallProgress = 1000);
      }
      this.overallProgress += res;
      this.calcPercentOfGoal();
      this.goalUpdater();
    },
    // Сбросить очки
    resetProgress() {
      this.overallProgress = 0;
      this.goalUpdater();
      this.percentOfCurGoal = 0;
      this.nextGoal = { index: 0, goal: this.goals[0] };
    },
    // Проверяет, был ли пройден этап по очкам, если да - двигает цель далее
    goalUpdater() {
      for (let i = 0; this.goals.length > i; i++) {
        if (
          this.overallProgress >= this.nextGoal.goal &&
          this.nextGoal.index !== this.goals.length - 1
        ) {
          this.nextGoal.index += 1;
          this.nextGoal.goal = this.goals[this.nextGoal.index];
          this.calcPercentOfGoal();
        }
      }
      return;
    },
    // Рассчитать процент прогресса до прохождения след этапа, начиная от предыдущего
    calcPercentOfGoal() {
      if (this.nextGoal.index > 0) {
        let percent =
          ((this.overallProgress - this.goals?.[this.nextGoal.index - 1]) /
            (this.nextGoal.goal - this.goals[this.nextGoal.index - 1])) *
          100;
        this.percentOfCurGoal = percent;
      } else {
        let percent = (this.overallProgress / this.nextGoal.goal) * 100;
        this.percentOfCurGoal = percent;
      }
    },
    // Суммировать все результаты свойства bestResult из обьектов игр в массиве, вызывается при заходе на сайт
    calcTheMocksArr() {
      for (let i = 0; this.stages.length > i; i++) {
        let games = this.stages[i].games;
        for (let game of games) {
          this.overallProgress += game.bestResult;
        }
      }
      this.goalUpdater();
      this.calcPercentOfGoal();
    },
  },
});
