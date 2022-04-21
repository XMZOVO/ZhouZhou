<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MainPage } from "../Babylon/MainPage/MainPage";
import "tw-elements";
import List from "../component/List.vue";
import ListItem from "../component/ListItem.vue";
import axios from "axios";
import { useRouter } from "vue-router";

let scene: any;
const router = useRouter();
const bjsCanvas = ref();
const loaded = ref(false);
const messages = ref([
  {
    id: 0,
    message: "E批",
    good: 1,
    bad: 2,
  },
]);
const myMessage = ref({
  message: "",
  good: 0,
  bad: 0,
});

const httpUrl = "43.154.8.62";
// const httpUrl = 'localhost'

// http请求
axios.get("http://" + httpUrl + ":8080/message/list").then((resp) => {
  messages.value = resp.data;
});

//留言
function leaveMessage() {
  axios
    .post("http://" + httpUrl + ":8080/message/add", myMessage.value)
    .then((resp) => {
      axios.get("http://" + httpUrl + ":8080/message/list").then((resp) => {
        messages.value = resp.data;
      });
    });
}

onMounted(() => {
  scene = new MainPage(bjsCanvas.value, loaded);
});

function pullBtn(): void {
  scene.Switch();
}
</script>

<template>
  <canvas
    ref="bjsCanvas"
    class="h-screen w-full opacity-0 transition duration-1000"
    v-bind:class="{ 'opacity-100': loaded }"
  ></canvas>

  <div
    class="absolute top-24 left-8 select-none p-4 pt-2 text-4xl opacity-0 transition duration-1000 sm:left-28 sm:top-1/3 sm:text-5xl"
    v-bind:class="{ 'opacity-100': loaded }"
  >
    <div class="text-white">It's Summer Now</div>
    <div class="text-lg text-gray-300 sm:text-2xl">
      <div>Xiao Liu is going to</div>
      <div>pursue meaningful people and things</div>
    </div>
    <button
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
      class="mt-5 rounded-lg border px-2 text-4xl text-white transition ease-in-out hover:-translate-y-1 hover:shadow-lg"
    >
      Pull
    </button>

    <!-- 侧弹出 -->

    <div
      class="offcanvas offcanvas-end invisible fixed bottom-0 top-0 right-0 flex w-96 max-w-full flex-col border-none bg-stone-800 bg-clip-padding text-gray-700 shadow-sm outline-none transition duration-300 ease-in-out"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header flex items-center justify-between p-4">
        <h5
          class="offcanvas-title mb-0 text-xl font-semibold leading-normal text-white"
          id="offcanvasRightLabel"
        >
          Message
        </h5>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          stroke-width="2"
          data-bs-dismiss="offcanvas"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div class="offcanvas-body flex-grow overflow-y-auto p-4">
        <List>
          <ListItem
            v-for="message in messages"
            :key="message.id"
            :message="message"
          />
        </List>
      </div>

      <div class="h-14 w-full border-t bg-stone-800 text-sm">
        <!-- 留言 -->
        <div class="flex justify-between space-x-3 px-5 py-2">
          <img
            @click="leaveMessage"
            src="/messageFinger.png"
            class="h-10 w-10 cursor-pointer rounded-full transition duration-150 ease-in-out hover:translate-y-1"
          />
          <input
            v-model="myMessage.message"
            type="text"
            class="form-control m-0 block flex-1 rounded-full border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="exampleFormControlInput1"
            placeholder="Leave your message"
          />
        </div>
        <!-- 留言 -->
      </div>

      <!-- 分页 -->
      <!-- <div class="flex justify-center text-sm">
        <nav aria-label="Page navigation example">
          <ul class="list-style-none flex">
            <li class="page-item disabled">
              <a
                class="page-link pointer-events-none relative block rounded-full border-0 bg-transparent py-1.5 px-3 text-white outline-none transition-all duration-300 focus:shadow-none"
                href="#"
                tabindex="-1"
                aria-disabled="true"
                >Previous</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link relative block rounded-full border-0 bg-transparent py-1.5 px-3 text-gray-100 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
                href="#"
                >1</a
              >
            </li>
            <li class="page-item active">
              <a
                class="page-link relative block rounded-full border-0 bg-blue-600 py-1.5 px-3 text-white shadow-md outline-none transition-all duration-300 hover:bg-blue-600 hover:text-white focus:shadow-md"
                href="#"
                >2 <span class="visually-hidden">(current)</span></a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link relative block rounded-full border-0 bg-transparent py-1.5 px-3 text-gray-100 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
                href="#"
                >3</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link relative block rounded-full border-0 bg-transparent py-1.5 px-3 text-white outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
                href="#"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div> -->
      <!-- 分页 -->
    </div>
    <!-- 侧弹出 -->
  </div>

  <div
    class="loader-wrapper transition duration-1000"
    v-bind:class="{ 'opacity-0': loaded }"
  >
    <div class="loader">
      <div class="roller"></div>
      <div class="roller"></div>
    </div>

    <div id="loader2" class="loader">
      <div class="roller"></div>
      <div class="roller"></div>
    </div>

    <div id="loader3" class="loader">
      <div class="roller"></div>
      <div class="roller"></div>
    </div>
  </div>
