import { useEffect, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { CREATE_MESSAGE, MESSAGE_SUBS } from './queries';
import { Col, Row, Input, Form } from 'antd';
const { v4: uuidv4 } = require('uuid');

const myID = uuidv4();

function App() {
  const { loading, data } = useSubscription(MESSAGE_SUBS);
  const [saveMessage] = useMutation(CREATE_MESSAGE);
  const [messages, setMessages] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (!loading || data) {
      setMessages((m) => [data.messageCreated, ...m]);
    }
  }, [data, loading]);

  const onFinish = async (values) => {
    try {
      await saveMessage({
        variables: {
          data: {
            message: values.message,
            user: myID,
          },
        },
      });
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Row>
        <Col lg={{ span: 8, offset: 8 }} md={{ span: 12, offset: 6 }} sm={{ span: 16, offset: 4 }} xs={{ span: 20, offset: 2 }} className="chat-bg">
          {data &&
            messages.map((message) => (
              <Row justify={message.user === myID ? 'end' : 'start'} key={message.id}>
                <p className={message.user === myID ? 'chat-message right' : 'chat-message'}>{message.message}</p>
              </Row>
            ))}
        </Col>
        <Col lg={{ span: 8, offset: 8 }} md={{ span: 12, offset: 6 }} sm={{ span: 16, offset: 4 }} xs={{ span: 20, offset: 2 }}>
          <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item name="message">
              <Input size="large" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;