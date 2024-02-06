
type Props = {
  title: "como estas"
  nums?: Array<number>
}

function App({title, nums}: Props) {
  return (
    <>
      {title}
      {nums}
    </>
  )
}

export default App
