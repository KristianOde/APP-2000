/**
 * Skrevet av Mikael
 */

var UserProfile = (function() {
  var email = "";
  var password = "";
  var username = "";

  var getEmail = function() {
    return email;    // Or pull this from cookie/localStorage
  };

  var getPassword = function() {
    return password;    // Or pull this from cookie/localStorage
  };

  var getUsername = function() {
    return username;    // Or pull this from cookie/localStorage
  };

  var setEmail = function(userEmail) {
    email = userEmail;     
    // Also set this in cookie/localStorage
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