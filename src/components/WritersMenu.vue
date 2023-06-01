<script>
import DxList from 'devextreme-vue/ui/list';
import Writer from './Writer.vue';
import axios from 'axios';
export default {
  data() {
    return {
      writersList: [],
      fields: ["pseudo", "title"],
      charged: null
    }
  },
  components:{
    Writer,
    DxList
  },
  methods:{
    async getCircles(writer_id)
    {
      var circlesList = []
      const list = await axios.get("http://localhost:5000/writers_circles")
      .then((res) => {
        return res.data;
      })
      for(var i = 0; i < list.length; i++)
      {
        if (list[i].writer_id == writer_id)
        {
          var objCircle = {
            id: list[i].id,
            name: list[i].name
          }
          circlesList.push(objCircle)
        }
      }
      return circlesList;
    },
    async getWritersList(){
        const list = await axios.get("http://localhost:5000/writers")
        .then((res) => {
          return res.data;
        });
        for(var i = 0; i < list.length; i++)
        {
          var objWriter = {
            id: list[i].id,
            title: list[i].title,
            name: list[i].name,
            pseudo:list[i].pseudo,
            circles:[],
          }
          var circlesList = await this.getCircles(objWriter.id);
          for (var j = 0; j < circlesList.length; j++)
          {
            objWriter.circles.push(circlesList[j])
          }
          this.writersList.push(objWriter);
        }
        this.charged = true;
    }
  },
  mounted() {
    this.getWritersList();
  }
}
</script>
<template>
    <div>
        <div class="list-container">
        <DxList v-if="charged"
            height="750px"
            :data-source="writersList"
            :search-enabled="true"
            searchMode="contains"
            :searchExpr=fields
        >
            <template #item="{ data }">
            <div>
                <Writer v-if="charged" :writer="data"></Writer>
            </div>
            </template>
        </DxList>
        </div>
    </div>
</template>
<style>

</style>