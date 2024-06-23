import cls from 'classnames';

export interface IconProps {
  color?: string;
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const Icon = (props: IconProps) => {
  const { color, name, size, className, onClick } = props;

  const url = `/images/V2/${name}.svg`;

  return (
    <div
      className={cls(className, {
        pointer: !!onClick,
      })}
      onClick={onClick}
    >
      {color ? (
        <div
          className="mask w-4 h-4"
          style={{
            WebkitMaskImage: `url('${url}')`,
            WebkitAlignItems: 'center',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: '100%',
            mask: `url('${url}') center center/100% 100% no-repeat`,
            background: color,
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      ) : (
        <img
          src={url}
          alt=""
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
          loading="lazy"
        />
      )}
    </div>
  );
};
