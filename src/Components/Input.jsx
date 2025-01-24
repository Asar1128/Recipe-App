import React, { useId, forwardRef } from "react";

const Input = ({ label, type = "text", variant = "input", className = "", ...props }, ref) => {
  const id = useId();

  return (
    <>
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      {variant === "textarea" ? (
        <textarea
          className={className}
          ref={ref}
          {...props}
          id={id}
        />
      ) : (
        <input
          type={type}
          className={className}
          ref={ref}
          {...props}
          id={id}
        />
      )}
    </>
  );
};

export default forwardRef(Input);
