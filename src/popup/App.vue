<template>
  <div>
    <h2>Gpex</h2>
    <el-row>
      <el-button @click="download">資料ダウンロード</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    download() {
      console.log('DL');
      global.browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        global.browser.tabs
          .sendMessage(tabs[0].id, { query: 'getDocs' })
          .then(e => console.log(e))
          .catch(e => console.error(e));
      });
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
