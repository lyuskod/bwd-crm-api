import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import '../css/AddEdit.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { routes } from '../../api/routes'

const initialState = {
  Id: '',
  Address: '',
  PriceInDollars: '',
  SatoshiWallet: '',
  ProviderWallet: '',
  ProviderContact: '',
}

const AddEditProviderWallet = () => {
  const [state, setState] = useState(initialState)

  const {
    Address,
    PriceInDollars,
    SatoshiWallet,
    ProviderWallet,
    ProviderContact,
  } = state

  const history = useHistory()

  const { id } = useParams()

  useEffect(() => {
    const getProviderWalletByIdUrl = `${routes.getProviderWalletById}${id}`
    axios
      .get(getProviderWalletByIdUrl)
      .then((resp) => setState({ ...resp.data[0] }))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !Address ||
      !PriceInDollars ||
      !SatoshiWallet ||
      !ProviderWallet ||
      !ProviderContact
    ) {
      toast.error('Please provide value into each input field')
    } else {
      if (!id) {
        const providerWalletUrl = `${routes.publishProviderWallet}`
        axios
          .post(providerWalletUrl, {
            Address,
            PriceInDollars,
            SatoshiWallet,
            ProviderWallet,
            ProviderContact,
          })
          .then(() => {
            setState({
              Address: '',
              PriceInDollars: '',
              SatoshiWallet: '',
              ProviderWallet: '',
              ProviderContact: '',
            })
          })
          .catch((err) => toast.error(err.response.data))
        toast.success('Wallet added successfully')
      } else {
        const updateProvidedWalletById = `${routes.updateProvidedWalletById}${id}`
        axios
          .put(updateProvidedWalletById, {
            Address,
            PriceInDollars,
            SatoshiWallet,
            ProviderWallet,
            ProviderContact,
          })
          .then(() => {
            setState({
              Address: '',
              PriceInDollars: '',
              SatoshiWallet: '',
              ProviderWallet: '',
              ProviderContact: '',
            })
          })
          .catch((err) => toast.error(err.response.data))
        toast.success('Wallet updated successfully')
      }

      setTimeout(() => history.push('/'), 500)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="Address"
          placeholder="Wallet address ..."
          defaultValue={Address || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="email">PriceInDollars</label>
        <input
          type="number"
          step="0.01"
          id="priceindollars"
          name="PriceInDollars"
          placeholder="Price In Dollars ..."
          defaultValue={PriceInDollars || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="satoshiwallet">SatoshiWallet</label>
        <input
          type="text"
          id="satoshiwallet"
          name="SatoshiWallet"
          placeholder="Satoshi Wallet is ..."
          defaultValue={SatoshiWallet || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="providerwallet">ProviderWallet</label>
        <input
          type="text"
          id="providerwallet"
          name="ProviderWallet"
          placeholder="Provider Wallet ..."
          defaultValue={ProviderWallet || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="providercontact">ProviderContact</label>
        <input
          type="text"
          id="providercontact"
          name="ProviderContact"
          placeholder="Provider Contact ..."
          defaultValue={ProviderContact || ''}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? 'Update' : 'Save'} />
        <Link to="/providerwallets">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  )
}

export default AddEditProviderWallet
