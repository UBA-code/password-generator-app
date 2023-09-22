
let copyDocument = document.body.cloneNode(true);
let	characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={}[]|\:;\"'<>,.?/`~";

function genereateRandomString(length, upper, lower, num, sym)
{
	let final = "";
	for (let i = 0; i < length;)
	{
		let char = characters[Math.floor(Math.random() * characters.length)];
		if (char.match(/[A-Z]/) && upper)
			final += char;
		else if (char.match(/[a-z]/) && lower)
			final += char;
		else if (char.match(/[0-9]/) && num)
			final += char;
		else if(char.match(/[^0-9A-Za-z]/) && sym)
			final += char;
		else
			continue;
		i++;
	}
	return (final);
}

function checkLevel(elems, level) {
	for (let i = 0; i < 4; i++)
		elems[i].classList.remove("bg-emerald-500", "bg-red-600", "bg-orange-400", "bg-emerald-300");
	let classname = "bg-emerald-500";

	if (level == 1)
		classname = "bg-red-600";
	else if (level == 2)
		classname = "bg-orange-400";
	else if (level == 2)
		classname = "bg-emerald-300";
	for (let i = 0; i < level; i++)
		elems[i].classList.add(classname);
}

function appLoop() {
	let menu = document.querySelector(".container .menu-block");
	let copyArea = document.querySelector(".container .passwd-block");
	let lengthContainer = document.querySelector(".container .length-container");
	let choicesInputs = document.querySelectorAll(".container .choices-container input");
	let secureLevelText = document.querySelector(".levels-area .secure-level-text");
	let secureLevelcolumns = document.querySelectorAll(".levels-area .levels-colomns span");
	let generateBtn = document.querySelector(".container .generate-btn");
	let length = 8;
	let includeUpper = 0;
	let includeLower = 0;
	let includeNum = 0;
	let includeSymbols = 0;
	let randomString = genereateRandomString(length, 1, 1, 1, 1);

	document.querySelectorAll("input[type=range], input[type=checkbox]").forEach((elem)=>{
		elem.addEventListener("input", (n) => {
			if (n.target.type == "range")
			{
				length = n.target.value;
				lengthContainer.querySelector(".length-number").innerHTML = length;
			}
			let secureLevel = 0;
			choicesInputs.forEach((elem2)=>{elem2.checked ? secureLevel++ : ""});
			if (secureLevel == 1)
				secureLevelText.textContent = "LOW";
			else if (secureLevel == 2)
				secureLevelText.textContent = "MEDIUM";
			else if (secureLevel == 3)
				secureLevelText.textContent = "GOOD";
			else
				secureLevelText.textContent = "HIGH";
			checkLevel(secureLevelcolumns, !secureLevel ? 4 : secureLevel);
		});
	})
	generateBtn.addEventListener("click", _=>{
		choicesInputs.forEach((n)=>{
			let label = n.parentNode.querySelector("label").textContent;
			if (label.includes("Upper")) {
				if (n.checked)
					includeUpper = 1;
				else
					includeUpper = 0;
			}
			if (label.includes("Lower")) {
				if (n.checked)
					includeLower = 1;
				else
					includeLower = 0;
			}
			if (label.includes("Numbers")) {
				if (n.checked)
					includeNum = 1;
				else
					includeNum = 0;
			}
			if (label.includes("Symbols")) {
				if (n.checked)
					includeSymbols = 1;
				else
					includeSymbols = 0;
			}
		})
		if (!includeUpper && !includeLower && !includeNum && !includeSymbols)
			includeUpper = 1, includeLower = 1, includeNum = 1, includeSymbols = 1;
		randomString = genereateRandomString(length, includeUpper, includeLower, includeNum, includeSymbols);
		copyArea.querySelector(".passwd-content").textContent = randomString.length > 20 ? randomString.substring(0, 17) + "..." : randomString;
	});
	copyArea.querySelector(".passwd-content").textContent = randomString.length > 20 ? randomString.substring(0, 17) + "..." : randomString;
	copyArea.addEventListener("click", _=>{
		navigator.clipboard.writeText(randomString);
		copyArea.querySelector(".passwd-content").textContent = "Password Copied To Clipboard";
		copyArea.querySelector(".passwd-content").classList.remove("text-white");
		copyArea.querySelector(".passwd-content").classList.add("text-green");
		setTimeout(() => {
			copyArea.querySelector(".passwd-content").textContent = randomString.length > 20 ? randomString.substring(0, 17) + "..." : randomString;
			copyArea.querySelector(".passwd-content").classList.remove("text-green");
			copyArea.querySelector(".passwd-content").classList.add("text-white");
		}, 1000);
		console.log(randomString + " : copied");
	})
}

appLoop();