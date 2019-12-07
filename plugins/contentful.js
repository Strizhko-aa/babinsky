const contentful = require('contentful')

export default ({ app, store }) => {
  store.contentful = app.contentful = contentful.createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  })
}
