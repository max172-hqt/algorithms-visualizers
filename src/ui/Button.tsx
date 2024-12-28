import classNames from "classnames";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  //   asChild?: boolean;
    variant?: "primary" | "danger" | "icon";
  //   size?: "sm" | "default" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={classNames(
          "transition ease-in-out duration-300 rounded-lg font-bold nline-flex items-center gap-2 text-sm justify-center",
          className, {
            'bg-white hover:bg-gray-200  text-black px-4 py-2': variant === 'primary',
            'bg-red-500 text-white px-4 py-2 hover:bg-red-500/80': variant === 'danger',
            'p-1 bg-white text-black hover:bg-gray-200 ': variant === 'icon',
          }
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

export default Button;
