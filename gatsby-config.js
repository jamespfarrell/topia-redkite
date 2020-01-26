module.exports = {
  siteMetadata: {
    title: "We accelerate social impact",
    titleTemplate: "%s - TOPIA",
    description:
      "A data-driven platform to match corporates & NGOs with validated impact.",
    url: "https://topia.us", // No trailing slash allowed!
    twitterUsername: "@topiaHQ",
    image: '/topia-social-cover.jpg'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets\/svgs/
        }
      }
    }
  ]
}
