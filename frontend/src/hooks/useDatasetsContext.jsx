import { DatasetsContext } from '../context/DatasetsContext'
import { useContext } from 'react'

export const useDatasetsContext = () => {
  const context = useContext(DatasetsContext)

  if (!context) {
    throw Error('useDatasetsContext must be used inside an datasetsContextProvider')
  }

  return context
}