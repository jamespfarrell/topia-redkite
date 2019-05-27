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
    'gatsby-plugin-sass',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`
  ]
}
