import React, { useEffect, useState } from 'react';
import './App.css';
import { Col, Row } from 'antd';
function App() {

  const [endpoint, setEndPoint] = useState('')
  const [container, setContainer] = useState([])
  const [finalPoint, setFinalPoint] = useState('')

  const onChangeHandler = (e) => {
    setEndPoint(e.target.value)
  }

  useEffect(() => {
    fetchMe()
  }, [finalPoint])


  const fetchMe = () => {

    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=+${endpoint}`, {

      "method": 'GET',
      "headers": {
        'X-RapidAPI-Key': '404b1840dfmsh97023cd38fc07bcp1d4040jsncdf9d1a77ea2',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setContainer(data.d)
      })
      .catch(err => {
        console.error(err);
      })

  }

  const submitHandle = e => {
    e.preventDefault()
    setFinalPoint(endpoint)
  }


  return (
    <div className="App">
      <form onSubmit={submitHandle}>
        <input type='text' value={endpoint} onChange={onChangeHandler} />
        <button type='submit'>submit</button>
      </form>


      <div className='element'>

        {container.map((item, index) => {
          return (
            <Row>
              <Col span="6" md='8'>
                <div key={index} className='elements-div'>
                  <img src={item.i.imageUrl} />
                  <p>{item.l}</p>
                </div>
              </Col>
            </Row>
          )
        })}

      </div>

    </div>
  );
}

export default App;


//explain me how the row and col works in antd ui to make responsive website?

{/* <Row>
  <Col span="6" md="8">
    <div>Column 1</div>
  </Col>
  <Col span="6" md="12">
    <div>Column 2</div>
  </Col>
</Row> */}