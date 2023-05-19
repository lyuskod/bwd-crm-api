import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/MainPage.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { routes } from '../../api/routes'
import { slice_from_both_sides } from '../../scripts/slice_line'

const ProviderWalletsHome = () => {
  const [data, setData] = useState([])

  const loadData = async () => {
    const response = await axios.get(routes.getAllPublicWallets)
    setData(response.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const deleteWallet = (id) => {
    if (window.confirm('Are you sure that you want to delete that wallet?')) {
      const deleteWalletByIdUrl = `${routes.removePublicWalletById}${id}`
      axios.delete(deleteWalletByIdUrl)
      toast.success(`Wallet #${id} deleted successfully`)
      setTimeout(() => loadData(), 500)
    }
  }
  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/addPublicWallet">
        <button className="btn btn-contact">Add Wallet</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>No.</th>
            <th style={{ textAlign: 'left' }}>Address</th>
            <th style={{ textAlign: 'left' }}>Balance</th>
            <th style={{ textAlign: 'left' }}>Hints</th>
            <th style={{ textAlign: 'left' }}>Package</th>
            <th style={{ textAlign: 'left' }}>Comments</th>
            <th style={{ textAlign: 'left' }}>Satoshi</th>
            <th style={{ textAlign: 'left' }}>Screenshot</th>
          </tr>
        </thead>
        <tbody align="left">
          {data.map((wallet, index) => {
            return (
              <tr key={wallet.Id}>
                <th scope="row">{index + 1}</th>
                <td>{wallet.Address}</td>
                <td>{wallet.Balance}</td>
                <td>{wallet.Hints}</td>
                <td>{wallet.Package}</td>
                <td>{wallet.Comments}</td>
                <td>{wallet.Satoshi}</td>
                <td>{slice_from_both_sides(wallet.Screenshot, 10)}</td>
                <td>
                  <Link to={`/updatePublicWallet/${wallet.Id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteWallet(wallet.Id)}
                  >
                    Delete
                  </button>
                  <Link to={`/viewPublicWallet/${wallet.Id}`}>
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
