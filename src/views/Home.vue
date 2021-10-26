<template>
  <div>
    <user-table />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserTable from "../components/UserTable.vue";

export default Vue.extend({
  name: "Home",

  components: {
    UserTable,
  },
});
</script>
