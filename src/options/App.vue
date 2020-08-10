<template>
  <div>
    <h3 class="p-left">Gpexの設定</h3>
    <p class="kit-sub p-left">設定項目はありません</p>
    <!--
    <el-form ref="form" label-width="120px">
      <el-form-item label="Formのドメイン">
        <el-input v-model="config.form_domain"></el-input>
      </el-form-item>
      <el-button @click="applyConfig">設定を適用</el-button>
    </el-form>
    -->
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
      this.config.form_domain = items.gpex_form_domain;
    });
  },
  methods: {
    applyConfig() {
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
