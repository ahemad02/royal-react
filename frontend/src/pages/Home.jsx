import React from 'react'
import BannerSlider from '../components/BannerSlider'
import AboutRoyalFloor from '../components/AboutRoyalfloor'
import FeatureSection from '../components/FeatureSection'
import RoyalFloorGallery from '../components/RoyalFloorGallery'
import ImageText from '../components/ImageText'

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <AboutRoyalFloor />
      <FeatureSection />
      <RoyalFloorGallery />
      <ImageText />
      
    </div>
  )
}

export default Home