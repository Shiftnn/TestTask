<template>
  <div class="wrapper">
    <div class="wrapper__pointers">
      <div class="wrapper__pointers-item">
        <img src="" alt="" />
        <div class="pointers-item__line-empty"></div>
        0
      </div>
      <div
        class="wrapper__pointers-item"
        v-for="(goal, index) in goals"
        :key="goal"
      >
        <img
          src="@/imgs/Star2.svg"
          alt="star 1"
          v-if="stage < index + 1 && index !== goals.length - 1"
        />
        <img
          src="@/imgs/Star-blue.svg"
          alt="star 1"
          v-if="stage > index && index !== goals.length - 1"
        />
        <img
          src="@/imgs/Group22279695.svg"
          alt="prizeCup"
          v-if="goal == 1000"
        />
        <div
          class="pointers-item__line"
          v-if="index !== goals.length - 1"
        ></div>
        <div
          class="pointers-item__line-empty"
          v-if="index == goals[0] || index == goals.length - 1"
        ></div>
        <p v-if="this.progress <= goal && stage == index">
          {{ this.progress }}/{{ goal }}
        </p>
        <p v-if="stage !== index">{{ goal }}</p>
      </div>
    </div>
    <div class="wrapper__progressBar">
      <div
        class="wrapper__progressbar-container"
        :style="{ width: `${(stage + 1) * 20}%` }"
      >
        <div
          class="wrapper__progressBar-container-filled-static"
          :style="{ width: `${stage * 200}px` }"
        ></div>
        <div style="width: 200px; height: 100%">
          <div
            class="wrapper__progressBar-container-filled"
            :style="{ width: `${percent}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["progress", "percent", "stage", "goals"],
};
</script>

<style scoped>
@import "@/assets/styles/progressBar.css";
</style>
