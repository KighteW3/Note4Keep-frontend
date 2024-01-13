import { useEffect, useState } from 'react';
import { LoadIcon } from '../assets/Icons.tsx';
import '../scss/Loading.scss';

interface props {
  isLoading: boolean
}

const [subInactive, subActive] = ["loading",
  "loading-active"];

export default function Loading({ isLoading = false }: props) {
  const [loadingClass, setLoadingClass] = useState(subInactive);

  useEffect(() => {
    isLoading ?
      setLoadingClass(subActive)
      :
      setLoadingClass(subInactive);

  }, [isLoading])

  return (
    <div className={loadingClass}>
      <LoadIcon />
    </div>
  )

}
