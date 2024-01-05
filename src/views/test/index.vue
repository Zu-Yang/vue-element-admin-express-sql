<template>
  <div>
    <!-- 递归组件 -->
    <p>递归组件的使用</p>
    <test :list="list" />
    <test :list="list" />
    <test :list="list" />
    <test :list="list" />
  </div>
</template>

<script>
import test from "@/components/test/index.vue";

export default {
  name: "index-Recursion",
  data() {
    return {
      timer: null,
      list: [{
        name: 'Root',
        children: [
          {
            name: 'Folder 1',
            children: [
              {
                name: 'File 1'
              },
              {
                name: 'File 2'
              }
            ]
          },
          {
            name: 'Folder 2',
            children: [
              {
                name: 'File 3'
              },
              {
                name: 'File 4'
              }
            ]
          }
        ]
      }]
    }
  },
  methods: {

  },
  mounted() {
    const x = window.scrollX;
    const y = window.scrollY;
    console.log(x, y);
  },
  components: {
    test,
  },
};
</script>