import { useState } from 'react'
import Environments from './environments'
import { Helmet } from 'react-helmet-async'

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
        <button onClick={() => setPage('add user')}>add user</button>
      </div>

      <Environments show={page === 'environments'} />

      {/* <Users show={page === 'users'} />

      <AddUser show={page === 'add user'} /> */}
    </div>
  )
}

export default GraphQL