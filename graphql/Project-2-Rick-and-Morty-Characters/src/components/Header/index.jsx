import { Form, Input } from 'antd';
import { FilterContext, useFilter } from '../../Context/main';

const { Search } = Input;

function Header() {
  const { setName, setFiltered, search, setSearch } = useFilter(FilterContext);

  const onSearch = (value) => {
    setName(value);
    setFiltered(false);
  };

  return (
    <div className="header">
      <p className="header-title">Wubba Lubba Dub Dub.</p>
      <Form className="header-form">
        <Search className="search" placeholder="Character Name" allowClear size="large" value={search} onChange={(event) => setSearch(event.target.value)} onSearch={onSearch} />
      </Form>
    </div>
  );
}

export default Header;