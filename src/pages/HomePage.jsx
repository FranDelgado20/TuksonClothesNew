
import React from 'react'
import { Container } from 'react-bootstrap'
import NewArrivals from '../components/NewArrivals'
import Banner from '../components/Banner'
import Subs from '../components/Subs'

const HomePage = () => {
  return (
    <>
  <Banner/>
<Container fluid>
<NewArrivals/>
<Subs/>
</Container>
    </>
  )
}

export default HomePage