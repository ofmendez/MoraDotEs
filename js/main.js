const ofURLof =
	"aHR0cHM6Ly9mcmdreWVicWpkYXhyYnJ3a3hob3BsNmVlaTBld21jeS5sYW1iZGEtdXJsLnVzLWVhc3QtMS5vbi5hd3Mv";

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
function b64EncodeUnicode(str) {
	return btoa(
		encodeURIComponent(str).replace(
			/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				return String.fromCharCode("0x" + p1);
			}
		)
	);
}

function b64DecodeUnicode(str) {
	return decodeURIComponent(
		atob(str)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
}
function createUserData(_email) {
	return new Promise((resolve, reject) => {
		let params = new URLSearchParams({
			email: _email,
		});
		let endpoint = b64DecodeUnicode(ofURLof) + "registers2";
		fetch(endpoint, {
			method: "POST",
			body: params,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
		})
			.then((res) => {
				if (res.ok) {
					resolve("writted");
				} else {
					reject("error");
				}
			})
			.catch((e) => {
				reject("error: " + e);
			});
	});
}

window.TryLogin = (form) => {
	document.body.style.cursor = "wait";
	document.getElementById("idSubmit").disabled = true;
	document.getElementById("idSubmit").classList.add("avoidEvents");
	Register(form);
	return false;
};

const Register = (form) => {
	createUserData(form.elements["idEmail"].value)
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			alert("Ha ocurrido un error, intente nuevamente.");
			console.log("Error register: " + e);
		})
		.finally(() => {
			document.body.style.cursor = "default";
			document.getElementById("idSubmit").disabled = false;
			document.getElementById("idSubmit").classList.remove("avoidEvents");
		});
};
