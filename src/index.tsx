import { h, render } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

const Main = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const state = EditorState.create({ schema })
    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        console.log("Document size went from", transaction.before.content.size, "to", transaction.doc.content.size)
        const newState = view.state.apply(transaction)
        view.updateState(newState)
      }
    })
  }, [])

  return (
    <div ref={editorRef} id="editor" />
  )
}

const root = document.getElementById('root')

if (root) {
  render(<Main />, root)
}
