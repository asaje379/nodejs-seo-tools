export type IconProps = {
  name?: string;
  size?: number;
};

export const Icon = ({ name, size = 16 }: IconProps) => {
  return (
    <div
      className="material-symbols-outlined"
      style={{ fontSize: `${size}px` }}>
      {name}
    </div>
  );
};
