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
    window.sessionStorage.setItem("sessEmail", userEmail);
  };

  var setUsername = function(userUsername) {
    username = userUsername;     
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