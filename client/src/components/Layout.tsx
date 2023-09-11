import React from 'react'

interface ContainerProps {
    children: React.ReactNode
  };

const Layout:React.FC<ContainerProps> = ({children}) => {
  return (
    <div className='px-4  sm:px-8 w-full max-w-[1500px]  mx-auto  '>{children}</div>
  )
}

export default Layout