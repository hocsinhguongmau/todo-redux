import styled from "styled-components";

export const Todo = styled.div`
  max-width: 800px;
  margin: 0 auto;
  input[type="text"] {
    width: 200px;
    height: 30px;
    line-height: 30px;
    vertical-align: top;
  }
  button[type="submit"] {
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
  }
  table {
    border-collapse: collapse;
    th,
    td {
      border: 1px solid #333;
      padding: 5px 10px;
    }
  }
`;
