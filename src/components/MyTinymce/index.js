// npm install --save @tinymce/tinymce-vue
// npm install --save tinymce

// Copy node_modules/tinymce/skins folder to public/ and public/js/

// Download language package from https://www.tiny.cloud/get-tiny/language-packages/
// and copy it to public/js/langs

// import { uploadFile } from '@/api/file'

import TinymceVue from '@tinymce/tinymce-vue'
import 'tinymce/tinymce'
// Languages
import '~/public/js/langs/zh_CN.js'
// Theme
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
// Plugins
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import '~/public/axupimgs/plugin.js'

const plugins = 'image imagetools axupimgs'

const toolbar = 'undo redo | fontsizeselect | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | axupimgs'

function images_upload_handler(blobInfo, success, failure) {
  const file = blobInfo.blob()
  if (file.size / 1024 / 1024 > 2) {
    failure('请上传小于2M的图片')
    return
  }
  // uploadFile(file).then(data => {
  //   success(data.url)
  // })
}

const init = {
  language: 'zh_CN',
  plugins: plugins,
  menubar: false,
  toolbar: toolbar,
  images_upload_handler: images_upload_handler,
  imagetools_cors_hosts: ['duqin.oss-cn-beijing.aliyuncs.com'],
  height: 800,
  branding: false
}

export default {
  name: 'MyTinymce',
  components: {
    TinymceVue
  },
  props: ['value'],
  data() {
    return {
      content: '',
      init: init
    }
  },
  mounted() {
    this.content = this.value
  },
  watch: {
    value(val) {
      this.content = val
    }
  }
}
