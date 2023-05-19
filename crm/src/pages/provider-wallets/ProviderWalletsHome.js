import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/MainPage.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { routes } from '../../api/routes'

const ProviderWalletsHome = () => {
  const [data, setData] = useState([])

  const loadData = async () => {
    const response = await axios.get(routes.getAllProvidedWallets)
    setData(response.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const deleteWallet = (id) => {
    if (window.confirm('Are you sure that you want to delete that wallet?')) {
      const deleteWalletByIdUrl = `${routes.removeProviderWalletById}${id}`
      axios.delete(deleteWalletByIdUrl)
      toast.success(`Wallet #${id} deleted successfully`)
      setTimeout(() => loadData(), 500)
    }
  }
  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/addProviderWallet">
        <button className="btn btn-contact">Add Wallet</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>No.</th>
            <th style={{ textAlign: 'left' }}>Address</th>
            <th style={{ textAlign: 'left' }}>PriceInDollars</th>
            <th style={{ textAlign: 'left' }}>SatoshiWallet</th>
            <th style={{ textAlign: 'left' }}>ProviderWallet</th>
            <th style={{ textAlign: 'left' }}>ProviderContact</th>
          </tr>
        </thead>
        <tbody align="left">
          {data.map((wallet, index) => {
            return (
              <tr key={wallet.Id}>
                <th scope="row">{index + 1}</th>
                <td>{wallet.Address}</td>
                <td>{wallet.PriceInDollars}</td>
                <td>{wallet.SatoshiWallet}</td>
                <td>{wallet.ProviderWallet}</td>
                <td>{wallet.ProviderContact}</td>
                <td>
                  <Link to={`/updateProviderWallet/${wallet.Id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteWallet(wallet.Id)}
                  >
                    Delete
                  </button>
                  <Link to={`/viewProviderWallet/${wallet.Id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProviderWalletsHome
