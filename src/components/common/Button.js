import styled from 'styled-components';

const accentColor = 'rgb(0, 187, 45)';

const Button = styled.button`
  align-items: center;
  background-color: ${props =>
    props.variant === 'primary' ? accentColor : 'white'};
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => {
    switch (props.variant) {
      case 'delete':
        return 'red';
      default:
        return accentColor;
    }
  }};

  color: ${props => {
    switch (props.variant) {
      case 'primary':
        return 'white';
      case 'delete':
        return 'red';
      default:
        return accentColor;
    }
  }};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: bold;
  min-height: 36px;
  justify-content: center;
  min-width: 72px;
  outline-style: none;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  padding: 0 30px;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props =>
      props.variant === 'primary'
        ? 'rgb(0, 143, 57)'
        : 'rgba(29, 161, 242, 0.1)'};
  }
`;

export default Button;
