/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }


  // console.log(`page.path ---> : ${page.path}`)
  if (page.path.match(/^\/redkite/)) {
    // const oldPage = Object.assign({}, page)
    // const replacePath = path => path.replace(/^\/redkite/, ``)
    
    // // Remove trailing slash unless page is /
    // console.log(`page.path ---> : ${page.path}`)
    // page.path = replacePath(page.path)
    // console.log(`replacePath ---> : ${page.path}`)

    // if (page.path !== oldPage.path) {
    //   // Replace new page with old page
    //   deletePage(oldPage)
    //   createPage(page)
    // }
    
    
    
    page.matchPath = `/*`
    // page.matchPath = `/redkite/*`
    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/admin/)) {
    page.matchPath = `/admin/*`

    // Update the page.
    createPage(page)
  }
}
