import styled from 'styled-components';


const Search = ({value, onChange, onSubmit}) => {
  return (
    <SForm onSubmit={onSubmit}>
      <label htmlFor='search' className='search__label'>
        Введите название канала
      </label>
      <input
        id='search'
        type='text'
        placeholder='Search'
        className='search__input'
        value={value}
        onChange={onChange}
      />
      <button type='submit' className='search__btn'>Найти</button>
    </SForm>
  );
};


const SForm = styled.form`
  padding: 10px;
  background-color: rgb(247 247 247);
  display: flex;
  align-items: center;
  .search {
    &__label {
      margin-right: 20px;
    }

    &__input {
      width: 50%;
      padding: 5px;
      outline: none;
      background-clip: padding-box; 
      border: 1px solid #ced4da;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      margin-right: 10px;

      :focus {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
      }
    }

    &__btn {
      background-color: #004A7F;
      -webkit-border-radius: 10px;
      border-radius: 3px;
      border: none;
      color: #FFFFFF;
      cursor: pointer;
      display: inline-block;
      font-family: Arial;
      padding: 5px 10px;
      text-align: center;
      text-decoration: none;
    }
  }
`;
export default Search;