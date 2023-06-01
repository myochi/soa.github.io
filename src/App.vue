<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { RouterLink, RouterView } from 'vue-router';

export default {
  data() {
    return {
      pseudo: "User1"
    }
  },
  components:{
    Header,
    Footer,
    RouterLink,
    RouterView
  }
}
</script>

<template>
    <Header></Header>
    <nav>
        <ul class="nav-ul">
            <li class="nav-li">
                <RouterLink class="nav-span" to="/circles">Circles</RouterLink>
            </li>
            <li class="nav-li">
                <RouterLink class="nav-span" to="/letters">Letters</RouterLink>
            </li>
            <li class="nav-li">
                <RouterLink class="nav-span" to="/writers">Writers</RouterLink>
            </li>
        </ul>
    </nav>
    <RouterView></RouterView>
    <Footer></Footer>
</template>

<style>
nav{
  height: 30px;
  padding-bottom: 10px;
}
.nav-ul
{
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    display: flex;
    width: 100%;
    height: 50px;
    list-style-type: none;
    padding: 0%;
    margin: 0%;
}
.nav-li
{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    text-align: center;
}

a.nav-span
{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    color: white;

}
.nav-li:hover
{
    background-color: #111;
}
</style>

