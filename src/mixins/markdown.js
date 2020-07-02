import marked from 'marked'

export default {
  methods: {
    compiledMarkdown: function (text) {
      return marked(text, { sanitize: true })
    }
  }
}
