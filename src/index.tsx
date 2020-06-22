import { h, render } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'

const Main = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo
        }),
        keymap(baseKeymap)
      ]
    })
    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        console.log(`Document size went from ${transaction.before.content.size} to ${transaction.doc.content.size}`)
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
