<template>
  <ProgressBar
    :progress="overallProgress"
    :percent="percentOfCurGoal"
    :stage="nextGoal.index"
    :goals="goals"
  />
  <button class="play" @click="genRandomInt()">Играть</button>
  <button @click="resetProgress()">Сбросить</button>
</template>

<script>
import ProgressBar from "./components/ProgressBar.vue";
import { game } from "@/store/index";
import { storeToRefs } from "pinia";
export default {
  setup() {
    // получаем методы и значения из хранилища
    let resetValueInp = 0;
    const store = game();
    const { genRandomInt, resetProgress, calcTheMocksArr } = store;

    const { overallProgress, percentOfCurGoal, nextGoal, goals } =
      storeToRefs(store);
    return {
      genRandomInt,
      overallProgress,
      resetProgress,
      resetValueInp,
      percentOfCurGoal,
      nextGoal,
      goals,
      calcTheMocksArr,
    };
  },
  name: "App",
  components: {
    ProgressBar,
  },
  beforeCreate() {
    this.calcTheMocksArr();
  },
};
</script>

<style>
button {
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #256e99;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  margin: 0 auto;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  gap: 100px;
  align-items: center;
  justify-content: center;
}
</style>
