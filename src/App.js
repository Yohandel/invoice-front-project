import logo from './logo.svg';
import './App.css';
import { Sidebar } from './components/sidebar/sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { Main } from './components/Main/Main';

function App() {
  return (
    <>
      <Row>
        <Col md={2}>
          <Sidebar className='sidebar'></Sidebar>
        </Col>
        <Col md={10}>
          <Main></Main>
        </Col>
      </Row>
    </>
  );
}



export default App;
