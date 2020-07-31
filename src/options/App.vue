<template>
  <div>
    <h2>Gpexの設定</h2>
    <el-form ref="form" label-width="120px">
      <el-form-item label="Formのドメイン">
        <el-input v-model="config.form_domain"></el-input>
      </el-form-item>
      <el-button @click="applyConfig">設定を適用</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      config: {}
    };
  },
  mounted() {
    global.browser.storage.sync.get(null, items => {
      console.warn(items);
      this.config.form_domain = items.gpex_form_domain;
    });
  },
  methods: {
    applyConfig() {
      console.warn(this.config);
      global.browser.storage.sync.set({
        gpex_form_domain: this.config.form_domain
      });
    }
  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
