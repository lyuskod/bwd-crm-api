import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../css/ItemView.css'
import { routes } from '../../api/routes'

const PublicWalletsView = () => {
  const [wallet, setWallet] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const getWalletByIdUrl = `${routes.getPublicWalletById}${id}`
    axios.get(getWalletByIdUrl).then((resp) => setWallet({ ...resp.data[0] }))
  }, [id])
  return (
    <div style={{ marginTop: '150px' }}>
      <div className="card">
        <div className="card-header">
          <p>Wallet Details</p>
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
            <strong>Balance: </strong>
            <span>{wallet.Balance}</span>
            <br />
            <br />
            <strong>Hints: </strong>
            <span>{wallet.Hints}</span>
            <br />
            <br />
            <strong>Package: </strong>
            <span>{wallet.Package}</span>
            <br />
            <br />
            <strong>Comments: </strong>
            <span>{wallet.Comments}</span>
            <br />
            <br />
            <strong>Satoshi: </strong>
            <span>{wallet.Satoshi}</span>
            <br />
            <br />
            <strong>Screenshot: </strong>
            <span>{wallet.Satoshi}</span>
            <br />
            <br />
          </div>
          <Link to="/">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PublicWalletsView
