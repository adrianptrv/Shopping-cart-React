
import "../styles/Home.scss"

import { Link } from 'react-router-dom';


function Home() {

  return (
    <>
      <div className='homeBack'>
        <h1>
          Welcome to our PC hardware store!
        </h1>
        <Link to="/shop"><button className='homeShop'>Shop now</button></Link>
      </div>
    </>
  )
}

export default Home
