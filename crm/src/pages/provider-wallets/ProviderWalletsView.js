import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../css/ItemView.css'
import { routes } from '../../api/routes'

const ProviderWalletsView = () => {
  const [wallet, setWallet] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const getWalletByIdUrl = `${routes.getProviderWalletById}${id}`
    axios.get(getWalletByIdUrl).then((resp) => setWallet({ ...resp.data[0] }))
  }, [id])
  return (
    <div style={{ marginTop: '150px' }}>
      <div className="card">
        <div className="card-header">
          <p>Provider wallet Details</p>
        </div>
        <div className="container">
          <div align="left">
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Address: </strong>
            <span>{wallet.Address}</span>
            <br />
            <br />
            <strong>PriceInDollars: </strong>
            <span>{wallet.PriceInDollars}</span>
            <br />
            <br />
            <strong>SatoshiWallet: </strong>
            <span>{wallet.SatoshiWallet}</span>
            <br />
            <br />
            <strong>ProviderWallet: </strong>
            <span>{wallet.ProviderWallet}</span>
            <br />
            <br />
            <strong>ProviderContact: </strong>
            <span>{wallet.ProviderContact}</span>
            <br />
            <br />
          </div>
          <Link to="/providerwallets">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProviderWalletsView
