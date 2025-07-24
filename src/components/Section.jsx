import React from 'react'

function Section({
  className,
  id,
  children
}) {
  return (
  <div
    id={id}
    className={`h-[100vh] w-full px-46 ${className || ''}`}
  >
    {children}
  </div>
  )
}

export default Section