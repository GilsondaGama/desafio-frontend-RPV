import { RadioButtonGroup, RadioLabel, RadioInput } from './styles'

interface RadioButtonProps {
  label: string
  checked: boolean
  onChange: () => void
}

const RadioButton = ({ label, checked, onChange }: RadioButtonProps) => (
  <RadioLabel>
    <RadioInput type="radio" checked={checked} onChange={onChange} />
    {label}
  </RadioLabel>
)

interface EducationRadioButtonProps {
  selectedOption: string
  onOptionChange: (value: string) => void
}

export const EducationRadioButton = ({
  selectedOption,
  onOptionChange,
}: EducationRadioButtonProps) => (
  <RadioButtonGroup>
    <RadioButton
      label="Ensino Fundamental Completo"
      checked={selectedOption === 'Ensino Fundamental Completo'}
      onChange={() => onOptionChange('Ensino Fundamental Completo')}
    />
    <RadioButton
      label="Ensino Médio Completo"
      checked={selectedOption === 'Ensino Médio Completo'}
      onChange={() => onOptionChange('Ensino Médio Completo')}
    />
    <RadioButton
      label="Ensino Superior Completo"
      checked={selectedOption === 'Ensino Superior Completo'}
      onChange={() => onOptionChange('Ensino Superior Completo')}
    />
  </RadioButtonGroup>
)
