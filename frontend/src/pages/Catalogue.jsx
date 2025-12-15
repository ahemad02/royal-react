import React from 'react'
import Banner from '../components/Banner'

const Catalogue = () => {
  return (
   <>
     <Banner
        title="Catalogue"
        image="/images/catalogue.png"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Catalogue", link: "/catalogue" },
        ]}
        
      />
   </>
  )
}

export default Catalogue