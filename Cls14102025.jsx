import React from 'react'
import './main.css'
export default function Cls14102025() {
  return (
    <>
    {/*
    ----------------------------------// Regular Expression in ReactJS //----------------------------------
    Regular Expression is a sequence of characters that forms a search pattern. It is mainly used for string pattern matching.
    It is also used for searching and replacing the text in a string.
    ---------- /                /----------  / -> starting and ending of the regular expression
    Eg: /abc/  -> it is used to find the pattern 'abc' in the given string
    Eg: /[abc]/ -> it is used to find any one character from the given set of characters
    -------------/Tokens         /flags-----------------------------
    Tokens are the characters that make up the regular expression.
    Eg: /abc/ -> here a,b,c are the tokens
    -------------------------------// Basic Symbols used in Regular Expression //----------------------------------
     \d -> means digit matching 0-9
    \w -> means matches all characters and symbols
    ? -> it is used to identify the optional pattern [0,1]
    + -> it used before above to identify the biggest pattern, until or unless there is atleast one pattern it is used [1,infinite]
    * -> it is exactly reverse which starts from [0,infinite], it will be used eventhough there is no pattern
    {} -> this are used in order to find out the length of the pattern Eg: \w{2,10} means it selects all the words from string size of min of length 2 and max of length 10
    \ this is the optional thing which is used  in order to consider the content after it as a normal text eventhough we use the experssions in the code.
    '.'  this is used in order to consider spaces,extra symbols and anything that need to  be accepted in whatever the way we give our input
    Eg: THUB CLS, THUB-CLS,THUB_CLS   for accepting these we give the pattern as /THUB.CLS/
    ---------------------------------flags---------------------------------------
    */}
    {/* task:
    Create a password pattern checker */}

    <h1>Regular Expression in ReactJS</h1>
    <div className="mainchecking">
        <div className="text"><input type="text" /></div>
        <div className="rules">
            <h3>Password Rules</h3>
            <ul>
                <li>1. Password must contain atleast one digit</li>
                <li>2. Password must contain atleast one capital letter</li>
                <li>3. Password must contain atleast one normal letter</li>
                <li>4. Password must contain atleast one special symbols</li>
                </ul>
        </div>
    </div>
    </>
  )
}
