/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/redkite/)) {
    page.matchPath = `/redkite/*`

    // Update the page.
    createPage(page)
  }

  if (page.path.match(/^\/admin/)) {
    page.matchPath = `/admin/*`

    // Update the page.
    createPage(page)
  }
}
