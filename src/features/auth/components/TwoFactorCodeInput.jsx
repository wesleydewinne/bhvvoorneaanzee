import { useRef } from "react";

const CODE_LENGTH = 6;

export default function TwoFactorCodeInput({ id = "verification-code", value = "", onChange, disabled = false }) {
    const inputRefs = useRef([]);
    const digits = Array.from({ length: CODE_LENGTH }, (_, index) => value[index] || "");

    const updateDigit = (index, nextValue) => {
        const digit = nextValue.replace(/\D/g, "").slice(-1);
        const nextDigits = [...digits];
        nextDigits[index] = digit;
        onChange?.(nextDigits.join(""));
        if (digit && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && !digits[index] && index > 0) inputRefs.current[index - 1]?.focus();
        if (event.key === "ArrowLeft" && index > 0) { event.preventDefault(); inputRefs.current[index - 1]?.focus(); }
        if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) { event.preventDefault(); inputRefs.current[index + 1]?.focus(); }
    };

    const handlePaste = (event) => {
        const pastedCode = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
        if (!pastedCode) return;
        event.preventDefault();
        onChange?.(pastedCode);
        inputRefs.current[Math.min(pastedCode.length, CODE_LENGTH) - 1]?.focus();
    };

    return (
        <div className="twofactor-code-boxes" onPaste={handlePaste} aria-label="6-cijferige verificatiecode">
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(node) => { inputRefs.current[index] = node; }}
                    id={index === 0 ? id : undefined}
                    className="twofactor-code-box"
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(event) => updateDigit(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    disabled={disabled}
                    aria-label={`Cijfer ${index + 1}`}
                />
            ))}
        </div>
    );
}
