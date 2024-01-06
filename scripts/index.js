let GENS;
let random_gen;
let current;
let next;
let sillhouette_on = false;
const show_number = document.getElementById ("setting1");
const always_show = document.getElementById ("setting2");
const always_region = document.getElementById ("setting3");
const auto_silhouette_off = document.getElementById ("setting4");
const poke_img = document.getElementById ("poke-img");
const poke_name = document.getElementById ("poke-name");
const poke_region = document.getElementById ("poke-region");

// Load JSON, generate 'next'
fetch ('./data.json')
	.then ((response) => response.json ())
	.then ((json) => GENS = json)
	.then (() => {
		for (let i = 0; i < GENS.length; i++) {
			GENS[i]['checkbox'] = document.getElementById (`gen${i + 1}-check`);
		}
		randomNext ();
	});

// Generates a new 'next' and downloads its respective image
function randomNext () {
	random_gen = randItem (getCheckedGens ());
	if (random_gen == null) {
		next = null;
		return;
	}
	next = randItem (GENS[random_gen]['list']);
	let img = new Image ();
	img.src = next["path"];
}

// Sets 'current' to 'next' and changes the displayed data respectively
function random () {
	if (next == undefined || next == null) {return;}
	current = next;
	GENS[random_gen]['list'] = GENS[random_gen]['list'].filter ((item) => item !== current);
	poke_img.src = current["path"];
	refreshName ();
	filterGens ();
	randomNext ();
}

// Returns an array of numbers representing gens that are checked
function getCheckedGens () {
	let valid_gens = [];
	for (const item of GENS) {
		if (item['checkbox'].checked) {valid_gens.push (GENS.indexOf (item));}
	}
	return valid_gens;
}

function refreshName () {
	if (current == undefined) {return;}
	if (always_show.checked) {
		showName ("func");
		return;
	}
	hideName ();
}

function showName (source) {
	if (current == undefined) {return;}
	poke_name.innerHTML = show_number.checked ? `#${current["number"]} ${current["name"]}` : current["name"];
	poke_region.innerHTML = current["region"];
	if (source == "mouse") {
		poke_img.style.filter = auto_silhouette_off.checked ? "brightness(1)" : poke_img.style.filter;
	}
}

function hideName () {
	poke_img.style.filter = sillhouette_on ? "brightness(0)" : "brightness(1)";
	if (current == undefined || always_show.checked) {return;}
	poke_name.innerHTML = "???";
	poke_region.innerHTML = always_region.checked ? current["region"] : "";
}

// Checks the current state of the checkboxes, toggles them as neccessary and generates a new 'next'
function toggleCheckboxes () {
	if (GENS == undefined) {return;}
	let valid_checkboxes = [];
	for (const item of GENS) {
		if (!item['checkbox'].disabled) {valid_checkboxes.push (item);}
	}
	if (getCheckedGens ().length < valid_checkboxes.length) {
		for (const item of valid_checkboxes) {item['checkbox'].checked = true;}
	}
	else {
		for(const item of valid_checkboxes){item['checkbox'].checked = false;}
	}
	randomNext ();
}

// If a gen has no items left, unchecks and disables its respective checkbox
function filterGens () {
	for (const item of GENS){
		if (!item['list'].length) {
			item['checkbox'].checked = false;
			item['checkbox'].disabled = true;
		}
	}
}

// Returns a random item from an array or null if array is empty
function randItem (array) {
	return array.length ? array[Math.floor (Math.random () * array.length)] : null;
}

function toggleSilhouette () {
	if (current == undefined) {return;}
	sillhouette_on = sillhouette_on ? false : true;
	poke_img.style.filter = sillhouette_on ? "brightness(0)" : "brightness(1)";
}

function spanToggleCheckbox (index) {
	if (GENS == undefined) {return;}
	GENS[index]['checkbox'].checked = GENS[index]['checkbox'].checked || GENS[index]['checkbox'].disabled ? false : true;
	randomNext ();
}

function spanToggleSetting (index) {
	const element = document.getElementById (`setting${index}`);
	element.checked = element.checked ? false : true;
	refreshName ();
}

// Adjust for low width resolution screens; provisional solution
if (window.matchMedia ("(min-width: 760px)").matches == false) {
	document.body.style.flexFlow = "column nowrap";
	document.getElementsByTagName ("button")[1].style.marginBottom = "10vh";
}