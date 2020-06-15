import { h, render } from 'preact'

const Main = () => {
  return (
    <div>ProseMirror Getting Started</div>
  )
}

const root = document.getElementById('root')

if (root) {
  render(<Main />, root)
}
