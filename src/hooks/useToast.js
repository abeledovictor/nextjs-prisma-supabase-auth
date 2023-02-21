import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Alert from '@mui/material/Alert';

const ToastContext = React.createContext(null);

let id = 2

const ToastContainer = ({ toasts, onRemove }) => {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if(!mounted) {
        ref.current = document.body
        setMounted(true)
    }

  }, [])

  if(!mounted || !ref.current) return null

  return ReactDOM.createPortal(
    <div style={{position: 'absolute', bottom: 32, left: '50%', transform: 'translate(-50%, 0)', display: 'grid', gap: 8}}>
      {toasts.map(item => <Alert severity={item.type || 'error'} onClose={() => { onRemove(item.id) }} key={item.id} id={item.id}>{item.content}</Alert>
      )}
    </div>,
    ref.current
  );
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const increase = (cb) => {
    cb(id)
    id = id + 1
    }
  
  const removeToast = id => {
    setToasts(toasts => toasts.filter(t => t.id !== id));
  }

  const addToast = (content, type, timeout = 8000) => {
    increase(currentId => {
      if(timeout) {
        setTimeout(() => { removeToast(currentId) }, timeout)
      }

      setToasts(toasts =>  [
        ...toasts,
        { id: currentId, content, type }
      ]);

    })
  };
  
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const toastHelpers = React.useContext(ToastContext);
  return toastHelpers;
}