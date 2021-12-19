var generateBtn = document.querySelector("#generate");

//arrays for each character case: lower case, upper case, numbers, special characters
var lowerChar= ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var upperChar= ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var numChar= ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

var specialChar= ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_",
"=", "+", "[", "{", "]", "}", "\\", "|", ";", ":", "\'", "\"", ",", "<", "." ,">" ,"/",
"?", " "];


//function to select array randomly, arguments are booleans
var selectedOptions= function(bool1, bool2, bool3, bool4)
{
  
  //create empty array and value, value determines array choice
  var option= [];
  var value= 0;
 
  //add selected criteria to option array
  if (bool1)
  {
    option.push(1);
  }
  
  if (bool2)
  {
    option.push(2);
  }

  if (bool3)
  {
    option.push(3);
  }

  if (bool4)
  {
    option.push(4);
  }

  
  //value is assigned the value of option[0] only if 1 criteria was chosen
  if (option.length === 1)
  {
    value= option[0];
  }
  
  else
  {
    //randomly select array option
    value= option[Math.floor(Math.random() * option.length)];
  }

  return value;
};


//function used to compare a string and an array using 3 parameters(string, boolean, array)
var compare= function(str, bool, arr)
{
  //create array of string using value of str, number is first counter variable
  var sample= str.split("");
  var number= 0;

  
  for (var i= 0; i < sample.length; i++)
    {
      //compare each individual value of sample to arr
      //outer loop only works if counter is zero and bool is true
      if (bool && number === 0)
      {
        
        for (var j=0; j < arr.length; j++)
        {
          
          if (arr[j] === sample[i])
          {
            //update counter if sample has 1 value from arr, then escape inner loop
            number++;
            break;
          }
        }
      }
    }

  //return true or false for later comparison   
  if (number > 0)
  {
    return true;
  }

  else
  {
    return false;
  }
};


//function takes 5 parameters: 1 number and 4 booleans
//quickly generates password based on parameters
var quickGenerate= function(numb, bool1, bool2, bool3, bool4)
{
  //result is the password, count is the second counter variable
  var result= "";
  var count= 0;

  //generate the password based on the value of numb
  for(var i= 0; i < numb; i++)
  {
    //choose one of the four arrays randomly first
    var arrChoice= selectedOptions(bool1, bool2, bool3, bool4);

    //select value from chosen array randomly
    if (arrChoice === 1)
    {
      //randomly choose from 1st array and concat string
      result= result+ lowerChar[Math.floor(Math.random() *lowerChar.length)];
    }

    else if (arrChoice === 2)
    {
      //randomly choose from 2nd array and concat string
      result= result+ upperChar[Math.floor(Math.random() *upperChar.length)];
    }

    else if (arrChoice === 3)
    {
      //randomly choose from 3rd array and concat string
      result= result+ numChar[Math.floor(Math.random() *numChar.length)];
    }

    else
    {
      //randomly choose from 4th array and concat string
      result= result+ specialChar[Math.floor(Math.random() *specialChar.length)];
    }
    
  };

  //make sure password is correct, empty arrry is for comparing booleans
  var atLeastOne= [];
  
  //if any boolean is false then at least one less array will be checked
  if (bool1)
  {
    var check1= compare(result, bool1, lowerChar);
    atLeastOne.push(check1);
  }

  if (bool2)
  {
    var check2= compare(result, bool2, upperChar);
    atLeastOne.push(check2);
  }

  if (bool3)
  {
    var check3= compare(result, bool3, numChar);
    atLeastOne.push(check3);
  }

  if (bool4)
  {
    var check4= compare(result, bool4, specialChar);
    atLeastOne.push(check4);
  }

 
  //compare chosen criteria to password generated
  for(var j=0; j < atLeastOne.length; j++)
  {
    if (atLeastOne[j] === true)
    {
      count++;
    }
  }

  //check if password fits all criteria
  if (atLeastOne.length !== count)
  {
    //recursive call if password is missing a criteria
    quickGenerate(numb, bool1, bool2, bool3, bool4);
  }

  else
  {
    //give correct password back to user
    return result;
  }
}


//function to generate random password
function generatePassword()
{
  //ask user for character limit
  var checkLength= window.prompt("How many characters do you want your password to have?"
  +" The range must be between 8 characters and 128 characters.");

  
  //check for wrong response
  while (isNaN(parseInt(checkLength)) || parseInt(checkLength) < 8 || parseInt(checkLength) > 128)
  {
    alert("Wrong entry. Please enter a number between 8 and 128.");
    checkLength= window.prompt("How many characters do you want your password to have?"
      +" The range must be between 8 characters and 128 characters.");
  }
  
  //change answer to number for later use
  checkLength= parseInt(checkLength);


  //ask for how user wants the password to be generated
  var confirmLower= window.confirm("Do you want your password to have lower characters?");
  var confirmUpper= window.confirm("Do you want your password to have upper characters?");
  var confirmNum= window.confirm("Do you want your password to have numbers?");
  var confirmSpecial= window.confirm("Do you want your password to have special characters?");


  //make sure password has some characters by default if all confirms are false 
  if (!confirmLower && !confirmUpper && !confirmNum && !confirmSpecial)
  {
    alert("The password needs to have some characters! The password will"
      +" have lower characters as default");
    confirmLower= true;
  }

  //creates and checks password without calling prompts multiple times
  var answer= quickGenerate(checkLength, confirmLower, confirmUpper, confirmNum, confirmSpecial);
  console.log(answer);
  return answer;
}



// Write password to the #password input
function writePassword() 
{
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
