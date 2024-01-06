document.onkeyup = (e) => {
	let event = (e || window.event);
	if (event.code == "Space") {
		random ();
		return
	}
	if (event.code == "KeyJ") {
		spanToggleSetting (1);
		return
	}
	if (event.code == "KeyK") {
		spanToggleSetting (2);
		return
	}
	if (event.code == "KeyL") {
		spanToggleSetting (3);
		return
	}
	if (event.code == "KeyA") {
		spanToggleSetting (4);
		return
	}
	if (event.code == "KeyS") {
		toggleSilhouette ();
		return
	}
	if (event.key == "1") {
		spanToggleCheckbox (0);
		return
	}
	if (event.key == "2") {
		spanToggleCheckbox (1);
		return
	}
	if (event.key == "3") {
		spanToggleCheckbox (2);
		return
	}
	if (event.key == "4") {
		spanToggleCheckbox (3);
		return
	}
	if (event.key == "5") {
		spanToggleCheckbox (4);
		return
	}
	if (event.key == "6") {
		spanToggleCheckbox (5);
		return
	}
	if (event.key == "7") {
		spanToggleCheckbox (6);
		return
	}
	if (event.key == "8") {
		spanToggleCheckbox (7);
		return
	}
	if (event.key == "9") {
		spanToggleCheckbox (8);
		return
	}
	if (event.key == "0") {
		toggleCheckboxes ();
		return
	}
};