import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our app</h4>
        <p>Download App For android and ios mobile phone</p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>

      <div className="midFooter">
        <h1>ElevateCart</h1>
        <p>High Quality is our first priority</p>

        <p>Copyright 2021 &copy; MeKanishkGaur</p>

      </div>

      <div className="rightFooter">
        <h4>Follow me on instagram</h4>
        <a href="hhtp://instagram.com/kanishk__gaur" >Instagram</a>
        <a href="hhtp://instagram.com/kanishk__gaur" >Youtube</a>
        <a href="hhtp://instagram.com/kanishk__gaur" >Facebook</a>

      </div>
    </footer>
  )
}

export default Footer
