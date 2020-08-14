<template>
  <div>
    <img class="logo-img" src="../logo.png" alt="Gpex" />
    <h2 v-text="classTitle"></h2>
    <p v-text="classInfo"></p>
    <el-row>
      <el-button @click="showDocs">資料一覧を更新</el-button>
      <el-button @click="downloadChecked" type="primary">チェック済をダウンロード</el-button>
    </el-row>
    <el-checkbox-group v-model="checkboxGroup">
      <div v-for="(doc, index) in docs" :key="doc.href">
        <el-checkbox :label="index" border :checked="doc.visibility" :disabled="!doc.downloadable">
          <strong>{{ doc.title }}</strong>
          <el-select v-model="doc.exportType" v-if="doc.gdocs" size="mini" placeholder="出力形式">
            <el-option value="pdf">PDF</el-option>
            <el-option value="docx">Word(docx)</el-option>
            <el-option value="xlsx">Excel(xlsx)</el-option>
            <el-option value="txt">テキスト(txt)</el-option>
            <el-option value="odt">ODT(odt)</el-option>
            <el-option value="zip">HTML(zip)</el-option>
          </el-select>
          <span class="doc-type">種別：{{ doc.type }}</span>
        </el-checkbox>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classTitle: '不明',
      classInfo: '情報を取得していません',
      docs: [],
      checkboxGroup: []
    };
  },
  mounted() {
    this.getClassInfo();
    this.showDocs();
  },
  methods: {
    getClassInfo() {
      global.browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        global.browser.tabs.sendMessage(tabs[0].id, { query: 'getClassInfo' }).then(e => {
          this.classTitle = e.classTitle;
          this.classInfo = e.classInfo;
        });
      });
    },
    showDocs() {
      global.browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        global.browser.tabs
          .sendMessage(tabs[0].id, { query: 'getDocs' })
          .then(e => (this.docs = e))
          .catch(e => {
            console.error('Gpex', e);
            this.$notify.error({
              title: '資料の取得に失敗',
              message: e.message
            });
          });
      });
    },
    downloadChecked() {
      this.checkboxGroup.forEach(index => {
        let dlLink = null;
        const doc = this.docs[index];
        if (!doc.downloadable) dlLink = null;
        else if (doc.gdocs)
          dlLink = doc.href.replace(
            /https?:\/\/drive\.google\.com\/open\?id=(.*)&authuser=(.*)&?/,
            `http://docs.google.com/${doc.dlLinkDir}/d/$1/export?authuser=$2&format=${doc.exportType || doc.defaultExportType || 'pdf'}`
          );
        else dlLink = doc.href.replace(/https?:\/\/drive\.google\.com\/open\?/, 'https://drive.google.com/uc?export=download&');
        if (dlLink)
          global.browser.tabs.create({
            url: dlLink,
            active: false
          });
      });
    }
  }
};
</script>
