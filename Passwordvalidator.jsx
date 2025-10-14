import React, { useState } from "react";

// Individual Regular Expressions
const hasDigit = /(?=.*\d)/;
const hasCapital = /(?=.*[A-Z])/;
const hasLower = /(?=.*[a-z])/;
const hasSpecial = /(?=.*[^A-Za-z0-9\s])/; // Matches a symbol, excludes spaces
const isMinLength = /(?=.{8,})/;

export default function PasswordValidator() {
  const [password, setPassword] = useState("");

  // Check validity for each rule
  const isDigitValid = hasDigit.test(password);
  const isCapitalValid = hasCapital.test(password);
  const isLowerValid = hasLower.test(password);
  const isSpecialValid = hasSpecial.test(password);
  const isLengthValid = isMinLength.test(password);

  const getRuleClassName = (isValid) => (isValid ? "valid" : "invalid");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const allValid = isDigitValid && isCapitalValid && isLowerValid && isSpecialValid && isLengthValid;

  return (
    <div className="mainchecking" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Password Validator</h2>
      <div className="text">
        <input
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter password"
          style={{ padding: "10px", width: "250px", fontSize: "16px" }}
        />
      </div>

      <div className="rules" style={{ display: 'inline-block', textAlign: 'left', marginTop: '20px' }}>
        <h3>Password Rules:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li className={getRuleClassName(isLengthValid)} style={{ color: isLengthValid ? 'green' : 'red' }}>
            {isLengthValid ? '✅' : '❌'} At least 8 characters
          </li>
          <li className={getRuleClassName(isDigitValid)} style={{ color: isDigitValid ? 'green' : 'red' }}>
            {isDigitValid ? '✅' : '❌'} At least one digit
          </li>
          <li className={getRuleClassName(isCapitalValid)} style={{ color: isCapitalValid ? 'green' : 'red' }}>
            {isCapitalValid ? '✅' : '❌'} At least one capital letter
          </li>
          <li className={getRuleClassName(isLowerValid)} style={{ color: isLowerValid ? 'green' : 'red' }}>
            {isLowerValid ? '✅' : '❌'} At least one normal (lowercase) letter
          </li>
          <li className={getRuleClassName(isSpecialValid)} style={{ color: isSpecialValid ? 'green' : 'red' }}>
            {isSpecialValid ? '✅' : '❌'} At least one special symbol
          </li>
        </ul>
      </div>
      <p style={{ marginTop: '20px', fontWeight: 'bold', color: allValid ? 'green' : 'black' }}>
        {allValid ? "✅ Password is valid" : ""}
      </p>
    </div>
  );
}