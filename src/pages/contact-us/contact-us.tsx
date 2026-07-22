import React from 'react'
import PageHierarchy from '../../components/modules/Page-Hierarchy/page-hierarchy'
import ContactUsFormPage from '../../components/templates/contact-us-form-page/contact-us-form-page';
import Container from '../../components/modules/container';

function ContactUs() {
  return (
    < >
      <Container >
        <PageHierarchy
          items={[
            "خانه",
            "تماس با ما",
          ]}
        />
        <ContactUsFormPage />
      </Container>
    </>
  )
}

export default ContactUs;