</template>

<style>
/*
* Infinite Loader 
*
* Author: Jonathan Silva
* Url: https://portfolio.jonathansilva.com.br
*
*/
/* ----- Base ----- */
/* ----- Loader ----- */
body {
  background-color: #778899;
}

.loader-wrapper {
  width: 148px;
  height: 100px;
  position: absolute;
  margin: -50px 0 0 -74px;
  left: 50%;
  top: 50%;
}

.loader {
  width: 148px;
  height: 100px;
  top: 0;
  left: 0;
  position: absolute;
}
.loader:after {
  content: "";
  top: auto;
  position: absolute;
  display: block;
  animation: shadow 1.2s infinite linear;
  -moz-animation: shadow 1.2s infinite linear;
  bottom: 0em;
  left: 0;
  height: 0.25em;
  width: 1em;
  border-radius: 50%;
  background-color: #034466;
  opacity: 0.3;
}

.roller,
.roller:last-child {
  width: 70px;
  height: 70px;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: rollercoaster 1.2s infinite linear;
  -webkit-transform: rotate(135deg);
  -moz-animation: rollercoaster 1.2s infinite linear;
  -moz-transform: rotate(135deg);
  animation: rollercoaster 1.2s infinite linear;
  transform: rotate(135deg);
}

.roller:last-child {
  left: auto;
  right: 0;
  -webkit-transform: rotate(-45deg);
  -webkit-animation: rollercoaster2 1.2s infinite linear;
  -moz-transform: rotate(-45deg);
  -moz-animation: rollercoaster2 1.2s infinite linear;
  transform: rotate(-45deg);
  animation: rollercoaster2 1.2s infinite linear;
}

.roller:before,
.roller:last-child:before {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #000;
  border-radius: 50%;
}

