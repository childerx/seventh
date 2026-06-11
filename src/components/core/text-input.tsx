// src/components/TextInput.tsx
import _ from "lodash";
import type { ChangeEventHandler, CSSProperties, FC, FocusEventHandler, InputHTMLAttributes } from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/cs";

const labelVariants = {
  floating: {
    top: "-0.75rem",
    left: "0.75rem",
    fontSize: "0.75rem",
    paddingLeft: "0.25rem",
    paddingRight: "0.25rem",
    backgroundColor: "var(--input-label-bg, #ffffff)",
  },
  resting: {
    top: "0.75rem",
    left: "1rem",
    fontSize: "1rem",
    paddingLeft: "0rem",
    paddingRight: "0rem",
    backgroundColor: "#ffffff00",
  },
};

const errorVariants = {
  hidden: { opacity: 0, height: 0, y: -10, marginTop: "0rem" },
  visible: { opacity: 1, height: "auto", y: 0, marginTop: "0.5rem" },
};

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  values: unknown;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  errors?: unknown;
  touched?: unknown;
}

export const TextInput: FC<TextInputProps> = ({
  id,
  type,
  label,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  className,
  placeholder,
  onFocus,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = _.get(values, id);
  const hasError = !!(_.get(errors, id) && _.get(touched, id));
  const isFloating = isFocused || !!value || isAutofilled;

  useEffect(() => {
    const input = inputRef.current;
    if (input && input.matches(":-webkit-autofill")) {
      setIsAutofilled(true);
    }
  }, []);

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleInputBlurWrapper: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocused(false);
    setIsAutofilled(e.target.matches(":-webkit-autofill"));
    handleBlur(e);
  };

  const handleInputChangeWrapper: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsAutofilled(e.target.matches(":-webkit-autofill"));
    handleChange(e);
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const currentInputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  const labelColor = hasError ? "#EF4444" : isFocused ? "#3B82F6" : "var(--text-tertiary)";
  const labelBg = isFloating
    ? document.documentElement.classList.contains("dark")
      ? "#0f172a"
      : "#ffffff"
    : "#00000000";

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative w-full rounded-xl border transition-all duration-200",
          hasError ? "border-red-500" : isFocused ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]" : "hover:border-blue-300/50",
          "flex items-center"
        )}
        style={{ borderColor: hasError ? undefined : isFocused ? undefined : 'var(--border-primary)' }}
      >
        {label && (
          <motion.label
            htmlFor={id}
            className="absolute z-10 pointer-events-none"
            variants={labelVariants}
            initial={isFloating ? "floating" : "resting"}
            animate={isFloating ? "floating" : "resting"}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ color: labelColor, "--input-label-bg": labelBg } as CSSProperties}
          >
            {label}
          </motion.label>
        )}

        <div className="flex-1 w-full py-3 px-4">
          <input
            ref={inputRef}
            id={id}
            name={id}
            autoComplete="new-password"
            type={currentInputType}
            value={value || ""}
            onChange={handleInputChangeWrapper}
            onFocus={handleInputFocus}
            onBlur={handleInputBlurWrapper}
            placeholder={isFloating ? placeholder : ""}
            className="w-full border-none bg-transparent p-0 text-base outline-none ring-0 focus:ring-0"
            style={{ color: 'var(--text-primary)' }}
            {...props}
          />
        </div>

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="px-4"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isPasswordVisible ? "eye" : "eye-off"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              >
                {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            className="text-sm text-red-500"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
          >
            {_.get(errors, id)}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextInput;
