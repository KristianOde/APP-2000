/**
 * Skrevet av Mikael
 */

var UserProfile = (function() {
  var email = "";
  var password = "";
  var username = "";

  var getEmail = function() {
    return email; 
  };

  var getPassword = function() {
    return password; 
  };

  var getUsername = function() {
    return username;  
  };

  var setEmail = function(userEmail) {
    email = userEmail;     
    localStorage.setItem('email', email);
  };

  var setUsername = function(userUsername) {
    username = userUsername;     
    // Also set this in cookie/localStorage
  };


  return {
    setEmail: setEmail,
    getEmail: getEmail,
    getPassword: getPassword,
    setUsername: setUsername,
    getUsername: getUsername
    
  }

})();

export default UserProfile;