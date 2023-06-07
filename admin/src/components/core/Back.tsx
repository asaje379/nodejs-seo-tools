import { useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

export const Back = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="flex justify-center items-center font-bold cursor-pointer"
      onClick={goBack}>
      <Icon
        size={20}
        name="keyboard_backspace"
      />
    </div>
  );
};
