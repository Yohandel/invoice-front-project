import logo from './logo.svg';
import './App.css';
import { Sidebar } from './components/sidebar/sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { Main } from './components/Main/Main';

function App() {
  return (
    <Container className='container'>
      <Row>
        <Col>
          <Sidebar className='sidebar'></Sidebar>
        </Col>
        <Col>
          <Main></Main>
        </Col>
      </Row>
    </Container>
  );
}



export default App;
