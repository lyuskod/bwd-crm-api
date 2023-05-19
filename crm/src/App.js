import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { NavBar } from './components/NavBar'
import ProviderWalletsHome from './pages/provider-wallets/ProviderWalletsHome'

import PublicWalletsHome from './pages/public-wallets/PublicWalletsHome'
import AddEditPublicWallet from './pages/public-wallets/AddEditPublicWallets'
import ViewPublicWallet from './pages/public-wallets/PublicWalletsView'
import ProviderWalletsView from './pages/provider-wallets/ProviderWalletsView'
import AddEditProviderWallet from './pages/provider-wallets/AddEditProviderWallets'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <ToastContainer position="top-center" />
        <Switch>
          {/* Home */}
          <Route exact path="/" component={PublicWalletsHome} />
          <Route
            exact
            path="/providerwallets"
            component={ProviderWalletsHome}
          />
          {/* Home */}

          {/* AddEdit */}
          <Route path="/addPublicWallet" component={AddEditPublicWallet} />
          <Route path="/addProviderWallet" component={AddEditProviderWallet} />
          <Route
            path="/updatePublicWallet/:id"
            component={AddEditPublicWallet}
          />
          <Route
            path="/updateProviderWallet/:id"
            component={AddEditProviderWallet}
          />
          {/* AddEdit */}

          {/* View */}
          <Route path="/viewPublicWallet/:id" component={ViewPublicWallet} />
          <Route
            path="/viewProviderWallet/:id"
            component={ProviderWalletsView}
          />
          {/* View */}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
