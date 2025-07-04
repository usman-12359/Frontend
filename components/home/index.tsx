"use client"
import CardsItem from './cards/cardItem';
import Revolutionize from './cards/revolutionize';
import GetInTouch from './get-in-touch';
import Header from './header';
import Pricing from './pricing';
import ProgressCards from './progress-cards';
import StartingNow from './starting-now';
import WhatWeDo from './what-we-do';



const Home = () => {
  return (
    <>
      <Header />
      <ProgressCards />
      <CardsItem />
      <WhatWeDo />
      <Revolutionize />
      <Pricing />
      <StartingNow />
      <GetInTouch />

    </>
  )
}

export default Home