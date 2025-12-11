import React from 'react'
import Banner from '../components/Banner'
import ContactForm from '../components/ContactForm'
import LocationsSection from '../components/LocationsSection'

const Contact = () => {
  return (
    <div className='contact-page'>
    <Banner
        title="Contact Us"
        image="/images/40118_RYNESTON.jpg"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "contact", link: "/contact" },
        ]}
      />
      <ContactForm />
      <LocationsSection />
    </div>
  )
}

export default Contact