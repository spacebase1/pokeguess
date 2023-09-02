let gens;
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => gens = json)
	.then( _ => {for(let i = 0; i < gens.length; i++){gens[i]['checkbox'] = document.getElementById('gen' + (i + 1) + '-check');}});
let current;
const show_number = document.getElementById("setting1");
const always_show = document.getElementById("setting2");
const always_region = document.getElementById("setting3");
const poke_img = document.getElementById("poke-img");
const poke_name = document.getElementById("poke-name");
const poke_region = document.getElementById("poke-region");

function randItem(array){return array.length ? array[Math.floor(Math.random() * array.length)] : 'empty';}
function getCheckedGens(){
	let valid_gens = [];
	for(const item of gens){if(item['checkbox'].checked){valid_gens.push(gens.indexOf(item));}}
	return valid_gens;
}
function random(){
	let random_gen = randItem(getCheckedGens());
	if(random_gen == 'empty'){return};
	current = randItem(gens[random_gen]['list']);
	gens[random_gen]['list'] = gens[random_gen]['list'].filter((item) => item !== current);
	poke_img.src = current["path"];
	refreshName();
	filterGens();
}
function refreshName(){
	if(current == undefined){return;}
	if(always_show.checked){showName();}
	else{hideName();}
}
function showName(){
	if(current == undefined){return;}
	poke_name.innerHTML = show_number.checked ? `#${current["number"]} ${current["name"]}` : current["name"];
	poke_region.innerHTML = current["region"];
}
function hideName(){
	if(current == undefined || always_show.checked){return;}
	poke_name.innerHTML = "???";
	poke_region.innerHTML = always_region.checked ? current["region"] : "";
}
function toggleCheckboxes(){
	let valid_checkboxes = [];
	for(const item of gens){if(!item['checkbox'].disabled){valid_checkboxes.push(item);}}
	if(getCheckedGens().length<valid_checkboxes.length){for(const item of valid_checkboxes){item['checkbox'].checked = true;}}
	else{for(const item of valid_checkboxes){item['checkbox'].checked = false;}}
}
function filterGens(){
	for(const item of gens){
		if(!item['list'].length){
			item['checkbox'].checked = false;
			item['checkbox'].disabled = true;
		}
	}
}
function toggleSilhouette(){
	if(current == undefined){return;}
	poke_img.style.filter = poke_img.style.filter == "brightness(0)" ? "brightness(1)" : "brightness(0)"
}
function spanToggle(index, checkbox){
	if(checkbox){gens[index]['checkbox'].checked = gens[index]['checkbox'].checked||gens[index]['checkbox'].disabled ? false : true;}
	else{
		const element = document.getElementById(`setting${index}`);
		element.checked = element.checked ? false : true;
		refreshName();
	}
}