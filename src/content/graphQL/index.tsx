import { useState } from 'react'
import Environments from './environments'
import { Helmet } from 'react-helmet-async'

const GraphQL = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <Helmet>
        <title>Sample text</title>
      </Helmet>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Environments show={page === 'authors'} />

      {/* <Books show={page === 'books'} />

      <NewBook show={page === 'add'} /> */}
    </div>
  )
}

export default GraphQL