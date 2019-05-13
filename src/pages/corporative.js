import React, { Component } from 'react'
import Header from '../components/header'
import {
  Card,
  Intro,
  SubNavigation
} from '../components'

class Corporative extends Component {
  state = {
    introData: [],
    cardData: []
  }

  componentDidMount () {
    this.setState({
      introData: {

      },
      cardData: [
        {
          title: 'CO2 Reduction',
          subtitle: '47t',
          chartValues: [4, 5, 4, 4, 10, 7, 10, 5, 3, 10, 6, 4]
        },
        {
          title: 'Jobs / ha',
          subtitle: '62',
          chartValues: [8, 6, 8, 10, 5, 7, 10, 5, 3, 10, 2, 4]
        },
        {
          title: 'Biomass / ha',
          subtitle: '16.5',
          chartValues: [4, 2, 4, 8, 10, 7, 3, 5, 10, 8, 4, 6]
        },
        {
          title: 'Funds donated',
          subtitle: '$1.7M',
          chartValues: [1, 1, 1, 10, 1, 1, 1, 7, 1, 1, 1, 1]
        }
      ]
    })
  }

  render () {
    const { introData, cardData } = this.state
    return (
      <div id='App'>
        <Header headerText='Topia' />
        <Intro data={introData} />
        <Card data={cardData} />
        <SubNavigation />
      </div>
    )
  }
}

export default Corporative
