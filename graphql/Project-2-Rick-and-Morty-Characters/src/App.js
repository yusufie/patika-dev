import Header from './components/Header';
import Container from './components/Container';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Col, Row } from 'antd';

import { FilterProvider } from './Context/main';

function App() {
  return (
    <div className="App">
      <FilterProvider>
        <Header />
        <Row justify="center">
          <Col lg={3} md={0} sm={0} xs={0}>
            <Sidebar />
          </Col>
          <Col span={12} offset={1} flex>
            <Row gutter={[16, 16]} align="middle" justify="center">
              <Container />
            </Row>
          </Col>
        </Row>
        <Footer />
      </FilterProvider>
    </div>
  );
}

export default App;