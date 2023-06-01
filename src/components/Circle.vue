<script>
import dxButton from 'devextreme-vue/ui/button';
import Letter from './Letter.vue';
import notify from 'devextreme/ui/notify';

export default {
  data(){
    return{
      showSubscribeOption: false,
      showEditIcons: true,
      showLetters: false,
    }
  },
  props:["circle"],
  components:{
    dxButton,
    Letter,
},
  methods:{
    updateCircle(id){
      notify("Circle has been updated.");
    },
    deleteCircle(id){
      notify("Circle has been deleted.");
    },
    subscribeCircle(id){
      notify("You have been subscribed to the circle.")
    },
    showLettersToggle(){
      this.showLetters = !this.showLetters;
    }
  }
}
</script>
<template>
    <div class="circle">
      <div class="circle-header">
        <div class="circle-infos">
          <span>{{ circle.name }}</span>
        </div>
        <div class="circle-buttons">
          <dxButton v-if="!showLetters" v-model="showSubscribeOption" @click="showLettersToggle()" id="eye" icon="chevrondown"></dxButton>
          <dxButton v-if="showLetters" v-model="showSubscribeOption" @click="showLettersToggle()" id="eye" icon="chevronup"></dxButton>
          
        </div>
      </div>
      <div v-if="showLetters" class="circle-letters">
        <Letter v-for="letter in circle.letters" :letter="letter" :from-circle="true"></Letter>
      </div>
    </div>
</template>
<style>
.circle{
  display: flex;
  width: 100%;
  height: fit-content;
  box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
}
.circle-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.circle-infos{
  padding: 1%;
  display: flex;
  width: fit-content;
}
.circle-buttons{
  display: flex;
  flex-direction: row;
  width: fit-content;
}
#eye, #modify, #trash, #subscribe
{
  display: flex;
  width: fit-content;
  height: fit-content;
}
</style>