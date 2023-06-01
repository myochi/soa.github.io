<script>
import DxList from 'devextreme-vue/ui/list';
import axios from 'axios';
import Circle from './Circle.vue';
export default {
  data() {
    return {
      circlesList: [],
      charged: null,
      fields: ["name"]
    }
  },
  components:{
    Circle,
    DxList
  },
  methods:{
    async getCircleWriterNames(circle_id, writer_id)
    {
      var names = []
      var name = await axios.get("http://localhost:5000/circles/"+circle_id)
      .then((res) => {
        return res.data
      })
      var pseudo = await axios.get("http://localhost:5000/writers/"+writer_id)
      .then((res) => {
        return res.data
      })
      names.push(name[0].name)
      names.push(pseudo[0].pseudo)
      return names
    },
    async getLetters(circle_id)
    {
        var lettersList = [];
        var list = await axios.get("http://localhost:5000/circles/letters/"+circle_id)
        .then((res) => {return res.data});
        console.log(list)
        for (var i = 0; i < list.length; i++)
        {
            var objLetter = {
            "id": list[i].id,
            "circle_id": list[i].circle_id,
            "writer_id": list[i].writer_id,
            "post_at": list[i].post_at,
            "updated_at": list[i].updated_at,
            "content": list[i].content,
            "subject": list[i].subject,
            "replies": [],
            "circle_name": undefined,
            "writer_pseudo": undefined,
            }
            var names_c_w = await this.getCircleWriterNames(objLetter.circle_id, objLetter.writer_id);
            objLetter.circle_name = names_c_w[0];
            objLetter.writer_pseudo = names_c_w[1];

            lettersList.push(objLetter);
        }
        return lettersList;
    },
    async getCirclesList(){
        const list = await axios.get("http://localhost:5000/circles")
        .then((res)=>{
            return res.data;
        });
        for(var i = 0; i < list.length; i++)
        {
            var objCircle = {
                id: list[i].id,
                name: list[i].name, 
                letters: []
            }
            var lettersList = await this.getLetters(objCircle.id);
            for (var j = 0; j < lettersList.length; j++)
            {
                objCircle.letters.push(lettersList[j]);
            }
            this.circlesList.push(objCircle);
        }
        this.charged = true;
    }
  },
  mounted() 
  {
    this.getCirclesList();
  }
}
</script>
<template>
    <div>
        <div class="list-container">
        <DxList v-if="charged"
            height="750px"
            :data-source="circlesList"
            :search-enabled="true"
            searchMode="contains"
            searchExpr="name"
        >
            <template #item="{ data }">
            <div>
                <Circle v-if="charged" :circle="data"></Circle>
            </div>
            </template>
        </DxList>
        </div>
    </div>
</template>
<style>

</style>