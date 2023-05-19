import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import '../css/AddEdit.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { routes } from '../../api/routes'

const initialState = {
  Id: '',
  Address: '',
  Balance: '',
  Hints: '',
  Package: '',
  Comments: '',
  Satoshi: '',
  Screenshot: '',
}

const AddEditPublicWallets = () => {
  const [state, setState] = useState(initialState)

  const { Address, Balance, Hints, Package, Comments, Satoshi, Screenshot } =
    state

  const history = useHistory()

  const { id } = useParams()

  useEffect(() => {
    const getWalletByIdUrl = `${routes.getPublicWalletById}${id}`
    axios.get(getWalletByIdUrl).then((resp) => setState({ ...resp.data[0] }))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !Address ||
      !Balance ||
      !Hints ||
      !Package ||
      !Comments ||
      !Satoshi ||
      !Screenshot
    ) {
      toast.error('Please provide value into each input field')
    } else {
      if (!id) {
        const publishWalletUrl = `${routes.publishPublicWallet}`
        axios
          .post(publishWalletUrl, {
            Address,
            Balance,
            Hints,
            Package,
            Comments,
            Satoshi,
            Screenshot,
          })
          .then(() => {
            setState({
              Address: '',
              Balance: '',
              Hints: '',
              Package: '',
              Comments: '',
              Satoshi: '',
              Screenshot: '',
            })
          })
          .catch((err) => toast.error(err.response.data))
        toast.success('Wallet added successfully')
      } else {
        const updateWalletById = `${routes.updatePublishWalletById}${id}`
        axios
          .put(updateWalletById, {
            Address,
            Balance,
            Hints,
            Package,
            Comments,
            Satoshi,
            Screenshot,
          })
          .then(() => {
            setState({
              Address: '',
              Balance: '',
              Hints: '',
              Package: '',
              Comments: '',
              Satoshi: '',
              Screenshot,
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
        <label htmlFor="email">Balance</label>
        <input
          type="number"
          step="0.01"
          id="balance"
          name="Balance"
          placeholder="Wallet balance ..."
          defaultValue={Balance || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="hints">Hints</label>
        <input
          type="text"
          id="hints"
          name="Hints"
          placeholder="Hints are ..."
          defaultValue={Hints || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="package">Package</label>
        <input
          type="text"
          id="package"
          name="Package"
          placeholder="Package is ..."
          defaultValue={Package || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="comments">Comments</label>
        <input
          type="text"
          id="comments"
          name="Comments"
          placeholder="Comments are ..."
          defaultValue={Comments || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="satoshi">Satoshi</label>
        <input
          type="text"
          id="satoshi"
          name="Satoshi"
          placeholder="Satoshi links are ..."
          defaultValue={Satoshi || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="satoshi">Screenshot</label>
        <input
          type="text"
          id="screenshot"
          name="Screenshot"
          placeholder="Screenshot is ..."
          defaultValue={Screenshot || ''}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? 'Update' : 'Save'} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  )
}

export default AddEditPublicWallets
