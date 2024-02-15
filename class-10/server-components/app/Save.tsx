"use client"

import { useFormStatus } from 'react-dom';

function Save() {
  const status = useFormStatus()
  console.log(status)

  return (
    <button disabled={status.pending} type="submit">Add</button>
  )
}

export default Save
