import React from 'react';
import { Affix, Row, Button, Divider, Radio, Space } from 'antd';

import { FilterContext, useFilter } from '../../Context/main';

function Sidebar() {
  const { setPage, gender, setGender, species, setSpecies, filtered, setFiltered, setName, setSearch } = useFilter(FilterContext);

  const onChangeGender = (e) => {
    setPage(1);
    setGender(e.target.value);
    setFiltered(false);
  };

  const onChangeSpecies = (e) => {
    setPage(1);
    setSpecies(e.target.value);
    setFiltered(false);
  };

  const clearFilters = () => {
    setPage(1);
    setGender('');
    setSpecies('');
    setName('');
    setSearch('');
    setFiltered(true);
  };

  return (
    <Affix offsetTop={10}>
      <Row justify="space-between">
        <h1>Filters</h1>
        <Button disabled={filtered} type="text" size="small" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Row>
      <Divider />
      <h4>GENDER</h4>
      <Radio.Group onChange={onChangeGender} value={gender}>
        <Space direction="vertical">
          <Radio value={'Male'}>Male</Radio>
          <Radio value={'Female'}>Female</Radio>
          <Radio value={'Genderless'}>Genderless</Radio>
          <Radio value={'unknown'}>unknown</Radio>
        </Space>
      </Radio.Group>
      <Divider />
      <h4>SPECIES</h4>
      <Radio.Group onChange={onChangeSpecies} value={species}>
        <Space direction="vertical">
          <Radio value={'Human'}>Human</Radio>
          <Radio value={'Alien'}>Alien</Radio>
          <Radio value={'Humanoid'}>Humanoid</Radio>
          <Radio value={'Animal'}>Animal</Radio>
          <Radio value={'Robot'}>Robot</Radio>
          <Radio value={'Cronenberg'}>Cronenberg</Radio>
          <Radio value={'Mytholog'}>Mytholog</Radio>
          <Radio value={'Disease'}>Disease</Radio>
          <Radio value={'Poppybutthole'}>Poppybutthole</Radio>
          <Radio value={'unknown'}>unknown</Radio>
        </Space>
      </Radio.Group>
    </Affix>
  );
}

export default Sidebar;