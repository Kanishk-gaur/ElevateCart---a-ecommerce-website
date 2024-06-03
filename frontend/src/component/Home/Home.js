import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import Product from "./ProductCard.js"
import MetaData from '../layout/MetaData'
import { clearErrors, getProduct } from "../../actions/productAction"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'

const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProduct());
  }, [dispatch, error, alert])


  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>

        <MetaData title="𝗘𝗹𝗲𝘃𝗮𝘁𝗲𝗖𝗮𝗿𝘁---𝗮-𝗲𝗰𝗼𝗺𝗺𝗲𝗿𝗰𝗲-𝘄𝗲𝗯𝘀𝗶𝘁𝗲" />

        <div className="banner">
          <p>Welcome to ElevateCart</p>
          <h1>FIND All PRODUCT</h1>
          <a href='#container'>
            <button>
              Scroll<CgMouse />
            </button>
          </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id='container'>
          {products && products.map(product => (
            <Product product={product} />
          ))}

        </div>
      </Fragment>}
    </Fragment>
  )
}

export default Home