@-webkit-keyframes rollercoaster {
  0% {
    -webkit-transform: rotate(135deg);
  }
  8% {
    -webkit-transform: rotate(240deg);
  }
  20% {
    -webkit-transform: rotate(300deg);
  }
  40% {
    -webkit-transform: rotate(380deg);
  }
  45% {
    -webkit-transform: rotate(440deg);
  }
  50% {
    -webkit-transform: rotate(495deg);
    opacity: 1;
  }
  50.1% {
    -webkit-transform: rotate(495deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate(495deg);
    opacity: 0;
  }
}
@-webkit-keyframes rollercoaster2 {
  0% {
    opacity: 0;
  }
  49.9% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    -webkit-transform: rotate(-45deg);
  }
  58% {
    -webkit-transform: rotate(-160deg);
  }
  70% {
    -webkit-transform: rotate(-240deg);
  }
  80% {
    -webkit-transform: rotate(-300deg);
  }
  90% {
    -webkit-transform: rotate(-340deg);
  }
  100% {
    -webkit-transform: rotate(-405deg);
  }
}
@-webkit-keyframes shadow {
  0% {
    opacity: 0.3;
    -webkit-transform: translateX(65px) scale(0.5, 0.5);
  }
  8% {
    -webkit-transform: translateX(30px) scale(2, 2);
  }
  13% {
    -webkit-transform: translateX(0px) scale(1.3, 1.3);
  }
  30% {
    -webkit-transform: translateX(-15px) scale(0.5, 0.5);
    opacity: 0.1;
  }
  50% {
    -webkit-transform: translateX(60px) scale(1.2, 1.2);
    opacity: 0.3;
  }
  60% {
    -webkit-transform: translateX(130px) scale(2, 2);
    opacity: 0.05;
  }
  65% {
    -webkit-transform: translateX(145px) scale(1.2, 1.2);
  }
  80% {
    -webkit-transform: translateX(120px) scale(0.5, 0.5);
    opacity: 0.1;
  }
  90% {
    -webkit-transform: translateX(80px) scale(0.8, 0.8);
  }
  100% {
    -webkit-transform: translateX(60px);
    opacity: 0.3;
  }
}
/* Moz */
@-moz-keyframes rollercoaster {
  0% {
    -moz-transform: rotate(135deg);
  }
  8% {
    -moz-transform: rotate(240deg);
  }
  20% {
    -moz-transform: rotate(300deg);
  }
  40% {
    -moz-transform: rotate(380deg);
  }
  45% {
    -moz-transform: rotate(440deg);
  }
  50% {
    -moz-transform: rotate(495deg);
    opacity: 1;
  }
  50.1% {
    -moz-transform: rotate(495deg);
    opacity: 0;
  }
  100% {
    -moz-transform: rotate(495deg);
    opacity: 0;
  }
}
@-moz-keyframes rollercoaster2 {
  0% {
    opacity: 0;
  }
  49.9% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    -moz-transform: rotate(-45deg);
  }
  58% {
    -moz-transform: rotate(-160deg);
  }
  70% {
    -moz-transform: rotate(-240deg);
  }
  80% {
    -moz-transform: rotate(-300deg);
  }
  90% {
    -moz-transform: rotate(-340deg);
  }
  100% {
    -moz-transform: rotate(-405deg);
  }
}
@-moz-keyframes shadow {
  0% {
    opacity: 0.3;
    -moz-transform: translateX(65px) scale(0.5, 0.5);
  }
  8% {
    -moz-transform: translateX(30px) scale(2, 2);
  }
  13% {
    -moz-transform: translateX(0px) scale(1.3, 1.3);
  }
  30% {
    -moz-transform: translateX(-15px) scale(0.5, 0.5);
    opacity: 0.1;
  }
  50% {
    -moz-transform: translateX(60px) scale(1.2, 1.2);
    opacity: 0.3;
  }
  60% {
    -moz-transform: translateX(130px) scale(2, 2);
    opacity: 0.05;
  }
  65% {
    -moz-transform: translateX(145px) scale(1.2, 1.2);
  }
  80% {
    -moz-transform: translateX(120px) scale(0.5, 0.5);
    opacity: 0.1;
  }
  90% {
    -moz-transform: translateX(80px) scale(0.8, 0.8);
  }
  100% {
    -moz-transform: translateX(60px);
    opacity: 0.3;
  }
}
/* No-prefix */
@keyframes rollercoaster {
  0% {
    transform: rotate(135deg);
  }
  8% {
    transform: rotate(240deg);
  }
  20% {
    transform: rotate(300deg);
  }
  40% {
    transform: rotate(380deg);
  }
  45% {
    transform: rotate(440deg);
  }
  50% {
    transform: rotate(495deg);
    opacity: 1;
  }
  50.1% {
    transform: rotate(495deg);
    opacity: 0;
  }
  100% {
    transform: rotate(495deg);
    opacity: 0;
  }
}
@keyframes rollercoaster2 {
  0% {
    opacity: 0;
  }
  49.9% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: rotate(-45deg);
  }
  58% {
    transform: rotate(-160deg);
  }
  70% {
    transform: rotate(-240deg);
  }
  80% {
    transform: rotate(-300deg);
  }
  90% {
    transform: rotate(-340deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}
@keyframes shadow {
  0% {
    opacity: 0.3;
    transform: translateX(65px) scale(0.5, 0.5);
  }
  8% {
    transform: translateX(30px) scale(2, 2);
  }
  13% {
    transform: translateX(0px) scale(1.3, 1.3);
  }
  30% {
    transform: translateX(-15px) scale(0.5, 0.5);
    opacity: 0.1;
  }
  50% {
    transform: translateX(60px) scale(1.2, 1.2);
    opacity: 0.3;
  }
  60% {
    transform: translateX(130px) scale(2, 2);
    opacity: 0.05;
  }
  65% {
    transform: translateX(145px) scale(1.2, 1.2);
  }
  80% {
    transform: translateX(120px) scale(0.5, 0.5);
    opacity: 0.1;
  }
  90% {
    transform: translateX(80px) scale(0.8, 0.8);
  }
  100% {
    transform: translateX(60px);
    opacity: 0.3;
  }
}
#loader2:after {
  -webkit-animation-delay: 0.15s;
  animation-delay: 0.15s;
}
#loader2 .roller {
  -webkit-animation-delay: 0.15s;
  animation-delay: 0.15s;
}

#loader3:after {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
#loader3 .roller {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
</style>
