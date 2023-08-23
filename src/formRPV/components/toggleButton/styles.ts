import styled from 'styled-components'

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  min-width: 100%;
  min-height: 100%;
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Description = styled.div`
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
`

export const Switch = styled.label`
  position: relative;
  cursor: pointer;
`

export const HiddenToggle = styled.input`
  display: none;
`

export const Slider = styled.div`
  background: ${(props) => props.theme['gray-500']};
  border: 0.1rem solid #bbb;
  cursor: pointer;
  border-radius: 1rem;
  transition: all 300ms ease-in-out;
  width: 4rem;
  height: 2rem;
  position: relative;
  box-shadow:
    inset -0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.2),
    0 0 0.5rem rgba(0, 0, 0, 0.1);
`

interface ButtonProps {
  checked: boolean
}

export const Button = styled.div<ButtonProps>`
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;
  background: ${(props) => props.theme.purple};
  top: 0.2rem;
  left: ${(props) => (props.checked ? '2.2rem' : '0.2rem')};
  transition: all 300ms ease-in-out;
  border-radius: 50%;
  z-index: 2;
  box-shadow: inset -0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
`

export const SliderText = styled.div<ButtonProps>`
  position: absolute;
  top: 50%;
  right: ${(props) => (props.checked ? '2.2rem' : '0.5rem')};
  transform: translate(0, -50%);
  font-size: 0.7rem;
  line-height: 0.7rem;
  color: ${(props) => (props.checked ? '#666' : '#666')};
  font-weight: bold;
  z-index: 1;
  transition: all 300ms ease-in-out;
  content: ${(props) => (props.checked ? 'ON' : 'OFF')};
`
