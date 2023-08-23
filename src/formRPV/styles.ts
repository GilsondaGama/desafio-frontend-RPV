import styled from 'styled-components'

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 760px;
  margin: 52px auto 124px;
  flex-shrink: 0;
  padding: 2.75rem 6.125rem;

  background: ${(props) => props.theme.white};

  button {
    align-items: center;
    padding: 1rem;
    cursor: pointer;

    border: 0;
    border-radius: 0.5rem;
    margin: 3.5rem 0;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.purple};
    transition: 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`

export const FormInputDiv = styled.div`
  display: flex;
  flex-direction: column;

  input {
    flex: 1;
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem 0;
    border: 1px solid ${(props) => props.theme['gray-500']};
    background: ${(props) => props.theme.white};
  }

  label {
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    color: ${(props) => props.theme['gray-400']};
  }

  span {
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme['gray-400']};
  }
`
