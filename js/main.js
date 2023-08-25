const ofURLof =
	"aHR0cHM6Ly9mcmdreWVicWpkYXhyYnJ3a3hob3BsNmVlaTBld21jeS5sYW1iZGEtdXJsLnVzLWVhc3QtMS5vbi5hd3Mv";

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
		let params = JSON.stringify({ email: _email });
		let endpoint = b64DecodeUnicode(ofURLof) + "registers2";
		fetch(endpoint, {
			method: "POST",
			body: params,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
		})
			.then((res) => {
				if (!res.ok) reject(res.status);
				resolve(res);
				return true;
			})
			.catch((e) => {
				reject("error: " + e);
			});
	});
}

window.TryLogin = (form) => {
	document.body.style.cursor = "wait";
	document.getElementById("idEmail").disabled = true;
	document.getElementById("idSubmit").classList.add("avoidEvents");
	document.getElementById("idThanks").setAttribute("nodisplay", "true");
	Register(form);
	return false;
};

const Register = (form) => {
	createUserData(form.elements["idEmail"].value)
		.then((res) => {
			form.reset();
			if (res.status === 273) alert("Gracias! Tu correo ya está registrado");
			else document.getElementById("idThanks").removeAttribute("nodisplay");
		})
		.catch((e) => {
			alert("Ha ocurrido un error, intenta más tarde");
			console.log("Error register: " + e);
		})
		.finally(() => {
			document.body.style.cursor = "default";
			document.getElementById("idEmail").disabled = false;
			document.getElementById("idSubmit").classList.remove("avoidEvents");
		});
};
