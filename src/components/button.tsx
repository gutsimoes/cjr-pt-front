
//teste botao

import { type ButtonHTMLAttributes, forwardRef } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ label = "Cadastrar", className, ...props }, ref) => {
  return (
    <div className="flex justify-center pt-2">
      <button
        ref={ref}
        type="submit"
        className={`w-[200px] h-[50px] bg-[#BB7C4E] text-white font-semibold rounded-full hover:bg-[#a5643b] transition duration-300 shadow-md ${className ?? ""}`}
        {...props}
      >
        {label}
      </button>
    </div>
  )
})

Button.displayName = "Button"

export default Button
