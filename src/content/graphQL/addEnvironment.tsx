import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_ENVIRONMENTS, CREATE_ENVIRONMENT } from "./queries"

const addEnvironment = (props: { show: boolean }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [owners, setOwners] = useState([])
  const [pckg, setPckg] = useState('') // pckg used instead of 'package', as this is restricted.
  const [packages, setPackages] = useState([])

  const [ createEnvironment ] = useMutation(CREATE_ENVIRONMENT, {
    refetchQueries: [ {query: ALL_ENVIRONMENTS} ],
    onError: (error) => {
      setErrorMessage(error)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createEnvironment({  variables: { name, owners, packages } })

    setName('')
    setOwner('')
    setPckg('')
  }

  const addPackage = () => {
    console.log("adding", pckg)
    setPackages(packages.concat(pckg))
    setPckg('')
  }

  const addOwner = () => {
    setOwners(owners.concat(owner))
    setOwner('')
  }
  
  return (
    <div>
      <h2>Create New Environment</h2>

      <form onSubmit={submit}>
        <div>
          Name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <br></br>
        <div>Packages: {packages.join(' ')}</div>
        <div>
          <input
            value={pckg}
            onChange={({ target }) => setPckg(target.value)}
          />
          <button onClick={addPackage} type="button">
            Add Package
          </button>
        </div>
        
        <br></br>
        <div>Owners: {owners.join(' ')}</div>
        <div>
          <input
            value={owner}
            onChange={({ target }) => setOwner(target.value)}
          />
          <button onClick={addOwner} type="button">
            Add Owner
          </button>
        </div>
        <br></br>

        <button type="submit">Create Environment!</button>
      </form>
    </div>
  )
}
  
export default addEnvironment
