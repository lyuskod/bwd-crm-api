import React from 'react'

export const NavBar = () => {
  return (
    <div justify="space-between" align="center" padding="30px">
      <div justify="space-around" align="center" width="50%" padding="30px">
        <div>
          <nav>
            <div>
              <a href="/">Public Wallets</a>
            </div>
            <div>
              <a href="/providerwallets">Provider Wallets</a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
