import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseStyle =
  "inline-flex cursor-pointer items-center justify-center rounded px-4 py-2.5 text-large font-semibold transition-colors disabled:cursor-not-allowed";

const variantStyle: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary-600 text-white",
    "hover:bg-primary-400",
    "active:bg-primary-900",
    "disabled:bg-gray-200 disabled:text-gray-400",
  ].join(" "),
  outline: [
    "border border-gray-700 bg-white text-gray-900",
    "hover:border-primary-400 hover:bg-secondary-100 hover:text-secondary-700",
    "active:border-gray-900",
    "disabled:border-gray-200 disabled:text-gray-300",
  ].join(" "),
};

export function buttonStyle(variant: ButtonVariant = "primary", className = "") {
  return `${baseStyle} ${variantStyle[variant]} ${className}`;
}

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={buttonStyle(variant, className)} {...props} />;
}
