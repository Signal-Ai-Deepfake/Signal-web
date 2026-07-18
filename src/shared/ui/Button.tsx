import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseStyle =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 text-large font-semibold transition-colors disabled:cursor-not-allowed";

const variantStyle: Record<ButtonVariant, string> = {
  primary: [
    "bg-main-600 text-white",
    "hover:bg-main-400",
    "active:bg-main-900",
    "disabled:bg-gray-100 disabled:text-gray-400",
  ].join(" "),
  outline: [
    "border border-gray-700 bg-white text-gray-900",
    "hover:border-main-400 hover:bg-secondary-100 hover:text-secondary-700",
    "active:border-gray-900",
    "disabled:border-gray-200 disabled:text-gray-300",
  ].join(" "),
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return <button className={`${baseStyle} ${variantStyle[variant]} ${className}`} {...props} />;
}
