import { Switch, HiddenToggle, Slider, Button, SliderText } from './styles'

interface ToggleButtonProps {
  isChecked: boolean
  onToggleClick: () => void
}

export const ToggleButton = ({
  isChecked,
  onToggleClick,
}: ToggleButtonProps) => {
  return (
    <Switch>
      <HiddenToggle
        type="checkbox"
        className="hidden-toggle"
        checked={isChecked}
        onChange={onToggleClick}
      />
      <Slider>
        <Button checked={isChecked} />
        <SliderText checked={isChecked}>{isChecked ? 'ON' : 'OFF'}</SliderText>
      </Slider>
    </Switch>
  )
}
