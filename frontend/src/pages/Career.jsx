import React from 'react'
import Banner from '../components/Banner'
import CareerForm from '../components/CareerForm'

const Career = () => {
  return (
    <div className='career-page'>
       <Banner
        title="Career with royalfloor"
        image="/images/ENDLESS-COLBERT-ICE.jpg"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: " Career WIth Royalfloor", link: "/career" },
        ]}
      />
      <CareerForm />
    </div>
  )
}

export default Career