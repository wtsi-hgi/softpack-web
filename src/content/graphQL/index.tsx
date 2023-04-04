import { useState } from 'react'
import Environments from './environments'
import Users from './users'
import AddUser from './addUser'
import { Helmet } from 'react-helmet-async'
import Packages from './packages'

const GraphQL = () => {
  const [page, setPage] = useState('environments')

  return (
    <div>
      <Helmet>
        <title>GraphQL Demo</title>
      </Helmet>

      <div>
        <button onClick={() => setPage('environments')}>environments</button>
        <button onClick={() => setPage('users')}>users</button>
        <button onClick={() => setPage('packages')}>packages</button>
        <button onClick={() => setPage('add user')}>add user</button>
      </div>

      <Environments show={page === 'environments'} />

      <Users show={page === 'users'} />

      <Packages show={page === 'packages'} />

      <AddUser show={page === 'add user'} />
    </div>
  )
}

export default GraphQL