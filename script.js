//sessionStorageS is Stimulation DB [its better to use seession storage but ie 9 below doesnt support it]
sessionStorageS = {};
if (document.all && !document.addEventListener) {
	/* It supports only IE9 and above*/
	alert('Website Supports IE9 and above');
}
// adding events after the Dom is ready
$(document).ready(function () {
	// Whenever keyup validation is trigger the globalvalidation makes the check
	var globalValidation = {};
	//adding login form events to Dom
	addLoginFormToDom();
	//adding register form events to Dom
	registrationFormEvent();

	function registrationFormEvent() {
		$('.lm-register-link').click(function () {
			// Replacing the login dom with register dom
			$('.landmark-data-container').html($('.landmark-register').html());
			$('.lm-error-password').addClass('lm-hide');
			$('.lm-error-username').addClass("lm-hide");
			$('.lm-login-form').removeClass('lm-login-form').addClass('lm-register-form');
			$('.lm-facebook').text('Register with Facebook');
			$('.lm-twitter').text('Register with Twitter');
			$('.lm-data-h1').text('Join Tango today.');
			$('.lm-data-h2').text('It\'s free and always will be.');
			/* Validation trigger events start*/
			$('.lm-reg-email').keyup(function () {
				var emailValue = $(this).val();
				checkEmailVaidiation(emailValue);
			});
			$('.lm-reg-email').blur(function () {
				var emailValue = $(this).val();
				if (!checkEmailVaidiation(emailValue)) {
					if (!ValidateEmailAddress(emailValue)) {
						$('.lm-error-email').removeClass('lm-valid').addClass('lm-error');
						$('.lm-error-email').html('<span class="lm-delete-icn"></span> Email is not Valid!</span>');
						$('.lm-error-email').removeClass('lm-hide');
						globalValidation.email = false;
						enableRegisterBtn();
					} else {
						$('.lm-error-email').addClass('lm-valid').removeClass('lm-error');
						$('.lm-error-email').html('<span class="lm-check-icn"></span> Looks great</span>');
						$('.lm-error-email').removeClass('lm-hide');
						globalValidation.email = true;
						enableRegisterBtn();
					}
				}

			});
			$('.lm-reg-email').focus(function () {
				$('.lm-error-email').addClass('lm-hide');
				globalValidation.email = false;
				enableRegisterBtn();
			});
			$('.lm-reg-username').keyup(function () {
				var userNameValue = $(this).val();
				if (userNameValue != "") {
					var available = true;
					var count = 0;
					// checks whether the username is already used or not
					$.each(sessionStorageS, function (key, value) {
						count++;
						var obj = JSON.parse(value);
						if (obj.username !== undefined) {
							if (obj.username.toUpperCase() == userNameValue.toUpperCase()) {
								available = false;
								return false;
							}
						}
						if (count == Object.keys(sessionStorageS).length) {
							return false;
						}
					});
					if (available) {
						$('.lm-error-username').addClass('lm-valid').removeClass('lm-error');
						$('.lm-error-username').html('<span class="lm-check-icn"></span> Available</span>');
						$('.lm-error-username').removeClass('lm-hide');
						globalValidation.username = true;
						enableRegisterBtn();
					} else {
						$('.lm-error-username').removeClass('lm-valid').addClass('lm-error');
						$('.lm-error-username').html('<span class="lm-delete-icn"></span> Already taken up!</span>');
						$('.lm-error-username').removeClass('lm-hide');
						globalValidation.username = false;
						enableRegisterBtn();
					}
				} else {
					$('.lm-error-username').addClass('lm-hide');
					globalValidation.username = false;
					enableRegisterBtn();

				}

			});
			$('.lm-reg-username').blur(function () {
				if (isEmpty($(this).val())) {
					$('.lm-error-username').removeClass('lm-valid').addClass('lm-error');
					$('.lm-error-username').html('<span class="lm-delete-icn"></span> Required field</span>');
					$('.lm-error-username').removeClass('lm-hide');
					globalValidation.username = false;
					enableRegisterBtn();
				}
			});
			$('.lm-reg-password').blur(function () {
				if (isEmpty($(this).val())) {
					$('.lm-error-password').removeClass('lm-valid').addClass('lm-error');
					$('.lm-error-password').html('<span class="lm-delete-icn"></span> Required field</span>');
					$('.lm-error-password').removeClass('lm-hide');
					globalValidation.password = false;
					enableRegisterBtn();
				} else {
					$('.lm-error-password').addClass('lm-valid').removeClass('lm-error');
					$('.lm-error-password').html('<span class="lm-check-icn"></span> Looks Great</span>');
					$('.lm-error-password').removeClass('lm-hide');
					globalValidation.password = true;
					enableRegisterBtn();
				}
			});
			$('.lm-reg-password').focus(function () {
				$('.lm-error-password').addClass('lm-hide');
				globalValidation.password = false;
				enableRegisterBtn();
			});
			$('.lm-reg-conf-pass').blur(function () {
				var confPass = $(this).val();
				var orginalPass = $('.lm-reg-password').val();
				if (confPass === orginalPass) {
					$('.lm-error-confirm').addClass('lm-valid').removeClass('lm-error');
					$('.lm-error-confirm').html('<span class="lm-check-icn"></span> Password match</span>');
					$('.lm-error-confirm').removeClass('lm-hide');
					globalValidation.confirm = true;
					enableRegisterBtn();
				} else {
					$('.lm-error-confirm').removeClass('lm-valid').addClass('lm-error');
					$('.lm-error-confirm').html('<span class="lm-delete-icn"></span> Does not Match</span>');
					$('.lm-error-confirm').removeClass('lm-hide');
					globalValidation.confirm = false;
					enableRegisterBtn();
				}
			});
			$('.lm-reg-conf-pass').focus(function () {
				$('.lm-error-confirm').addClass('lm-hide');
				globalValidation.confirm = false;
				enableRegisterBtn();
			});
			$('.lm-select').change(function () {
				var sexValue = $(this).val();
				if (sexValue != "") {
					$('.lm-error-sex').addClass('lm-valid').removeClass('lm-error');
					$('.lm-error-sex').html('<span class="lm-check-icn"></span></span>');
					$('.lm-error-sex').removeClass('lm-hide');
					globalValidation.sex = true;
					enableRegisterBtn();
				} else {
					$('.lm-error-sex').addClass('lm-hide');
					globalValidation.sex = false;
					enableRegisterBtn();
				}
			});
			$('.lm-select').blur(function () {
				var sexValue = $(this).val();
				if (sexValue == "") {
					$('.lm-error-sex').removeClass('lm-valid').addClass('lm-error');
					$('.lm-error-sex').html('<span class="lm-delete-icn"></span> Required field</span>');
					$('.lm-error-sex').removeClass('lm-hide');
					globalValidation.sex = false;
					enableRegisterBtn();
				}
			});

			$('.lm-login-link').click(function () {
				addLoginFormToDom();
				registrationFormEvent();
			});
			// Email validation code
			function ValidateEmailAddress(val) {
				if (val == "") {
					return false;
				}
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
					return true;
				}

				return false;
			}
			function isEmpty(val) {
				return val == "" ? true : false;
			}
			/* Validation trigger events end*/
		});
	}
	function enableRegisterBtn() {
		var valid = true;
		// Checks whether the email is registered or not
		if (Object.keys(globalValidation).length == 5) {
			$.each(globalValidation, function (key, value) {
				if (value == false) {
					valid = false;
					return false;
				}
			});
		} else {
			valid = false;
		}
		if (valid) {
			$('.lm-register-btn').addClass('lm-btn-enable');
			$('.lm-register-btn.lm-btn-enable').click(function () {
				var email = $('.lm-reg-email').val();
				var userName = $('.lm-reg-username').val();
				var password = $('.lm-reg-password').val();
				var sex = $('.lm-select').val();
				var data = {
					'username': userName,
					'password': password,
					'sex': sex
				};
				sessionStorageS[email + ""] = JSON.stringify(data);
				alert('Successfully Registered');
				$('.lm-reg-email').val('');
				$('.lm-reg-username').val('');
				$('.lm-reg-password').val('');
				$('.lm-reg-conf-pass').val('');
				$('.lm-select').val('');
				$('.lm-error-sex').addClass('lm-hide');
				$('.lm-error-confirm').addClass('lm-hide');
				$('.lm-error-password').addClass('lm-hide');
				$('.lm-error-username').addClass('lm-hide');
				$('.lm-error-email').addClass('lm-hide');
				globalValidation = {};
				addLoginFormToDom();
				registrationFormEvent();
			});

		} else {
			$('.lm-register-btn').removeClass('lm-btn-enable');
		}
	}
	function addLoginFormToDom() {
		$('.landmark-data-container').html($('.landmark-login').html());
		$('.lm-error-password').addClass('lm-hide');
		$('.lm-forgot-password').addClass("lm-hide");
		$('.lm-register-form').addClass('lm-login-form').removeClass('lm-register-form');
		$('.lm-facebook').text('Login with Facebook');
		$('.lm-twitter').text('Login with Twitter');
		$('.lm-data-h1').text('State thy name and ye shall pass');
		$('.lm-data-h2').html('Not a member yet?<span class="lm-register-link landmark-link"> Register now</span>— it\'s fun and easy!');
		$('.lm-login-username,.lm-login-password').keyup(function () {
			var loginVal = $('.lm-login-username').val();
			var passVal = $('.lm-login-password').val();
			if (loginVal != "" && passVal != "") {
				$('.lm-login-btn').addClass('lm-btn-enable');
			} else {
				$('.lm-login-btn').removeClass('lm-btn-enable');
			}
		});

		$(".lm-login-password").focus(function () {
			$('.lm-login-password').removeClass('lm-input-error');
			$('.lm-error-password').addClass('lm-hide');
			$('.lm-forgot-password').addClass("lm-hide");
		});
		$(".lm-login-username").focus(function () {
			$('.lm-login-username').removeClass('lm-input-error');
			$('.lm-error-username').addClass('lm-hide');
		});
		$(".lm-login-password").blur(function () {
			if ($(this).val() == "") {
				$('.lm-forgot-password').removeClass("lm-hide");
			}
		});
		$('.lm-login-btn').click(function () {
			var loginVal = $('.lm-login-username').val();
			var passVal = $('.lm-login-password').val();
			if (loginVal == "") {
				$('.lm-login-username').addClass('lm-input-error');
				$('.lm-error-username').removeClass('lm-hide');
			}
			if (passVal == "") {
				$('.lm-login-password').addClass('lm-input-error');
				$('.lm-error-password').removeClass('lm-hide');
			}
			if (loginVal != "" && passVal != "") {
				var count = 0;
				var match = false;
				var gender;
				$.each(sessionStorageS, function (key, value) {
					count++;
					var obj = JSON.parse(value);
					if (obj.username !== undefined) {
						if (obj.username.toUpperCase() == loginVal.toUpperCase() && obj.password === passVal) {
							match = true;
							gender = obj.sex;
							return false;
						}
					}
					if (count == Object.keys(sessionStorageS).length) {
						return false;
					}
				});
				if (match) {
					alert("Hello " + (gender == "1" ? "MR." : "Miss") + " " + loginVal.toUpperCase() + ", Welcome To Tango!");
					console.log("Login Success");

				} else {
					alert('If your new user please Register!');
					console.log("Login Failed due to password mismatch / no user");
					$('.lm-login-password').val('');
					$('.lm-login-username').val('');
					$('.lm-login-password').removeClass('lm-input-error');
					$('.lm-error-password').addClass('lm-hide');
					$('.lm-forgot-password').addClass("lm-hide");
					$('.lm-login-btn').removeClass('lm-btn-enable');
				}
			}
		});
	}
	function checkEmailVaidiation(emailValue) {
		if (sessionStorageS[emailValue] !== null && sessionStorageS[emailValue] !== undefined) {
			$('.lm-error-email').removeClass('lm-valid').addClass('lm-error');
			$('.lm-error-email').html('<span class="lm-delete-icn"></span> Email is Already Registered,<span class="lm-login-link landmark-link">Login</span></span>');
			$('.lm-error-email').removeClass('lm-hide');
			$('.lm-login-link').click(function () {
				addLoginFormToDom();
				registrationFormEvent();
			});
			return true;
		} else {
			$('.lm-error-email').addClass('lm-hide');
			return false;
		}
	}

});
