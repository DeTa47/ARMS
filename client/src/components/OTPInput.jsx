import { useState, useRef } from "react";

const OTPInput = ({ length = 6, onComplete}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
          }
      
          
        if (newOtp.every((digit) => digit !== "")) {
            onComplete(newOtp.join(""));
          }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      };

      return (
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl font-bold"
              maxLength="1"
            />
          ))}
        </div>
      );
}

export default OTPInput;