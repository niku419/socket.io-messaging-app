import React,{useState, useRef, useEffect} from 'react'
import { Container, Form, Button, InputGroup, ListGroup} from "react-bootstrap";
import io from 'socket.io-client'


export default function Chat() {
  const dummy = useRef(null);
  const socketRef = useRef()
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [pname, setPName] = useState("")
  const [chat, setChat] = useState([])

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:3001',{ transports: ['websocket', 'polling', 'flashsocket'] })
    socketRef.current.on('message',({message, name}) => {
      setChat([...chat, {message,name}])
    })
    dummy.current.scrollIntoView({behaviour: 'smooth'})
    return () => {
      socketRef.current.disconnect()
    }
  }, [chat]) 

  function sendMessage(e){
    console.log(name,message)
    setName(pname)
    socketRef.current.emit("message", {message, name})
    e.preventDefault()
    setMessage("")
  }
  function nameSubmit(e) {
    e.preventDefault()
    setName(pname)
  }
  return (
    <>
      <Container className="mt-5 flex-fill flex-column d-flex border border-light border-bottom-0">
        <Container style={{overflow: "auto", paddingTop: "2rem"}}>
          <div style={{ width: 'fill', height:"30rem"}}>
            <ListGroup variant="flush">
              {chat.map(({ name, message }, index) => (
                <div key={index}>{name}:{message}</div>
              ))}
            </ListGroup>
            <div ref={dummy}></div>
          </div>
        </Container>
        <Container className="d-flex pt-2">
          {name ? 
          <Form className="mb-3 flex-grow-1" onSubmit={sendMessage}>
            <InputGroup >
              <Form.Control
                placeholder="Enter Message"
                aria-describedby="basic-addon2"
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                value={message}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">Send</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form> :
          <Form className="mb-3 flex-grow-1" onSubmit={nameSubmit}>
            <InputGroup >
              <Form.Control
                placeholder="Enter Name"
                aria-describedby="basic-addon2"
                onChange={(e) =>
                  setPName(e.target.value)
                }
                value={pname}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">Set Name</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>}
        </Container>
      </Container>
    </>
  )
}