interface IButtonDisable {
    className: string;
    disabled: boolean;
    text: string;
    onClick: () => void;
  }
  
  export function ButtonDisable({
    className,
    disabled,
    text,
    onClick
  }: IButtonDisable) {
  
    return (
      <button
        disabled={disabled}
        className={className || "btn btn-primary"}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }