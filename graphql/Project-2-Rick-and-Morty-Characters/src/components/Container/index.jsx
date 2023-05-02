import { useQuery } from '@apollo/client';
import { GET_CHARS } from './queries';
import { Col, Row, Card, Pagination, Spin } from 'antd';

import { FilterContext, useFilter } from '../../Context/main';

function Container() {
  const { page, setPage, gender, species, name } = useFilter(FilterContext);

  const { loading, data } = useQuery(GET_CHARS, {
    variables: {
      page,
      gender,
      species,
      name,
    },
  });

  if (loading || !data) {
    return <Spin delay={400} tip="Loading..." size="large" />;
  }

  const onChangePage = (page) => {
    setPage(page);
  };

  return (
    <>
      {data.characters.results.map((character) => (
        <Col sm={24} md={12} xl={8} xxl={6} key={character.id}>
          <Card size="small" style={{ width: 170, height: 300 }} bordered={false} cover={<img alt="example" src={character.image} />}>
            <p className="card-species">{character.species}</p>
            <h1 className="card-name">{character.name}</h1>
            <p className="card-location">{character.location.name}</p>
          </Card>
        </Col>
      ))}
      <Col span={24}>
        <Row justify="center">
          <Pagination showSizeChanger={false} defaultCurrent={1} current={page} onChange={onChangePage} total={data.characters.info.count / 2} />
        </Row>
      </Col>
    </>
  );
}

export default Container;